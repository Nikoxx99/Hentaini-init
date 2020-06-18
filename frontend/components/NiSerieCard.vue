<template>
  <a :href="'/episode/' + url">
    <v-hover v-slot:default="{ hover }">
      <v-card
        class="mx-auto"
        flat
        tile
      >
        <v-img
          :aspect-ratio="9/14"
          :src="screenshot"
        >
          <v-expand-transition>
            <div
              v-if="hover"
              class="d-flex transition-fast-in-fast-out grey darken-3 v-card--reveal display-3 white--text"
              style="height: 100%;"
            >
              <v-container>
                <v-row>
                  <Logo class="mx-auto" />
                  <v-card-title>
                    {{ title }}
                  </v-card-title>
                </v-row>
                <v-row>
                  <v-card-text>
                    {{ synopsis.substr(0,300) + '...' }}
                  </v-card-text>
                </v-row>
              </v-container>
            </div>
          </v-expand-transition>
        </v-img>
      </v-card>
    </v-hover>
  </a>
</template>

<script>
import Logo from '../components/Logo'
export default {
  name: 'NiSerieCard',
  components: {
    Logo
  },
  props: {
    episode: {
      type: String,
      default: '0'
    },
    title: {
      type: String,
      default: 'No Title'
    },
    synopsis: {
      type: String,
      default: ''
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
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .9;
  position: absolute;
  width: 100%;
}
</style>
