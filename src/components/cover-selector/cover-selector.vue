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
          @mousemove="move"
          @mouseleave="stop"
          @mouseup="stop"
        )
          .cover-selector__last(@click="toLast")
          .cover-selector__thumbnails-wrapper
            .cover-selector__selected(
              @mousedown="begin"
              :style="selectedStyle"
              :class="{ transition }"
            )
            .cover-selector__thumbnails(
              :style="imagesStyle"
              ref="images"
            )
              img.cover-selector__thumbnail(
                @load="initDistance"
                @click="selectImg(i)"
                v-for="(img, i) in images"
                :src="img"
              )
          .cover-selector__next(@click="toNext")
</template>

<script>
import ChocDialog from '../dialog/dialog'

let thumbnailWidth = 40
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
      imagesOffset: 0 // 缩略图偏移距离
    }
  },
  computed: {
    selectedStyle () {
      return `margin-left: ${this.selectedOffset - selectedBorder}px; width: ${this.selectedWidth}px`
    },
    imagesStyle () {
      return `transform: translateX(-${this.imagesOffset}px)`
    }
  },
  watch: {
    activeIndex (newIndex) {
      this.selectedWidth = distances[newIndex].width
      const originOffsetLeft = distances[newIndex].offset

      if (originOffsetLeft + this.selectedWidth > selectedTotalWidth) {
        this.selectedOffset = selectedTotalWidth - this.selectedWidth
        this.imagesOffset = originOffsetLeft - this.selectedOffset
      } if (originOffsetLeft <= 0) {
        this.selectedOffset = 0
        this.imagesOffset = 0
      } else {
        this.selectedOffset = originOffsetLeft - this.imagesOffset
      }
    }
  },
  methods: {
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
      this.activeIndex = i
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
      this.initialDistance = e.clientX
    },
    move (e) {
      if (this.initialDistance) {
        const maxLeft = this.activeIndex * thumbnailWidth
        const maxRight = (this.images.length - this.activeIndex - 1) * thumbnailWidth
        const moveDistance = e.clientX - this.initialDistance

        // 判断选择框是否溢出
        if (moveDistance > maxRight) {
          this.moveDistance = maxRight
        } else if (moveDistance < 0 && -moveDistance > maxLeft) {
          this.moveDistance = -maxLeft
        } else {
          this.moveDistance = moveDistance
        }
      }
    },
    stop (e) {
      if (this.initialDistance) {
        this.transition = true
        const allLeft = this.offsetLeft + this.moveDistance
        this.activeIndex = Math.round(allLeft / thumbnailWidth)
        this.initialDistance = 0
        this.moveDistance = 0
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
      .cover-selector__selected
        width: 40px
        height: 60px
        border: 2px solid white
        position: absolute
        margin-top: -2px
        cursor: pointer
        z-index: 100
        border-radius: 3px
        &.transition
          transition: all 0.4s ease-in-out
      .cover-selector__thumbnails-wrapper
        overflow: hidden
        max-width: 430px
      .cover-selector__thumbnails
        display: flex
        transition: all 0.4s ease-in-out
        .cover-selector__thumbnail
          height: 60px
          vertical-align: bottom
          cursor: pointer
  .de
</style>
