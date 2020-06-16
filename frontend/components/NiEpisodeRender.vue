<template>
  <v-container>
    <v-row class="d-none d-md-flex d-lg-flex d-xl-flex">
      <v-col style="padding-top:0">
        <v-breadcrumbs :items="breadcrumb" divider="•" style="padding:1rem 1rem 1rem 1rem" class="grey darken-4" />
      </v-col>
    </v-row>
    <v-row
      class="mb-3"
    >
      <v-col
        cols="12"
        lg="10"
        md="9"
        sm="8"
        xs="12"
        class="d-flex"
      >
        <h1 class="align-self-center">
          {{ episode.serie.title }} • {{ $t('episode.episode_number') }} {{ episode.episode_number }}
        </h1>
      </v-col>
      <v-col
        cols="12"
        lg="2"
        md="3"
        sm="4"
        sx="12"
      >
        <v-btn-toggle
          rounded
          class="float-right"
        >
          <v-btn
            v-if="episodeCount[0] !== episode.episode_number"
            :href="nextEpisodeUrl.concat('', episode.episode_number-1)"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <!-- <v-btn>
            <v-icon>mdi-view-list</v-icon>
            Episode List
          </v-btn> -->
          <v-btn
            v-if="episodeCount.slice(-1)[0] !== episode.episode_number"
            :href="nextEpisodeUrl.concat('', episode.episode_number+1)"
          >
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <VideoElement :src="currentUrl" />
        <v-sheet
          class="mx-auto"
          max-width="100%"
        >
          <v-slide-group show-arrows center-active mandatory>
            <v-slide-item
              v-for="player in episode.players"
              :key="player.name"
              v-slot:default="{ active, toggle }"
            >
              <v-btn
                class="mx-2"
                :input-value="active"
                active-class="blue darken-4 white--text"
                depressed
                rounded
                @click="toggle"
                @focus="changeCurrentUrl(player.url)"
              >
                {{ player.name }}
              </v-btn>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-dialog
          v-model="modalDownload"
          width="500"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="blue darken-4"
              dark
              v-bind="attrs"
              v-on="on"
            >
              {{ $t('episode.download_text') }}
            </v-btn>
          </template>

          <v-card>
            <v-card-title
              class="headline blue darken-2"
              primary-title
            >
              Download Episode {{ episode.episode_number }}
            </v-card-title>

            <v-card-text>
              Download Link
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VideoElement from './VideoElement'
export default {
  components: {
    VideoElement
  },
  props: {
    episode: {
      type: Object,
      default: () => {
        return {
          serie: {
            title: ''
          },
          episode_number: '',
          urlName: '',
          players: {
            short_name: '',
            url: '1'
          },
          downloads: {
            url: '2'
          }
        }
      }
    }
  },
  data () {
    this.$i18n.locale = 'en'
    return {
      locale: 'en',
      currentUrl: '',
      nextEpisodeUrl: '',
      episodeCount: [],
      breadcrumb: [
        {
          text: 'Hentaini',
          disabled: false,
          href: '/'
        },
        {
          text: 'Mankitsu Happening',
          disabled: false,
          href: 'breadcrumbs_link_1'
        },
        {
          text: 'Episode 1',
          disabled: true,
          href: 'breadcrumbs_link_2'
        }
      ],
      modalDownload: false
    }
  },
  mounted () {
    this.currentUrl = this.episode.players[0].url
    for (let i = 0; i < this.episode.serie.episodes.length; i++) {
      this.episodeCount.push(this.episode.serie.episodes[i].episode_number)
    }
    this.breadcrumb[1].text = this.episode.serie.title
    this.breadcrumb[1].href = this.episode.urlName
    this.nextEpisodeUrl = this.episode.urlName.slice(0, -1)
  },
  methods: {
    changeCurrentUrl (currentUrl) {
      this.currentUrl = currentUrl
    }
  }
}
</script>

<style>

</style>
