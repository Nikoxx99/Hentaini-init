<template>
  <v-container>
    <v-alert
      v-if="error || genreError"
      type="error"
      tile
      dismissible
      outlined
    >
      {{ errorMessage }}
    </v-alert>
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
              v-model="serie.title"
              :rules="titleRules"
              label="Hentai Title"
              required
            />
            <v-text-field
              v-model="serie.title_english"
              label="Hentai English Title"
            />
            <v-textarea
              v-model="serie.synopsis"
              :rules="synopsisRules"
              name="synopsis"
              label="Synopsis"
              value="Como comenzo con el que tenia el peinado follador..."
              hint="Describe the Hentai"
            />
            <v-combobox
              v-model="serie.genres"
              :items="genreList"
              :error="genreError"
              label="Hentai Genres"
              multiple
              clearable
              deletable-chips
              chips
              :return-object="true"
              @click="genreError = false"
            />
            <v-select
              v-model="serie.serie_type"
              :items="categories"
              filled
              label="Category"
            />
            <v-select
              v-model="serie.status"
              :items="statusList"
              filled
              label="Status"
            />
            <v-switch
              v-model="serie.censorship"
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
            <v-file-input
              ref="cover"
              show-size
              :error="error"
              label="Cover Image"
              :clearable="false"
              @change="coverSelected"
              @click="initialCoverClear"
            />
            <v-file-input
              ref="background_cover"
              show-size
              :error="error"
              label="Screenshot Image"
              :clearable="false"
              @change="background_coverSelected"
              @click="initialScreenshotClear"
            />
            <v-menu
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="serie.next_episode"
                  label="Next episode on"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
                />
              </template>
              <v-date-picker v-model="serie.next_episode" />
            </v-menu>
            <v-btn
              class="mr-4 blue darken-4"
              :loading="isSubmitting"
              :disabled="isSubmitting"
              large
              @click="createSerie"
            >
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
    serie: {
      title: '',
      title_english: '',
      synopsis: '',
      genres: [],
      serie_type: 'HENTAI',
      status: '',
      next_episode: '',
      censorship: false,
      cover: [],
      background_cover: []
    },
    titleRules: [
      v => !!v || 'Title is required'
    ],
    synopsisRules: [
      v => !!v || 'Synopsis is required'
    ],
    genreList: [],
    categories: [],
    genreError: false,
    statusList: ['AIRING', 'FINALIZED'],
    coverPreview: '',
    screenshotPreview: '',
    error: false,
    errorMessage: '',
    alertBoxColor: '',
    isSubmitting: false
  }),

  computed: {
  },
  created () {
    this.$apollo.query({
      query: gql`query ($limit: Int){
        Genres(limit: $limit){
          text
        }
      }`,
      variables: {
        limit: 100
      }
    }).then((input) => {
      for (let i = 0; i < input.data.Genres.length; i++) {
        this.genreList.push({
          text: input.data.Genres[i].text,
          value: input.data.Genres[i].text
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
  },
  methods: {
    createSerie () {
      this.isSubmitting = !this.isSubmitting
      if (this.serie.cover < 1 || this.serie.background_cover < 1) {
        this.error = true
        this.errorMessage = 'You must define an cover and screenshot image.'
        this.isSubmitting = false
      }
      if (this.serie.genres < 1) {
        this.genreError = true
        this.errorMessage = 'You must select one or more genres.'
        this.isSubmitting = false
      }
      this.$apollo.mutate({
        mutation: gql`mutation ($input: SerieInput){
          createSerie(input: $input){
            success
            errors{
              path
              message
            }
          }
        }`,
        variables: {
          input: {
            title: this.serie.title,
            title_english: this.serie.title_english,
            synopsis: this.serie.synopsis,
            genres: this.serie.genres,
            status: this.serie.status,
            serie_type: this.serie.serie_type,
            next_episode: this.serie.next_episode,
            censorship: this.serie.censorship,
            cover: this.serie.cover,
            background_cover: this.serie.background_cover
          }
        }
      }).then((input) => {
        if (input.data.createSerie.success) {
          this.$router.push({ path: '/panel/serie', query: { created: true } }, () => { window.location.reload(true) }, () => { window.location.reload(true) })
        } else {
          this.error = true
          this.alertBoxColor = 'red darken-4'
          this.errorMessage = input.data.createSerie.errors[0].message
          this.isSubmitting = false
        }
      }).catch((error) => {
        // eslint-disable-next-line no-console
        this.error = true
        this.errorMessage = error
      })
    },
    coverSelected (e) {
      this.serie.cover = []
      this.serie.cover.push(this.$refs.cover.$refs.input.files[0])
      this.serie.cover.push(this.serie.title)
      if (this.serie.cover !== undefined) {
        this.coverPreview = URL.createObjectURL(this.$refs.cover.$refs.input.files[0])
      }
    },
    background_coverSelected (e) {
      this.serie.background_cover.push(this.$refs.background_cover.$refs.input.files[0])
      this.serie.background_cover.push(this.serie.title)
      this.screenshotPreview = URL.createObjectURL(this.$refs.background_cover.$refs.input.files[0])
    },
    initialCoverClear () {
      this.serie.cover = []
      this.error = false
      this.isSubmitting = false
    },
    initialScreenshotClear () {
      this.serie.background_cover = []
      this.error = false
      this.isSubmitting = false
    }
  }
}
</script>
