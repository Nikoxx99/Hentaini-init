<template>
  <v-bottom-navigation
    grow
    color="blue"
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
      locale: 'en'
    }
  }
}
</script>

<style>

</style>
