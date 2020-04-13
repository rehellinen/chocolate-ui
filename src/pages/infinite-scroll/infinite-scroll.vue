<template lang="pug">
  div.load-more__wrapper
    ul.load-more__list(
      v-infinite-scroll="load"
      :infinite-scroll-disabled="disabled"
    )
      li.load-more__item(v-for="item in data") {{item}}
</template>

<script>

export default {
  data () {
    return {
      disabled: false,
      data: [1, 2, 3, 4, 5]
    }
  },
  methods: {
    load () {
      this.data.push(this.data.length + 1)
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"

  .load-more__wrapper
    height: 200px
    overflow-y: auto
    .load-more__item
      background-color: $theme-color
      margin: 10px 0
      padding: 10px 0
      text-align: center
      color: white
</style>
