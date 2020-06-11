<template>
  <div>
    <NiHeader />
    <NiLatestEpisodes />
    <NiMobileHeader />
  </div>
</template>

<script>
import NiHeader from '../components/NiHeader'
import NiLatestEpisodes from '../components/NiLatestEpisodes'
import NiMobileHeader from '../components/NiMobileHeader'
export default {
  components: {
    NiHeader,
    NiLatestEpisodes,
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
