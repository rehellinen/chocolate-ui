<template lang="pug">
  .cover-selection
    button.open-button(@click="openDialog") 点击打开
    my-dialog(:visible.sync="visible")
      p 123123
</template>

<script>
import MyDialog from '../dialog/dialog'

export default {
  components: {
    MyDialog
  },
  data () {
    return {
      visible: true
    }
  },
  methods: {
    openDialog () {
      this.visible = true
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"

  .cover-selection
    padding: 10px 20px
    .open-button
      @include button()
  .de
</style>
