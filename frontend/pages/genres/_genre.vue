<template>
  <div>
    <NiHeader />
    <ListGenre />
    <NiMobileHeader />
  </div>
</template>

<script>
import NiHeader from '../../components/NiHeader'
import ListGenre from '../../components/Genres/ListGenre'
import NiMobileHeader from '../../components/NiMobileHeader'
export default {
  components: {
    NiHeader,
    ListGenre,
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
