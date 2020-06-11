<template>
  <nuxt-link :to="'/episode/' + episode">
    <v-card
      class="mx-auto"
      max-width="400"
    >
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <v-card-title>{{ title }}</v-card-title>
      </v-img>

      <v-card-subtitle class="pb-0">
        ID: {{ episode }}
      </v-card-subtitle>

      <v-card-text class="text--primary">
        <div>{{ status }}</div>

        <div>Episode: {{ episodeNumber }}</div>
      </v-card-text>
    </v-card>
  </nuxt-link>
</template>

<script>
export default {
  name: 'NiEpisodeCard',
  props: {
    episode: {
      type: String,
      default: '0'
    },
    title: {
      type: String,
      default: 'No Title'
    },
    episodeNumber: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: 'No Status'
    }
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

</style>
