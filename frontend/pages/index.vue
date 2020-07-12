<template>
  <div>
    <NiHeader />
    <Carousel />
    <NiLatestEpisodes />
    <v-container><v-divider /></v-container>
    <NiLatestSeries />
    <NiMobileHeader />
  </div>
</template>

<script>
import NiHeader from '../components/NiHeader'
import NiLatestEpisodes from '../components/NiLatestEpisodes'
import NiLatestSeries from '../components/NiLatestSeries'
import NiMobileHeader from '../components/NiMobileHeader'
import Carousel from '../components/Carousel/Carousel'
export default {
  components: {
    NiHeader,
    NiLatestEpisodes,
    NiLatestSeries,
    NiMobileHeader,
    Carousel
  },
  data () {
    return {
      title: 'Hentaini | Make your parents proud'
    }
  },
  methods: {
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'language', name: 'language', content: 'es' },
        { hid: 'audience', name: 'audience', content: 'all' },
        { hid: 'rating', name: 'rating', content: 'general' },
        { hid: 'distribution', name: 'distribution', content: 'global' },
        { hid: 'document-type', name: 'document-type', content: 'Public' },
        { hid: 'MSSmartTagsPreventParsing', name: 'MSSmartTagsPreventParsing', content: 'true' },
        { hid: 'robots', name: 'robots', content: 'all' },
        { hid: 'robots', name: 'robots', content: 'all, index, follow' },
        { hid: 'googlebot', name: 'googlebot', content: 'all, index, follow' },
        { hid: 'yahoo-slurp', name: 'yahoo-slurp', content: 'all, index, follow' },
        { hid: 'msnbot', name: 'msnbot', content: 'index, follow' },
        { hid: 'googlebot-image', name: 'googlebot-image', content: 'all' },
        { hid: 'title', name: 'title', content: this.title },
        { hid: 'og:title', property: 'og:title', content: this.title },
        { hid: 'og:description', property: 'og:description', content: 'Its a Hentai site, what do you expect? a no-girlfriend-depression solution?' },
        { hid: 'og:url', property: 'og:url', content: 'https://hentaini.com' },
        { hid: 'og:image', property: 'og:image', content: 'https://hentaini.com/hentaini.jpg' },
        { hid: 'author', name: 'author', content: 'hentaini' }
      ]
    }
  }
}
</script>
