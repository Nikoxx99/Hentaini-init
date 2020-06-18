<template>
  <v-bottom-navigation
    v-if="windowWidth < 960"
    grow
    color="blue"
    fixed
  >
    <v-btn to="/">
      <span>{{ $t('mobile.home') }}</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn to="/airing">
      <span>{{ $t('mobile.airing') }}</span>
      <v-icon>mdi-plus-thick</v-icon>
    </v-btn>

    <v-btn to="/suggestions">
      <span>{{ $t('mobile.suggestions') }}</span>
      <v-icon>mdi-format-list-bulleted-square</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'NiMobileHeader',
  data () {
    this.$i18n.locale = 'en'
    return {
      locale: 'en',
      windowWidth: ''
    }
  },
  mounted () {
    this.windowWidth = window.innerWidth
  }
}
</script>

<style>

</style>
