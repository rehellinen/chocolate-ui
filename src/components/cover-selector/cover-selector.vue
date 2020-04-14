<template lang="pug">
  .cover-selector
    button.cover-selector__button(@click="openDialog") 点击打开
    choc-dialog(
      @confirm="toConfirm"
      :visible.sync="visible"
      width="600px"
    )
      .cover-selector__wrapper
        img.cover-selector__cover(:src="images[activeIndex]")
        .cover-selector__selector(
          @mousedown="begin"
          @mousemove="move"
          @mouseleave="stop"
          @mouseup="stop"
        )
          .cover-selector__last(@click="toLast")
          .cover-selector__thumbnails-wrapper
            .cover-selector__selected(
              :style="selectedStyle"
              :class="{ transition }"
            )
            .cover-selector__thumbnails(
              :style="imagesStyle"
              :class="{ transition }"
              ref="images"
            )
              img.cover-selector__thumbnail(
                @dragstart.prevent="noop"
                @selectstart.prevent="noop"
                @load="init"
                @mousedown="selectImg(i, 'down')"
                @mouseup="selectImg(i, 'up')"
                @mouseleave="selectImg(i, 'leave')"
                v-for="(img, i) in images"
                :src="img"
              )
          .cover-selector__next(@click="toNext")
</template>

<script>
import ChocDialog from '../dialog/dialog'

let completedCount = 0 // 完成加载的图片数量
let maxRightDistance = 0 // 选择框最多能向右滑动的距离
const distances = [] // 缓存每张图片到最左侧的距离以增加性能
const selectedTotalWidth = 430 // 选择框总长度为430px
const selectedBorder = 2 // 选择框的border宽度

