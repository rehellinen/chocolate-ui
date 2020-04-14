<template lang="pug">
  div.load-more__wrapper
    // ul.load-more__list(
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
      infinite-scroll-data="data"
      )
      li.load-more__item(v-for="item in data") {{item}}

    choc-infinite-scroll(:list.sync='data' @load="load")

</template>

<script>
import ChocInfiniteScroll from '../../components/infinite-scroll/infinite-scroll'

export default {
  components: {
    ChocInfiniteScroll
  },
  data () {
    return {
      disabled: false,
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  methods: {
    load () {
      for (let i = 0; i < 10; i++) {
        this.data.push(this.data.length + 1 + i)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"

  .load-more__wrapper
    height: 300px
    overflow-y: auto
    .load-more__item
      background-color: $theme-color
      margin: 10px 0
      padding: 10px 0
      text-align: center
      color: white
</style>
