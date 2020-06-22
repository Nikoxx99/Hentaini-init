<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" xl="8" lg="7" md="12" sm="12">
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
              <h2 class="align-self-center">
                {{ episode.serie.title }} • {{ $t('episode.episode_number') }} {{ episode.episode_number }}
              </h2>
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
      </v-col>
      <v-col cols="12" xl="4" lg="5" md="12" sm="12">
        <v-container>
          <v-row>
            <v-card
              class="mx-auto"
              width="100%"
            >
              <v-img
                height="250"
                :src="'http://cdn.hentaini.com/screenshot/'+episode.serie.coverUrl"
              />

              <v-card-title>{{ episode.serie.title }}</v-card-title>

              <v-card-text>
                <v-row
                  align="center"
                  class="mx-0"
                >
                  <v-rating
                    v-model="rating"
                    length="5"
                    empty-icon="mdi-heart-outline"
                    full-icon="mdi-heart"
                    half-icon="mdi-heart-half-full"
                    half-increments
                    hover
                    medium
                    :dense="false"
                    color="blue darken-3"
                    background-color="blue"
                  />
                  <span class="font-weight-bold">
                    {{ rating }}
                  </span>
                </v-row>

                <div class="my-4 subtitle-1">
                  <v-btn
                    class=""
                    color="primary"
                    outlined
                    rounded
                  >
                    {{ episode.serie.status }}
                    <v-icon right>
                      mdi-youtube-tv
                    </v-icon>
                  </v-btn>
                  <v-btn
                    color="pink darken-1"
                    rounded
                    outlined
                  >
                    <v-icon left>
                      mdi-heart
                    </v-icon>
                    {{ $t('episode.add_favorite') }}
                  </v-btn>
                </div>

                <div>{{ episode.serie.synopsis }}</div>
              </v-card-text>

              <v-divider class="mx-4" />

              <v-card-text>
                <v-chip-group
                  active-class="blue darken-3"
                  column
                >
                  <v-chip
                    v-for="genre in episode.serie.genres"
                    :key="genre.text"
                  >
                    {{ genre.text }}
                  </v-chip>
                </v-chip-group>
              </v-card-text>

              <v-card-actions>
                {{ $t('episode.show_episodes') }}
                <v-btn
                  icon
                  @click="show = !show"
                >
                  <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-card-actions>
              <v-expand-transition>
                <div v-show="show">
                  <v-divider />

                  <v-list shaped>
                    <v-subheader>Episodes for {{ episode.serie.title }}</v-subheader>
                    <v-list-item-group color="primary">
                      <v-list-item
                        v-for="episode_item in episode.serie.episodes"
                        :key="episode_item.episode_number"
                      >
                        <v-list-item-icon>
                          <span background-color="blue darken-4">{{ episode_item.episode_number }}</span>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <a :href="nextEpisodeUrl.concat('', episode_item.episode_number)"><v-list-item-title v-text="episode.serie.title" /></a>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </div>
              </v-expand-transition>
            </v-card>
          </v-row>
        </v-container>
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
            synopsis
            genres{
              text
            }
            episodes{
              episode_number
            }
            status
            coverUrl
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
      this.currentUrl = this.episode.players[0].url
      for (let i = 0; i < this.episode.serie.episodes.length; i++) {
        this.episodeCount.push(this.episode.serie.episodes[i].episode_number)
      }
      this.breadcrumb[1].text = this.episode.serie.title
      this.breadcrumb[1].href = this.episode.urlName
      this.nextEpisodeUrl = this.episode.urlName.slice(0, -1)
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error)
    })
  },
  data () {
    this.$i18n.locale = 'en'
    return {
      locale: 'en',
      episode: {
        serie: {
          synopsis: '',
          title: '',
          genres: {
            value: ''
          },
          episodes: {
            episode_number: 0
          },
          status: '',
          coverUrl: ''
        },
        episode_number: '',
        urlName: '',
        players: [
          {
            short_name: '',
            url: ''
          }
        ],
        downloads: [
          {
            url: ''
          }
        ]
      },
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
          text: 'Serie',
          disabled: false,
          href: ''
        },
        {
          text: 'Episode',
          disabled: true
        }
      ],
      modalDownload: false,
      rating: 0,
      show: false
    }
  },
  mounted () {
    this.breadcrumb[2].text = 'Episode ' + this.episode.episode_number
    this.breadcrumb[1].text = this.episode.serie.title
    this.breadcrumb[1].href = '/episode/' + this.episode.urlName
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
