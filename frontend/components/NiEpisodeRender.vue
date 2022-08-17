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
                {{ EpisodeByUrlName.serie.title }} • {{ $t('episode.episode_number') }} {{ EpisodeByUrlName.episode_number }}
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
                  v-if="episodeCount[0] !== EpisodeByUrlName.episode_number"
                  :href="'/episode/' + nextEpisodeUrl.concat('/', EpisodeByUrlName.episode_number-1)"
                >
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <!-- <v-btn>
                  <v-icon>mdi-view-list</v-icon>
                  Episode List
                </v-btn> -->
                <v-btn
                  v-if="episodeCount.slice(-1)[0] !== EpisodeByUrlName.episode_number"
                  :href="'/episode/' + nextEpisodeUrl.concat('/', EpisodeByUrlName.episode_number+1)"
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
                    v-for="player in EpisodeByUrlName.players"
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
                    @click="genDownloadName"
                  >
                    {{ $t('episode.download_text') }}
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title
                    class="headline blue darken-2"
                    primary-title
                  >
                    Download Episode {{ EpisodeByUrlName.episode_number }}
                  </v-card-title>

                  <v-card-text class="d-flex justify-center mt-4">
                    <v-btn
                      v-for="link in downloadsName"
                      :key="link.name"
                      :href="link.url.url"
                      color="blue darken-4 mr-2"
                      class="p-3"
                    >
                      {{ link.name }}
                    </v-btn>
                  </v-card-text>
                </v-card>
              </v-dialog>
              <Comments />
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
              <a v-if="Math.floor(Math.random() * 2) === 0" href="https://tm-offers.gamingadult.com/?offer=47&uid=d1c53b21-f8cb-414d-a456-2f0643c82204">
                <v-img
                  height="auto"
                  class="mb-4"
                  :src="`/img/${Math.floor(Math.random() * 2)}.gif`"
                />
              </a>
              <a v-else href="https://tm-offers.gamingadult.com/?offer=2565&uid=d1c53b21-f8cb-414d-a456-2f0643c82204">
                <v-img
                  height="auto"
                  class="mb-4"
                  :src="`/img/psh${Math.floor(Math.random() * 5)}.gif`"
                />
              </a>
              <v-img
                height="auto"
                :src="`${CDN}/screenshot/${EpisodeByUrlName.screenshot}`"
              />
              <v-card-title>{{ EpisodeByUrlName.serie.title }}</v-card-title>
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
                    {{ EpisodeByUrlName.serie.status }}
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
                <div>{{ EpisodeByUrlName.serie.synopsis }}</div>
              </v-card-text>
              <v-divider class="mx-4" />
              <v-card-text>
                <v-chip-group
                  active-class="blue darken-3"
                  column
                >
                  <v-chip
                    v-for="genre in EpisodeByUrlName.serie.genres"
                    :key="genre.text"
                    :href="`/explore?genre=${genre.url}`"
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
                    <v-subheader>Episodes for {{ EpisodeByUrlName.serie.title }}</v-subheader>
                    <v-list-item-group color="primary">
                      <v-list-item
                        v-for="episode_item in EpisodeByUrlName.serie.episodes"
                        :key="episode_item.episode_number"
                      >
                        <v-list-item-icon>
                          <span background-color="blue darken-4">{{ episode_item.episode_number }}</span>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <a :href="`/episode/${EpisodeByUrlName.urlName}/${episode_item.episode_number}`"><v-list-item-title v-text="EpisodeByUrlName.serie.title" /></a>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </div>
              </v-expand-transition>
              <a href="https://tm-offers.gamingadult.com/?offer=47&uid=d1c53b21-f8cb-414d-a456-2f0643c82204">
                <v-img
                  height="auto"
                  class="mb-4"
                  src="https://tm-banners.gamingadult.com/5bdc222a9159a.gif"
                />
              </a>
            </v-card>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import parse from 'url-parse'
