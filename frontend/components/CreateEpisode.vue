<template>
  <v-container>
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
              v-model="serie_id"
              label="Episode From"
              readonly
              required
            />
            <v-text-field
              v-model="episode_number"
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
              v-model="customimage"
              label="Use Custom Image?"
              prepend-icon="mdi-image"
              @change="detectNewImage"
            />
            <v-file-input
              v-if="customimage"
              ref="screenshot"
              accept="image/*"
              label="Select a Custom Image"
              @change="screenshotSelected"
            />
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          elevation
        >
          <v-card-title>
            Player and Download
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
                v-model="player.items"
                :items="player.items"
                label="Solo field"
                hide-details
                solo
              />
              <v-text-field
                :id="'code'+index"
                slot="playerCode"
                v-model="player.code"
                label="Code"
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
            <v-btn class="mr-4 blue darken-4" large @click="createEpisode">
              submit
            </v-btn>
            <v-btn class="mr-4 blue darken-4" large @click="addPlayerSlot">
              Add One
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
export default {
  name: 'CreateEpisode',
  components: {
    PlayerInput
  },
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: minLength(1) }
  },
  data: () => ({
    currentCounter: 0,
    serie_id: '',
    serie_title: '',
    episode_number: 0,
    created_at: '',
    visible: true,
    language: '',
    languages: ['ENGLISH', 'RUSSIAN', 'SPANISH'],
    screenshot: '',
    screenshotNew: undefined,
    customimage: false,
    playerList: [],
    downloads: []
  }),

  computed: {
  },
  created () {
    this.serie_id = this.$route.params.id
    this.$apollo.query({
      query: gql`query ($serie_id: ID){
        Serie(_id: $serie_id){
          title
          background_coverUrl
        }
      }`,
      variables: {
        serie_id: this.serie_id
      }
    }).then((input) => {
      this.serie_title = input.data.Serie.title
      this.screenshot = input.data.Serie.background_coverUrl
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error)
    })
  },
  methods: {
    createEpisode () {
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
            serie_id: this.serie_id,
            episode_number: this.episode_number,
            visible: this.visible,
            language: this.language,
            screenshot: this.screenshot,
            screenshotNew: this.screenshotNew
          }
        }
      }).then((input) => {
        this.$router.push({ path: '/panel/serie/' })
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
      })
    },
    screenshotSelected () {
      this.screenshotNew = []
      this.screenshotNew.push(this.$refs.screenshot.$refs.input.files[0])
      this.screenshotNew.push(this.serie_title)
      this.screenshotNew.push(this.episode_number)
    },
    detectNewImage () {
      if (this.customimage) {
        this.screenshotNew = []
      } else {
        this.screenshotNew = undefined
      }
    },
    addPlayerSlot () {
      this.playerList.push({
        items: ['Mega', 'Mediafire'],
        code: ''
      })
    },
    removePlayerSlot (slot) {
      this.playerList.splice(slot, 1)
    },
    test () {
      console.log(this.$refs)
    }
  }
}
</script>

<style>

</style>
