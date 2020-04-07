<template lang="pug">
  transition(name="dialog")
    div(v-if="visible")
      .dialog__shadow
      .dialog__wrapper
        .dialog(:style="`width: ${width}`")
          .dialog__header
            span.dialog__title {{title}}
          .dialog__body
            slot
              span {{content}}
          .dialog__footer(v-if="showFooter")
            button.dialog__confirm(@click="toConfirm") 确定
            button.dialog__cancel(@click="toCancel") 取消
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提示'
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '50%'
    },
    content: {
      type: String,
      default: '提示'
    }
  },
  methods: {
    toCancel () {
      this.$emit('update:visible', false)
      this.$emit('cancel')
    },
    toConfirm () {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"

  $horizontal: 20px

  .dialog-enter-active, .dialog-leave-active
    transition: opacity .2s ease-in-out
  .dialog-enter, .dialog-leave-to
    opacity: 0

  .dialog__shadow
    z-index: 1000
    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    opacity: 0.5
    background-color: black

  .dialog__wrapper
    z-index: 1001
    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    .dialog
      border-radius: $border-radius
      overflow: hidden
      min-width: 250px
      margin: 15vh auto 0
      background-color: white
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3)
      .dialog__header
        padding: 15px $horizontal 10px $horizontal
        background-color: $theme-color
        .dialog__title
          font-size: 18px
          line-height: 24px
          color: white

      .dialog__body
        padding: 15px $horizontal
        color: $main-font-color
        font-size: 14px

      .dialog__footer
        padding: 10px $horizontal
        text-align: right
        .dialog__confirm
          @include button()
        .dialog__cancel
          @include button(white, black, 1px)
          margin-left: 10px
  .de
</style>
