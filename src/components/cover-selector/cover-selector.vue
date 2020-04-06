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
          .cover-selector__thumbnails(ref="images")
            .cover-selector__selected(
              @mousedown="begin"
              :style="selectedStyle"
              :class="{ transition }"
            )
            img.cover-selector__thumbnail(
              @click="selectImg(i)"
              v-for="(img, i) in images"
              :src="img"
            )
          .cover-selector__next(@click="toNext")
</template>

<script>
import ChocDialog from '../dialog/dialog'

const thumbnailWidth = 40

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
      transition: true, // 是否开启选择框的动画
      offsetLeft: -2, // 选择框距离最左侧图片的距离
      moveDistance: 0 // 鼠标拖动选择框的距离
    }
  },
  computed: {
    selectedStyle () {
      return `margin-left: ${this.offsetLeft + this.moveDistance}px;`
    }
  },
  watch: {
    activeIndex (val) {
      this.offsetLeft = val * thumbnailWidth - 2
    }
  },
  methods: {
    openDialog () {
      this.visible = true
    },
    // 直接点击图片进行选择
    selectImg (i) {
      this.activeIndex = i
    },
    // 通过箭头选择上一张照片
    toNext () {
      if (this.activeIndex === this.images.length - 1) return
      this.activeIndex++
    },
    // 通过箭头选择下一张照片
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
      width: 200px
      height: 300px
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
        &.transition
          transition: margin-left 0.4s ease-in-out
      .cover-selector__thumbnails
        .cover-selector__thumbnail
          width: 40px
          height: 60px
          vertical-align: bottom
          cursor: pointer
  .de
</style>
