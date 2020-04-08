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
                @load="initDistance"
                @click="selectImg(i)"
                v-for="(img, i) in images"
                :src="img"
              )
          .cover-selector__next(@click="toNext")
</template>

<script>
import ChocDialog from '../dialog/dialog'

let completedCount = 0 // 完成加载的图片数量
const distances = [] // 缓存每张图片到最左侧的距离以增加性能
const selectedTotalWidth = 430 // 选择框总长度为430px
const selectedBorder = 2 // 选择框的border宽度

export default {
  components: {
    ChocDialog
  },
  props: {
    images: {
      type: Array,
      default: () => []
    },
    defaultActiveIndex: {
      type: Number,
      default: 0
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
    activeIndex (newIndex) {
      this.computeSelected(newIndex)
    }
  },
  methods: {
    computeSelected (newIndex) {
      this.selectedWidth = distances[newIndex].width
      const originOffsetLeft = distances[newIndex].offset

      if (originOffsetLeft + this.selectedWidth > selectedTotalWidth) {
        this.selectedOffset = selectedTotalWidth - this.selectedWidth
        this.imagesOffset = originOffsetLeft - this.selectedOffset
      } if (originOffsetLeft - this.imagesOffset <= 0) {
        this.selectedOffset = 0
        this.imagesOffset = originOffsetLeft
      } else {
        this.selectedOffset = originOffsetLeft - this.imagesOffset
      }
    },
    noop () {},
    initDistance () {
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
      }
      completedCount++
      if (completedCount === this.images.length) {
        completedCount = 0
        initInstances()
        this.selectedWidth = distances[0].width
      }
    },
    openDialog () {
      this.visible = true
    },
    // 直接点击图片进行选择
    selectImg (i) {
      // this.activeIndex = i
    },
    // 通过箭头选择下一张照片
    toNext () {
      if (this.activeIndex === this.images.length - 1) return
      this.activeIndex++
    },
    // 通过箭头选择上一张照片
    toLast () {
      if (this.activeIndex === 0) return
      this.activeIndex--
    },
    toConfirm () {
      this.$emit('confirm', {
        url: this.images[this.activeIndex]
      })
    },
    // 以下为实现可拖拽选择框的四个事件处理函数
    begin (e) {
      this.transition = false
      this.initialDistance = e.screenX
    },
    move (e) {
      if (this.initialDistance) {
        const maxRight = distances[(this.images.length)].offset - selectedTotalWidth
        const moveDistance = e.screenX - this.initialDistance

        // 判断选择框是否溢出
        if (moveDistance < 0 && this.imagesOffset - moveDistance > maxRight) {
          this.moveDistance = this.imagesOffset - maxRight
        } else if (moveDistance > 0 && this.imagesOffset - moveDistance < 0) {
          this.moveDistance = this.imagesOffset
        } else {
          this.moveDistance = moveDistance
        }
      }
    },
    stop (e) {
      if (this.initialDistance) {
        this.transition = true
        this.initialDistance = 0

        this.imagesOffset -= this.moveDistance
        this.moveDistance = 0
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
          if (this.activeIndex === rightIndex - 1) {
            this.computeSelected(this.activeIndex)
          } else {
            this.activeIndex = rightIndex - 1
          }
        } else {
          if (this.activeIndex === rightIndex) {
            this.computeSelected(this.activeIndex)
          }
          this.activeIndex = rightIndex
        }
      }
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
      height: 100px
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
