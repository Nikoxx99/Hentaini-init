<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-card
          elevation
        >
          <v-card-title>
            Edit Episode {{ episode_number }} for: {{ serie_title }}
          </v-card-title>
          <v-container>
            <v-text-field
              v-model="serie_id"
              label="Episode From"
              readonly
              required
            />
            <v-text-field
              v-model.number="episode_number"
              label="Episode Number"
              type="number"
              required
            />
            <v-switch
              v-model="visible"
              label="Is Visible?"
            />
            <v-select
              v-model="language"
              :items="languages"
              filled
              label="Language"
            />
            <v-switch
              v-model="hasCustomScreenshot"
              label="Change Custom Image?"
              prepend-icon="mdi-image"
              @change="detectNewImage"
            />
            <v-file-input
              v-if="hasCustomScreenshot"
              ref="screenshot"
              accept="image/*"
              label="Select a Custom Image"
              @change="screenshotSelected"
            />
            <v-btn
              class="mr-4 blue darken-4"
              large
              @click="editEpisode"
            >
              submit
            </v-btn>
          </v-container>
          <v-container v-if="screenshot && !hasCustomScreenshot">
            <h2>Current Screenshot Image</h2>
            <v-row>
              <v-img
                :src="`${CDN}/screenshot/${screenshot}`"
              />
            </v-row>
          </v-container>
          <v-container v-if="customScreenshot && hasCustomScreenshot">
            <h2>Custom Screenshot Image</h2>
            <v-row>
              <v-img
                :src="screenshotPreview"
              />
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          elevation
        >
          <v-card-title>
            Player Information
          </v-card-title>
          <v-container>
            <PlayerInput
              v-for="(player, index) in playerList"
              :id="'container'+index"
              :key="index"
              :index="index"
            >
              <v-select
                :id="'list'+index"
                slot="playerList"
                v-model="player.name"
                :items="players"
                label="Player Select"
                hide-details
                solo
              />
              <v-text-field
                :id="'code'+index"
                slot="playerCode"
                v-model="player.code"
                label="Player Code"
                hide-details
                solo
              />
              <v-btn
                slot="playerDeleteItem"
                @click="removePlayerSlot(index)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </PlayerInput>
            <v-btn class="mr-4 blue darken-4" large @click="addPlayerSlot">
              Add Player
            </v-btn>
          </v-container>
        </v-card>
        <v-card
          elevation
        >
          <v-card-title>
            Download Links
          </v-card-title>
          <v-container>
            <DownloadInput
              v-for="(download, index) in downloadList"
              :id="'container'+index"
              :key="index"
              :index="index"
            >
              <v-text-field
                :id="'code'+index"
                slot="downloadCode"
                v-model="download.url"
                label="Download URL"
                hide-details
                solo
              />
              <v-btn
                slot="downloadDeleteItem"
                @click="removeDownloadSlot(index)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </DownloadInput>
            <v-btn class="mr-4 blue darken-4" large @click="addDownloadSlot">
              Add Download
            </v-btn>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import PlayerInput from './PlayerInput'
import DownloadInput from './DownloadInput'
export default {
  name: 'EditEpisode',
  components: {
    PlayerInput,
    DownloadInput
  },
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: minLength(1) }
  },
  data: () => ({
    currentCounter: 0,
    serie_id: '',
    serie_title: '',
    episode_id: '',
    episode_number: '',
    created_at: '',
    visible: true,
    language: '',
    languages: ['ENGLISH', 'RUSSIAN', 'SPANISH'],
    hasCustomScreenshot: false,
    customScreenshot: [],
    screenshot: '',
    screenshotPreview: '',
    playerList: [],
    players: [],
    downloadList: [],
    CDN: process.env.CDN_URI
  }),

  computed: {
  },
  created () {
    this.$apollo.query({
      query: gql`query ($episode_id: ID){
        Episode(_id: $episode_id){
          _id
          serie{
            _id
            title
          }
          episode_number
          hasCustomScreenshot
          visible
          screenshot
          customScreenshotUrl
          language
          players{
            name
            code
          }
          downloads{
            url
          }
        }
      }`,
      variables: {
        episode_id: this.$route.params.episode
      }
    }).then((input) => {
      this.episode_id = input.data.Episode._id
      this.serie_id = input.data.Episode.serie._id
      this.serie_title = input.data.Episode.serie.title
      this.episode_number = input.data.Episode.episode_number
      this.visible = input.data.Episode.visible
      this.language = input.data.Episode.language
      this.screenshot = input.data.Episode.screenshot
      this.customScreenshot = input.data.Episode.customScreenshotUrl
      for (let i = 0; i < input.data.Episode.players.length; i++) {
        this.playerList.push(input.data.Episode.players[i])
        delete this.playerList[i].__typename
      }
      for (let i = 0; i < input.data.Episode.downloads.length; i++) {
        this.downloadList.push(input.data.Episode.downloads[i])
        delete this.downloadList[i].__typename
      }
      if (this.customScreenshot) {
        this.screenshot = this.customScreenshot
      }
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error)
    })
    this.$apollo.query({
      query: gql`query ($limit: Int){
        Players(limit: $limit){
          name
          short_name
        }
      }`,
      variables: {
        limit: 100
      }
    }).then((input) => {
      for (let i = 0; i < input.data.Players.length; i++) {
        this.players.push(input.data.Players[i].short_name)
      }
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error)
    })
  },
  methods: {
    editEpisode () {
      this.$apollo.mutate({
        mutation: gql`mutation ($input: EditEpisodeInput){
          editEpisode(input: $input){
            success
            errors{
              path
              message
            }
          }
        }`,
        variables: {
          input: {
            _id: this.episode_id,
            serie_id: this.serie_id,
            episode_number: this.episode_number,
            visible: this.visible,
            language: this.language,
            screenshot: this.screenshot,
            customScreenshot: this.customScreenshot,
            players: this.playerList,
            downloads: this.downloadList
          }
        }
      }).then((input) => {
        this.$router.push({ path: '/panel/serie/' + this.serie_id + '/episodes', query: { edited: true } })
        // this.$router.push({ path: '/panel/serie/' })
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
      })
    },
    screenshotSelected () {
      this.customScreenshot = []
      this.customScreenshot.push(this.$refs.screenshot.$refs.input.files[0])
      this.customScreenshot.push(this.serie_title)
      this.customScreenshot.push(this.episode_number)
      this.screenshotPreview = URL.createObjectURL(this.$refs.screenshot.$refs.input.files[0])
    },
    detectNewImage () {
      if (this.hasCustomScreenshot) {
        this.customScreenshot = []
      } else {
        this.customScreenshot = []
      }
    },
    addPlayerSlot () {
      this.playerList.push({
        name: '',
        url: ''
      })
    },
    addDownloadSlot () {
      this.downloadList.push({
        url: ''
      })
    },
    removePlayerSlot (slot) {
      this.playerList.splice(slot, 1)
    },
    removeDownloadSlot (slot) {
      this.downloadList.splice(slot, 1)
    }
  }
}
</script>

<style>

</style>
