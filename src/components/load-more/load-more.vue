<template lang="pug">
  .load-more()
    .load-more__content
    .load-more__footer
      p(v-if="hasMore") 加载中
      p(v-else) 暂无更多内容
      img(src="/static/images/theme/page-loading.gif", v-if="hasMore")
</template>

<script>
export default {
  data () {
    return {
      hasMore: true
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"
</style>
