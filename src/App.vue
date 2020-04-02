<template lang="pug">
  .container
    my-menu
    .card
      router-view
</template>

<script>
import MyMenu from './components/menu/menu'

export default {
  components: {
    MyMenu
  }
}
</script>

<style lang="sass" rel="stylesheet/sass">
  @import "~sass/base"

  .container
    background-color: $background-color
    min-height: 100vh
    p
      color: $main-font-color
    .card
      @include card(0, 0)
      margin: 20px
</style>
