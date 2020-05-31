<template>
  <v-row>
    <v-col cols="6">
      <v-container>
        <v-text-field
          v-model="title"
          :counter="10"
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
        <v-select
          v-model="censorship"
          :items="censor"
          filled
          label="Censorship"
        />
      </v-container>
    </v-col>
    <v-col cols="6">
      <v-container>
        <v-file-input
          ref="cover"
          show-size
          label="Cover Image"
          @change="coverSelected"
        />
        <v-file-input
          ref="background_cover"
          show-size
          label="Background Image"
          @change="background_coverSelected"
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
              v-model="created"
              label="Serie Created At"
              prepend-icon="mdi-calendar"
              readonly
              v-on="on"
            />
          </template>
          <v-date-picker v-model="created" />
        </v-menu>
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
        <v-btn class="mr-4" @click="createSerie">
          submit
        </v-btn>
      </v-container>
    </v-col>
  </v-row>
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
    title: '',
    synopsis: '',
    genres: [],
    genre: [],
    serie_type: '',
    categories: [],
    status: '',
    stat: ['AIRING', 'FINALIZED'],
    censorship: '',
    censor: ['YES', 'NO'],
    cover: [],
    background_cover: [],
    created: '',
    next_episode: '',
    items: ['Item 1', 'Item 2']
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
        this.genre.push(input.data.Genres[i].name)
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
            title: this.title,
            synopsis: this.synopsis,
            genres: this.genres,
            status: this.status,
            serie_type: this.serie_type,
            next_episode: this.next_episode,
            cover: this.cover,
            background_cover: this.background_cover
          }
        }
      }).then((input) => {
        // eslint-disable-next-line no-console
        console.log(this.genres)
        // eslint-disable-next-line no-console
        console.log(this.$apollo)
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
      })
    },
    coverSelected (e) {
      this.cover.push(this.$refs.cover.$refs.input.files[0])
      this.cover.push(this.title)
    },
    background_coverSelected (e) {
      this.background_cover.push(this.$refs.background_cover.$refs.input.files[0])
      this.background_cover.push(this.title)
    },
    async upload_photo () {
      const formData = await new FormData()
      formData.append('file', this.photo)
    }
  }
}
</script>

<style>

</style>
