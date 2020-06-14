<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-card
          elevation
        >
          <v-card-title>
            Initial information
          </v-card-title>
          <v-container>
            <v-text-field
              v-model="id"
              label="Serie ID"
              readonly
              dense
              filled
              rounded
            />
            <v-text-field
              v-model="title"
              label="Hentai Name"
              required
            />
            <v-textarea
              v-model="synopsis"
              name="synopsis"
              label="Synopsis"
              value="Como comenzo con el que tenia el peinado follador..."
              hint="Describe the Hentai"
            />
            <v-combobox
              v-model="genres"
              :items="genre"
              label="Hentai Genres"
              multiple
              clearable
              deletable-chips
              chips
            />
            <v-select
              v-model="serie_type"
              :items="categories"
              filled
              label="Category"
            />
            <v-select
              v-model="status"
              :items="stat"
              filled
              label="Status"
            />
            <v-switch
              v-model="censorship"
              filled
              label="Censorship"
            />
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          elevation
        >
          <v-card-title>
            Image Settings
          </v-card-title>
          <v-container>
            <v-menu
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="next_episode"
                  label="Next episode on"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
                />
              </template>
              <v-date-picker v-model="next_episode" />
            </v-menu>
            <v-btn class="mr-4 blue darken-4" large @click="editSerie">
              submit
            </v-btn>
          </v-container>
          <v-container>
            <v-row>
              <v-col
                v-if="coverPreview"
                cols="6"
              >
                <v-img :src="coverPreview" />
              </v-col>
              <v-col
                v-if="screenshotPreview"
                cols="6"
              >
                <v-img :src="screenshotPreview" />
              </v-col>
            </v-row>
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
export default {
  name: 'CreateSerie',
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: minLength(1) }
  },

  data: () => ({
    id: '',
    title: '',
    synopsis: '',
    genres: [],
    genre: [],
    serie_type: '',
    categories: [],
    status: '',
    stat: ['AIRING', 'FINALIZED'],
    censorship: false,
    next_episode: '',
    coverPreview: '',
    screenshotPreview: ''
  }),

  computed: {
  },
  created () {
    this.$apollo.query({
      query: gql`query ($limit: Int){
        Genres(limit: $limit){
          name
        }
      }`,
      variables: {
        limit: 100
      }
    }).then((input) => {
      for (let i = 0; i < input.data.Genres.length; i++) {
        this.genre.push({
          text: input.data.Genres[i].name,
          value: input.data.Genres[i].name
        })
      }
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error)
    })
    this.$apollo.query({
      query: gql`query ($limit: Int){
        Categories(limit: $limit){
          name
        }
      }`,
      variables: {
        limit: 100
      }
    }).then((input) => {
      // eslint-disable-next-line no-console
      for (let i = 0; i < input.data.Categories.length; i++) {
        this.categories.push(input.data.Categories[i].name)
      }
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error)
    })
    this.$apollo.query({
      query: gql`query ($id: ID){
        Serie(_id: $id){
          _id
          title
          synopsis
          genres {
            text
            value
          }
          status
          censorship
          serie_type
          next_episode
          coverUrl
          background_coverUrl
        }
      }`,
      variables: {
        id: this.$route.params.id
      }
    }).then((input) => {
      this.id = input.data.Serie._id
      this.title = input.data.Serie.title
      this.synopsis = input.data.Serie.synopsis
      for (let i = 0; i < input.data.Serie.genres.length; i++) {
        this.genres.push(input.data.Serie.genres[i])
        delete this.genres[i].__typename
      }
      this.status = input.data.Serie.status
      this.serie_type = input.data.Serie.serie_type
      this.censorship = input.data.Serie.censorship
      this.coverPreview = input.data.Serie.coverUrl
      this.screenshotPreview = input.data.Serie.background_coverUrl
      this.next_episode = input.data.Serie.next_episode
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error)
    })
  },
  methods: {
    editSerie () {
      this.$apollo.mutate({
        mutation: gql`mutation ($input: EditSerieInput){
          editSerie(input: $input){
            success
            errors{
              path
              message
            }
          }
        }`,
        variables: {
          input: {
            _id: this.id,
            title: this.title,
            synopsis: this.synopsis,
            genres: this.genres,
            status: this.status,
            serie_type: this.serie_type,
            censorship: this.censorship,
            next_episode: this.next_episode
          }
        }
      }).then((input) => {
        this.$router.push({ path: '/panel/serie/' })
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
      })
    }
    // coverSelected (e) {
    //   this.cover = []
    //   this.cover.push(this.$refs.cover.$refs.input.files[0])
    //   this.cover.push(this.title)
    //   if (this.cover !== undefined) {
    //     this.coverPreview = URL.createObjectURL(this.$refs.cover.$refs.input.files[0])
    //   }
    // },
    // background_coverSelected (e) {
    //   this.background_cover.push(this.$refs.background_cover.$refs.input.files[0])
    //   this.background_cover.push(this.title)
    //   this.screenshotPreview = URL.createObjectURL(this.$refs.background_cover.$refs.input.files[0])
    // },
    // initialCoverClear () {
    //   this.cover = []
    // },
    // initialScreenshotClear () {
    //   this.background_cover = []
    // }
  }
}
</script>

<style>

</style>
