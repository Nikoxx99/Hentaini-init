<template>
  <v-container>
    <v-alert
      v-if="alertBox"
      type="info"
      :class="alertBoxColor"
      tile
      dismissible
    >
      {{ errorMessage }}
    </v-alert>
    <v-row>
      <v-col cols="6">
        <v-card
          elevation
        >
          <v-card-title>
            Create Episode for: {{ serie_title }}
          </v-card-title>
          <v-container>
            <v-text-field
              v-model="episode.serie_id"
              label="Episode From"
              readonly
              required
            />
            <v-switch
              v-model="sendNotification"
              label="Send Episode Notification?"
              prepend-icon="mdi-bell"
            />
            <v-text-field
              v-model.number="episode.episode_number"
              label="Episode Number"
              type="number"
              required
            />
            <v-switch
              v-model="episode.visible"
              label="Is Visible?"
            />
            <v-select
              v-model="episode.language"
              :items="languages"
              filled
              label="Language"
            />
            <v-switch
              v-model="episode.hasCustomScreenshot"
              label="Use Custom Image?"
              prepend-icon="mdi-image"
              @change="detectNewImage"
            />
            <v-file-input
              v-if="episode.hasCustomScreenshot"
              ref="screenshot"
              accept="image/*"
              label="Select a Custom Image"
              @change="screenshotSelected"
            />
            <v-btn class="mr-4 blue darken-4" large @click="createEpisode">
              submit
            </v-btn>
          </v-container>
          <v-container v-if="episode.screenshot && !episode.hasCustomScreenshot">
            <h2>Default Screenshot Image</h2>
            <v-row>
              <v-img
                :src="`${CDN}/screenshot/${episode.screenshot}`"
              />
            </v-row>
          </v-container>
          <v-container v-if="episode.customScreenshot.length > 0 && episode.hasCustomScreenshot">
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
              v-for="(player, index) in episode.playerList"
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
                v-model="player.url"
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
            <v-btn class="mr-4 green darken-4" large @click="playerListModel">
              Airing Model
            </v-btn>
            <v-btn class="mr-4 grey darken-4" large @click="resetPlayerList">
              Clear Fields
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
              v-for="(download, index) in episode.downloadList"
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
            <v-btn
              class="mr-4 blue darken-4"
              :loading="isSubmitting"
              :disabled="isSubmitting"
              large
              @click="addDownloadSlot"
            >
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
import PlayerInput from '../Template/PlayerInput'
import DownloadInput from '../Template/DownloadInput'
export default {
  name: 'CreateEpisode',
  components: {
    PlayerInput,
    DownloadInput
  },
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: minLength(1) }
  },
  data: () => ({
    episode: {
      serie_id: '',
      episode_number: 1,
      visible: true,
      language: 'ENGLISH',
      hasCustomScreenshot: false,
      screenshot: '',
      customScreenshot: [],
      playerList: [],
      downloadList: []
    },
    serie_title: '',
    CDN: process.env.CDN_URI,
    currentCounter: 0,
    sendNotification: true,
    languages: ['ENGLISH', 'RUSSIAN', 'SPANISH'],
    screenshotPreview: '',
    players: [],
    alertBox: false,
    alertBoxColor: '',
    errorMessage: '',
    isSubmitting: false
  }),
  async created () {
    this.episode.serie_id = this.$route.params.id
    await this.$apollo.query({
      query: gql`query ($serie_id: ID){
        Serie(_id: $serie_id){
          title
          background_coverUrl
        }
      }`,
      variables: {
        serie_id: this.$route.params.id
      }
    }).then((input) => {
      this.serie_title = input.data.Serie.title
      this.episode.screenshot = input.data.Serie.background_coverUrl
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error)
    })
    this.$apollo.query({
      query: gql`query ($limit: Int){
        Players(limit: $limit){
          name
          short_name
          player_code
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
    createEpisode () {
      this.isSubmitting = !this.isSubmitting
      this.$apollo.mutate({
        mutation: gql`mutation ($input: EpisodeInput){
          createEpisode(input: $input){
            success
            errors{
              path
              message
            }
          }
        }`,
        variables: {
          input: {
            serie_id: this.episode.serie_id,
            episode_number: this.episode.episode_number,
            visible: this.episode.visible,
            sendNotification: this.sendNotification,
            language: this.episode.language,
            hasCustomScreenshot: this.episode.hasCustomScreenshot,
            screenshot: this.episode.screenshot,
            customScreenshot: this.customScreenshot,
            players: this.episode.playerList,
            downloads: this.episode.downloadList
          }
        }
      }).then((input) => {
        if (input.data.createEpisode.success) {
          this.$router.push({ path: '/panel/serie/' + this.episode.serie_id + '/episodes', query: { created: true } }, () => { window.location.reload(true) }, () => { window.location.reload(true) })
        } else {
          this.alertBox = true
          this.alertBoxColor = 'red darken-4'
          this.errorMessage = input.data.createEpisode.errors[0].message
          this.isSubmitting = false
        }
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
      })
    },
    screenshotSelected () {
      this.episode.customScreenshot = []
      this.episode.customScreenshot.push(this.$refs.screenshot.$refs.input.files[0])
      this.episode.customScreenshot.push(this.episode.serie_title)
      this.episode.customScreenshot.push(this.episode.episode_number)
      this.screenshotPreview = URL.createObjectURL(this.$refs.screenshot.$refs.input.files[0])
    },
    detectNewImage () {
      if (this.episode.hasCustomScreenshot) {
        this.episode.customScreenshot = []
      } else {
        this.episode.customScreenshot = []
      }
    },
    addPlayerSlot () {
      this.episode.playerList.push({
        name: '',
        url: ''
      })
    },
    addDownloadSlot () {
      this.episode.downloadList.push({
        url: ''
      })
    },
    removePlayerSlot (slot) {
      this.episode.playerList.splice(slot, 1)
    },
    removeDownloadSlot (slot) {
      this.episode.downloadList.splice(slot, 1)
    },
    resetPlayerList () {
      this.episode.playerList = []
    },
    playerListModel () {
      this.episode.playerList = []
      this.episode.playerList.push(
        { name: 'C', url: '' },
        { name: 'Y', url: '' },
        { name: 'BR', url: '' },
        { name: 'SSB', url: '' },
        { name: 'MU', url: '' },
        { name: 'S', url: '' },
        { name: 'F', url: '' },
        { name: 'M', url: '' }
      )
    }
  }
}
</script>

<style>

</style>
