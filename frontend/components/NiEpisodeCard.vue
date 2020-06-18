<template>
  <a :href="'/episode/' + url">
    <v-card
      class="mx-auto"
      flat
      tile
      color="#111"
    >
      <v-img
        class="white--text align-end"
        :aspect-ratio="16/9"
        :src="screenshot"
      >
        <v-card-text class="text--primary">
          <v-chip
            color="blue darken-3"
            text-color="white"
          >
            <v-icon left>mdi-play</v-icon>
            Episode: {{ episodeNumber }}
          </v-chip>
        </v-card-text>
      </v-img>
      <v-card-title style="padding-left:0">{{ title }}</v-card-title>
    </v-card>
  </a>
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
      type: Number,
      default: 0
    },
    status: {
      type: String,
      default: 'No Status'
    },
    url: {
      type: String,
      default: ''
    },
    screenshot: {
      type: String,
      default: ''
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