import VideoElement from './VideoElement'
import Comments from './Layout/Comments'
export default {
  components: {
    VideoElement,
    Comments
  },
  apollo: {
    EpisodeByUrlName () {
      return {
        query: gql`
        query ($urlName: String, $episode_number: Int){
          EpisodeByUrlName(urlName: $urlName, episode_number: $episode_number){
            serie{
              _id
              title
              title_english
              synopsis
              genres{
                text
                url
              }
              episodes{
                episode_number
              }
              status
              coverUrl
            }
            urlName
            episode_number
            screenshot
            players{
              name
              url
            }
            downloads{
              url
            }
          }
        }
      `,
        variables: {
          urlName: this.$route.params.serie,
          episode_number: Number.parseInt(this.$route.params.episode, 10)
        }
      }
    }
  },
  data () {
    return {
      CDN: process.env.CDN_URI,
      downloadsName: [],
      areDownloadLinksGenerated: false,
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
          disabled: true
        },
        {
          text: 'Episode',
          disabled: true
        }
      ],
      modalDownload: false,
      rating: 0,
      show: false,
      user_id: ''
    }
  },
  mounted () {
    this.breadcrumb[2].text = 'Episode ' + this.EpisodeByUrlName.episode_number
    this.breadcrumb[1].text = this.EpisodeByUrlName.serie.title
    if (this.EpisodeByUrlName.players.length > 0) {
      this.currentUrl = this.EpisodeByUrlName.players[0].url
    }
    for (let i = 0; i < this.EpisodeByUrlName.serie.episodes.length; i++) {
      this.episodeCount.push(this.EpisodeByUrlName.serie.episodes[i].episode_number)
    }
    this.breadcrumb[1].text = this.EpisodeByUrlName.serie.title
    this.breadcrumb[1].href = this.EpisodeByUrlName.urlName
    this.nextEpisodeUrl = this.EpisodeByUrlName.urlName
    if (!this.$store.state.auth) {
      this.user_id = ''
    } else {
      this.user_id = this.$store.state.auth.username
    }
    this.$apollo.mutate({
      mutation: gql`mutation ($input: viewInput){
        viewRegister(input: $input){
          success
          errors{
            path
            message
          }
        }
      }`,
      variables: {
        input: {
          serie_id: this.EpisodeByUrlName.serie._id,
          episode_number: this.EpisodeByUrlName.episode_number,
          user_id: this.user_id
        }
      }
    })
  },
  methods: {
    changeCurrentUrl (currentUrl) {
      this.currentUrl = currentUrl
    },
    genDownloadName () {
      if (!this.areDownloadLinksGenerated) {
        for (let i = 0; i < this.EpisodeByUrlName.downloads.length; i++) {
          const regex = /([a-z0-9][a-z0-9-]*)?((\.[a-z]{2,6}))$/
          const nameDownload = parse(this.EpisodeByUrlName.downloads[i].url, true)
          const parsedName = nameDownload.host
          const newName = parsedName.match(regex)
          const newDownloadButtons = {}
          newDownloadButtons.url = this.EpisodeByUrlName.downloads[i]
          newDownloadButtons.name = newName[1]
          this.downloadsName.push(newDownloadButtons)
          this.areDownloadLinksGenerated = true
        }
      }
    }
  },
  head () {
    return {
      title: `${this.EpisodeByUrlName.serie.title_english ? this.EpisodeByUrlName.serie.title + ' | ' + this.EpisodeByUrlName.serie.title_english : this.EpisodeByUrlName.serie.title}`,
      meta: [
        { hid: 'language', name: 'language', content: 'en' },
        { hid: 'Revisit-After', name: 'Revisit-After', content: '3 days' },
        { hid: 'robots', name: 'robots', content: 'all, index, follow' },
        { hid: 'description', name: 'description', content: this.EpisodeByUrlName.serie.synopsis },
        { hid: 'og:title', property: 'og:title', content: 'Watch ' + this.EpisodeByUrlName.serie.title + ' ' + this.EpisodeByUrlName.serie.title_english + ' episode ' + this.EpisodeByUrlName.episode_number + ' free online HD' },
        { hid: 'og:description', property: 'og:description', content: this.EpisodeByUrlName.serie.synopsis },
        { hid: 'og:url', property: 'og:url', content: this.$route.path },
        { hid: 'og:locale', property: 'og:locale', content: 'en_US' },
        { hid: 'og:site_name', property: 'og:site_name', content: 'Hentaini' },
        { hid: 'og:image', property: 'og:image', content: 'https://cdn.hentaini.com/screenshot/' + this.EpisodeByUrlName.screenshot },
        { hid: 'author', name: 'author', content: 'hentaini' }
      ]
    }
  }
}
</script>

<style>

</style>
