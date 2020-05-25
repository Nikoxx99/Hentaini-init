<template>
  <v-app dark>
    <NiHeader />
    <NiLatestEpisodes />
    <NiMobileHeader />
  </v-app>
</template>

<script>
import NiHeader from '../components/NiHeader'
import NiMobileHeader from '../components/NiMobileHeader'
import NiLatestEpisodes from '../components/NiLatestEpisodes'
export default {
  components: {
    NiHeader,
    NiMobileHeader,
    NiLatestEpisodes
  },
  data () {
    this.$i18n.locale = 'en'
    return {
      locale: 'en'
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  background: #f4f4f4;
}

a {
  color: #666;
  text-decoration: none;
}

ul {
  list-style: none;
}
</style>
