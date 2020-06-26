<template>
  <div>
    <NiHeader />
    <NiEpisodeRender />
  </div>
</template>

<script>
import NiHeader from '../../../../components/NiHeader'
import NiEpisodeRender from '../../../../components/NiEpisodeRender'
export default {
  components: {
    NiHeader,
    NiEpisodeRender
  },
  data () {
    this.$i18n.locale = 'en'
    return {
      locale: 'en'
    }
  }
}
</script>
