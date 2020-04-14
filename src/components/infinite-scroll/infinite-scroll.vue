<template lang="pug">
  .infinite-scroll__wrapper(@scroll="handleScroll")
    ul.infinite-scroll__list(:style="{ paddingTop: lineTopHeight +'px', paddingBottom: lineBottomHeight +'px'}")
      li.infinite-scroll__item(v-for="item in previewList") {{item}}
</template>

<script>

export default {
  props: {
    list: {
      type: Array,
      required: true,
      default: () => [],
      twoWays: true
    },
    height: {
      type: Number,
      default: 45
    },
    canScroll: {
      type: Boolean,
      default: true
    },
    dispatchData: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      lastScrollTop: null,
      distance: 44,
      lineTopHeight: 0,
      lineBottomHeight: 0,
      canLoadmore: true,
      previewList: [],
      displayCount: 0
    }
  },
  mounted () {
    this.initData()
    this.handleScroll()
  },
  methods: {
    initData () {
      this._rowsInWindow = Math.ceil(this.$el.offsetHeight / this.height)
      this._above = this._rowsInWindow * 2
      this._below = this._rowsInWindow
      this._max = this._rowsInWindow * this.height
    },
    handleScroll () {
      let _scrollTop = this.$el.scrollTop
      let _height = this.$el.querySelectorAll('ul')[0].offsetHeight
      let _contentHeight = this.$el.offsetHeight

      if (_scrollTop / this.height - Math.floor(_scrollTop / this.height) > 0.5) {
        this.displayCount = Math.ceil(_scrollTop / this.height)
      } else {
        this.displayCount = Math.floor(_scrollTop / this.height)
      }

      if (this.lastScrollTop === null || Math.abs(_scrollTop - this.lastScrollTop) > this._max) {
        this.lastScrollTop = _scrollTop
      } else {
        if (this.to === this.list.length && _height - _scrollTop - _contentHeight < this.distance) {
          this.canScroll && this.loadmore(this.from, this.to)
        }
        return
      }

      let _from = parseInt(_scrollTop / this.height) - this._above
      if (_from < 0) {
        _from = 0
      }
      let _to = _from + this._above + this._below + this._rowsInWindow
      if (_to > this.list.length) {
        _to = this.list.length
      }
      this.from = _from
      this.to = _to

      this.lineTopHeight = _from * this.height
      this.lineBottomHeight = (this.list.length - _to) * this.height

      if (typeof this.dispatchData === 'function') {
        this.dispatchData(this)
      }

      this.resetPreviewList(_from, _to)

      this.$nextTick(() => {
        let _scrollTop = this.$el.scrollTop
        let _height = this.$el.querySelectorAll('ul')[0].offsetHeight
        let _contentHeight = this.$el.offsetHeight

        if (_to === this.list.length && _height - _scrollTop - _contentHeight < 0) {
          this.canScroll && this.loadmore(this.from, this.to)
        }
      })
    },
    loadmore (from, to) {
      if (!this.canLoadmore) return
      this.canLoadmore = false
      this.$emit('load')

      let _from = from
      let _to = to + this._below
      this.resetPreviewList(_from, _to)
      this.lineBottomHeight = (this.list.length - _to) * this.height
      this.handleScroll()

      this.canLoadmore = true
    },
    resetPreviewList (from, to) {
      this.previewList = []
      for (; from < to; from++) {
        this.previewList.push(this.list[from])
      }
    }
  }
}
</script>

<style lang="sass">
  @import "~sass/base"

  .infinite-scroll__wrapper
    width: 100%
    height: 100%
    overflow-y: auto
    .infinite-scroll__list
      margin: 0
      padding: 0
      .infinite-scroll__item
        height: 45px
        font-size: 14px
        line-height: 45px
        padding-left: 15px
        background: $theme-color
        margin-bottom: 5px
        color: white
</style>
