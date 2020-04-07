<template lang="pug">
  ul.menu__wrapper
    li.menu__link(v-for="menu in menus")
      router-link(tag="span" :to="menu.path") {{menu.name}}
</template>

<script>
export default {
  data () {
    return {
      menus: [{
        name: '封面选择',
        path: '/cover_selection'
      }, {
        name: '无限加载',
        path: '/load_more'
      }]
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"

  .menu__wrapper
    display: flex
    justify-content: space-around
    background-color: $theme-color
    height: 50px
    align-items: center
    .menu__link
      font-size: 15px
      color: white
      cursor: pointer
  .de
</style>
