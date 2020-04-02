<template lang="pug">
  ul.menu
    li.menu-item(v-for="menu in menus")
      router-link(tag="span" :to="menu.path") {{menu.name}}
</template>

<script>
export default {
  data () {
    return {
      menus: [{
        name: '封面选择组件',
        path: '/cover_selection'
      }, {
        name: '无限加载组件',
        path: '/roll_to_load'
      }]
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"

  .menu
    display: flex
    justify-content: space-around
    background-color: $theme-color
    height: 50px
    align-items: center
    .menu-item
      font-size: 15px
      color: white
      cursor: pointer
  .de
</style>
