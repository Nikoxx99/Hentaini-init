<template>
  <div>
    <div id="csgoempire" class="container">
      <div justify-center>
        <a id="beep" href="https://csgoempire.com/r/UnTalTioYT" target="_blank">
          <h4 class="rainbow rainbow_text_animated">Wanna try ur luck and make money? Just click here.</h4>
        </a>
      </div>
    </div>
    <NiHeader />
    <Carousel />
    <TagCloud />
    <NiLatestEpisodes />
    <v-container><v-divider /></v-container>
    <NiLatestSeries />
    <NiMobileHeader />
  </div>
</template>

<script>
import NiHeader from '../components/NiHeader'
import TagCloud from '../components/TagCloud'
import NiLatestEpisodes from '../components/NiLatestEpisodes'
import NiLatestSeries from '../components/NiLatestSeries'
import NiMobileHeader from '../components/NiMobileHeader'
import Carousel from '../components/Carousel/Carousel'
export default {
  components: {
    NiHeader,
    TagCloud,
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
<style>
    .rainbow_text_animated {
        background: linear-gradient(to right, #6666ff, #0099ff, #00ff00, #ff3399, #6666ff);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: rainbow_animation 1s ease-in-out infinite;
        background-size: 400% 100%;
        text-align: center;
    }

    @keyframes rainbow_animation {

        0%,
        100% {
            background-position: 0 0;
        }

        50% {
            background-position: 100% 0;
        }
    }
        /* width */
    ::-webkit-scrollbar {
    width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
    background-color:#333;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: #1294ff;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #1294ff;
    }
</style>
