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
        .cover-selector__selector
          .cover-selector__last(@click="toLast")
          .cover-selector__thumbnails
            .cover-selector__selected(:style="selectedStyle")
            img.cover-selector__thumbnail(v-for="img in images" :src="img")
          .cover-selector__next(@click="toNext")
</template>

<script>
import ChocDialog from '../dialog/dialog'

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
      activeIndex: this.defaultActiveIndex,
      visible: true
    }
  },
  computed: {
    selectedStyle () {
      const offsetLeft = this.activeIndex * 40 - 2
      return `margin-left: ${offsetLeft}px`
    }
  },
  methods: {
    openDialog () {
      this.visible = true
    },
    toNext () {
      if (this.activeIndex === this.images.length - 1) {
        return
      }
      this.activeIndex++
    },
    toLast () {
      if (this.activeIndex === 0) {
        return
      }
      this.activeIndex--
    },
    toConfirm () {
      this.$emit('confirm', {
        url: this.images[this.activeIndex]
      })
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
      .cover-selector__thumbnails
        .cover-selector__thumbnail
          width: 40px
          height: 60px
          vertical-align: bottom
  .de
</style>