export default {
  components: {
    ChocDialog
  },
  props: {
    // 具体的图片数据
    images: {
      type: Array,
      default: () => []
    },
    // 默认选中的图片索引
    defaultActiveIndex: {
      type: Number,
      default: 0
    },
    // 达到最后一张，点击下一张则返回第一张
    isCircular: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      activeIndex: this.defaultActiveIndex, // 已选择的图片Index
      visible: true, // 是否显示dialog
      selectedWidth: 0, // 选择框的长度
      transition: true, // 是否开启选择框的动画
      selectedOffset: 0, // 选择框偏移距离
      imagesOffset: 0, // 缩略图偏移距离
      moveDistance: 0 // 用户移动鼠标的水平距离
    }
  },
  computed: {
    selectedStyle () {
      return `margin-left: ${this.selectedOffset - selectedBorder}px; width: ${this.selectedWidth}px`
    },
    imagesStyle () {
      return `transform: translateX(${-(this.imagesOffset - this.moveDistance)}px)`
    }
  },
  watch: {
    activeIndex (newIndex, oldIndex) {
      this.computeSelected(newIndex, oldIndex)
    }
  },
  methods: {
    computeSelected (newIndex, oldIndex) {
      this.selectedWidth = distances[newIndex].width
      const originOffsetLeft = distances[newIndex].offset
      const originWidth = distances[newIndex].width
      if (originOffsetLeft - this.imagesOffset + this.selectedWidth > selectedTotalWidth) {
        // 选择框超出右边缘的情况
        if (oldIndex == null) {
          // 处理用户滑动却没有变化Index的情况
          if (this.moveDistance) {
            this.selectedOffset = selectedTotalWidth - this.selectedWidth
            this.imagesOffset = originOffsetLeft - this.selectedOffset
          }
        } else {
          if (newIndex < oldIndex) {
            if (originOffsetLeft + originWidth > selectedTotalWidth) {
              this.selectedOffset = selectedTotalWidth - originWidth
              this.imagesOffset = originOffsetLeft + originWidth - selectedTotalWidth
            } else {
              this.selectedOffset = originOffsetLeft - this.imagesOffset
            }
          } else {
            this.selectedOffset = selectedTotalWidth - this.selectedWidth
            this.imagesOffset = originOffsetLeft - this.selectedOffset
          }
        }
      } else if (originOffsetLeft - this.imagesOffset <= 0) {
        // 选择框超出左边缘的情况
        this.selectedOffset = 0
        this.imagesOffset = originOffsetLeft
      } else {
        this.selectedOffset = originOffsetLeft - this.imagesOffset
      }
    },
    // 空函数
    noop () {},
    // 初始化一些变量
    init () {
      const initInstances = () => {
        if (distances.length > 0) return

        distances.push({
          offset: 0,
          width: 0
        })
        const images = [...this.$refs['images'].children]
        for (let [index, image] of images.entries()) {
          distances.push({
            offset: distances[index].offset + image.width,
            width: 0
          })
          distances[index].width = image.width
          image.width = distances[index].width
        }
        maxRightDistance = distances[(this.images.length)].offset - selectedTotalWidth
      }
      completedCount++
      if (completedCount === this.images.length) {
        completedCount = 0
        initInstances()
        this.selectedWidth = distances[0].width
      }
    },
    // 打开Dialog
    openDialog () {
      this.visible = true
    },
    // 直接点击图片进行选择
    selectImg (i, type) {
      if (type === 'down') {
        this.isImageClicking = true
      } else if (type === 'leave') {
        this.isImageClicking = false
      } else {
        if (this.isImageClicking && !this.moveDistance) {
          this.activeIndex = i
          this.isImageClicking = false
        }
      }
    },
    // 通过箭头选择下一张照片
    toNext () {
      if (this.activeIndex === this.images.length - 1) {
        if (this.isCircular) this.activeIndex = 0
        return
      }
      this.activeIndex++
    },
    // 通过箭头选择上一张照片
    toLast () {
      if (this.activeIndex === 0) return
      this.activeIndex--
    },
    // 用户点击确定按钮emit一个confirm事件
    toConfirm () {
      this.$emit('confirm', {
        url: this.images[this.activeIndex]
      })
    },
    // 以下为实现可拖拽选择框的三个事件处理函数
    begin (e) {
      this.initialDistance = e.screenX
    },
    move (e) {
      if (this.initialDistance) {
        this.transition = false
        const moveDistance = e.screenX - this.initialDistance

        // 判断选择框是否溢出
        if (moveDistance < 0 && this.imagesOffset - moveDistance > maxRightDistance) {
          this.moveDistance = this.imagesOffset - maxRightDistance
        } else if (moveDistance > 0 && this.imagesOffset - moveDistance < 0) {
          this.moveDistance = this.imagesOffset
        } else {
          this.moveDistance = moveDistance
        }
      }
    },
    stop (e) {
      if (!this.initialDistance) return

      this.transition = true
      this.initialDistance = 0
      this.imagesOffset -= this.moveDistance

      // 以选择框的左边缘为参考点
      // 离它最近的左边元素的offset为leftOffset；rightOffset、rightIndex同理
      let rightIndex
      for (let [index, item] of distances.entries()) {
        if (item.offset > this.imagesOffset + this.selectedOffset) {
          rightIndex = index
          break
        }
      }
      const rightOffset = distances[rightIndex].offset - this.imagesOffset
      const leftOffset = distances[rightIndex - 1].offset - this.imagesOffset
      if (rightOffset - this.selectedOffset > this.selectedOffset - leftOffset) {
        const nextIndex = rightIndex - 1
        this.activeIndex === nextIndex
          ? this.computeSelected(nextIndex)
          : this.activeIndex = nextIndex
      } else {
        const nextIndex = rightIndex
        this.activeIndex === nextIndex
          ? this.computeSelected(nextIndex)
          : this.activeIndex = nextIndex
      }
      this.moveDistance = 0
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"

  .cover-selector
    padding: 10px 20px
    .cover-selector__button
      @include button()
  .cover-selector__wrapper
    text-align: center
    .cover-selector__cover
      height: 250px
    .cover-selector__selector
      display: flex
      justify-content: space-between
      align-items: center
      width: 500px
      margin: 30px auto 0 auto
      background-color: #606266
      padding: 5px 0
      border-radius: 5px
      .cover-selector__last
        @include arrow(45deg)
      .cover-selector__next
        @include arrow(-135deg)
      .cover-selector__thumbnails-wrapper
        overflow: hidden
        max-width: 430px
      .cover-selector__selected
        width: 40px
        height: 60px
        border: 2px solid white
        position: absolute
        margin-top: -2px
        /*cursor: pointer*/
        z-index: 100
        border-radius: 3px
        &.transition
          transition: all 0.3s ease-in-out
      .cover-selector__thumbnails
        display: flex
        &.transition
          transition: all 0.3s ease-in-out
        .cover-selector__thumbnail
          height: 60px
          vertical-align: bottom
          /*cursor: pointer*/
  .de
</style>
