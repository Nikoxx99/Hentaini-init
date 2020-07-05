<template>
  <a :href="'/episode/' + url + '/' + episodeNumber">
    <v-card
      class="mx-auto"
      flat
      tile
      color="#111"
    >
      <v-hover v-slot:default="{ hover }">
        <v-img
          class="white--text align-end"
          style="position:relative"
          :gradient="hover ? 'to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)' : ''"
          :aspect-ratio="16/9"
          :src="`${CDN}/screenshot/${screenshot}`"
        >
          <div style="position:absolute;top:50%;left:50%; transform: translate(-50%, -50%)">
            <v-icon style="font-size:4rem">mdi-play</v-icon>
          </div>
          <v-card-text class="text--primary">
            <v-chip
              color="blue darken-3"
              text-color="white"
              small
            >
              <v-icon left>mdi-play</v-icon>
              Episode: {{ episodeNumber }}
            </v-chip>
          </v-card-text>
        </v-img>
      </v-hover>
      <v-card-title style="padding-left:0;font-size:1rem">{{ title }}</v-card-title>
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
      locale: 'en',
      CDN: process.env.CDN_URI
    }
  }
}
</script>

<style>

</style>
