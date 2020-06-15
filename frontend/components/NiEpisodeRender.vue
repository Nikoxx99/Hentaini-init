<template>
  <v-container>
    <v-row>
      <v-col style="padding-bottom:0">
        <v-breadcrumbs :items="breadcrumb" divider="•" style="padding:0.8rem 0.8rem 0 0.1rem" />
      </v-col>
    </v-row>
    <v-row
      class="mb-3"
    >
      <v-col
        cols="12"
        lg="7"
        md="6"
        sm="6"
        xs="12"
        class="d-flex"
      >
        <h1 class="align-self-center">
          {{ episode.serie.title }} • Episode {{ episode.episode_number }}
        </h1>
      </v-col>
      <v-col
        cols="12"
        lg="5"
        md="6"
        sm="6"
        sx="12"
      >
        <v-btn-toggle
          rounded
          class="float-right"
        >
          <v-btn
            v-if="episodeCount[0] !== episode.episode_number"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-view-list</v-icon>
            Episode List
          </v-btn>
          <v-btn
            v-if="episodeCount.slice(-1)[0] !== episode.episode_number"
            :to="nextEpisodeUrl.concat('', episode.episode_number+1)"
          >
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <VideoElement :src="currentUrl" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
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
                :ref="player.url"
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
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import VideoElement from './VideoElement'
export default {
  components: {
    VideoElement
  },
  async fetch () {
    await this.$apollo.query({
      query: gql`query ($urlName: String){
        EpisodeByUrlName(urlName: $urlName){
          serie{
            title
            episodes{
              episode_number
            }
          }
          urlName
          episode_number
          players{
            name
            url
          }
          downloads{
            url
          }
        }
      }`,
      variables: {
        urlName: this.$route.params.episode
      }
    }).then((input) => {
      this.episode = input.data.EpisodeByUrlName
      this.currentUrl = input.data.EpisodeByUrlName.players[0].url
      for (let i = 0; i < input.data.EpisodeByUrlName.serie.episodes.length; i++) {
        this.episodeCount.push(input.data.EpisodeByUrlName.serie.episodes[i].episode_number)
      }
      this.breadcrumb[1].text = input.data.EpisodeByUrlName.serie.title
      this.breadcrumb[1].href = input.data.EpisodeByUrlName.urlName
      this.nextEpisodeUrl = input.data.EpisodeByUrlName.urlName.slice(0, -1)
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error)
    })
  },
  data () {
    this.$i18n.locale = 'en'
    return {
      locale: 'en',
      currentUrl: '',
      nextEpisodeUrl: '',
      episodeCount: [],
      episode: {
        serie: {
          title: ''
        },
        episode_number: '',
        players: {
          short_name: '',
          url: ''
        },
        downloads: {
          url: ''
        }
      },
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
      ]
    }
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
