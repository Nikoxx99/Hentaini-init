<template>
  <div>
    <NiHeader />
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
export default {
  components: {
    NiHeader,
    NiLatestEpisodes,
    NiLatestSeries,
    NiMobileHeader
  },
  data () {
    this.$i18n.locale = 'en'
    return {
      locale: 'en'
    }
  }
}
</script>
