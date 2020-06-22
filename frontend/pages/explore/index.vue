<template>
  <div>
    <NiHeader />
    <NiExplore />
  </div>
</template>

<script>
import NiHeader from '../../components/NiHeader'
import NiExplore from '../../components/NiExplore'
export default {
  components: {
    NiHeader,
    NiExplore
  },
  data () {
    this.$i18n.locale = 'en'
    return {
      locale: 'en'
    }
  }
}
</script>
