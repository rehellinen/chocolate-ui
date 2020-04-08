<template lang="pug">
  div
    choc-cover-selector(
      @confirm="toConfirm"
      :images="images"
      :defaultActiveIndex="0"
    )
</template>

<script>
import ChocCoverSelector from '../../components/cover-selector/cover-selector'

import img1 from 'assets/images/QJ6133258871.jpg'
import img2 from 'assets/images/QJ6152099496.jpg'
import img3 from 'assets/images/QJ6157120589.jpg'
import img4 from 'assets/images/QJ6159334465.jpg'
import img5 from 'assets/images/QJ6159996919.jpg'
import img6 from 'assets/images/QJ6178757336.jpg'
import img7 from 'assets/images/QJ6282401676.jpg'
import img8 from 'assets/images/QJ6294769143.jpg'

export default {
  components: {
    ChocCoverSelector
  },
  data () {
    return {
      images: [img1, img2, img3, img4, img5, img6, img7, img8, img1, img2, img1, img2, img1, img2, img1, img2]
    }
  },
  methods: {
    toConfirm (data) {
      console.log(data)
    }
  }
}
</script>

<style scoped>

</style>
