<template>
  <v-container>
    <form>
      <v-container>
        <v-row>
          <v-col>
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
                :items="items"
                label="Hentai Genres"
                multiple
                clearable
                deletable-chips
                chips
              />
              <v-select
                v-model="serie_type"
                :items="items"
                filled
                label="Category"
              />
              <v-select
                v-model="status"
                :items="items"
                filled
                label="Status"
              />
              <v-select
                v-model="censorship"
                :items="items"
                filled
                label="Censorship"
              />
            </v-container>
          </v-col>
          <v-col>
            <v-container>
              <v-file-input v-model="cover" show-size label="Cover Image" />
              <v-file-input v-model="background_cover" show-size label="Background Image" />
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
                <v-date-picker v-model="created" @input="menu2 = false" />
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
                <v-date-picker v-model="next_episode" @input="next_episode = false" />
              </v-menu>
              <v-btn class="mr-4" @click="createSerie">
                submit
              </v-btn>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </form>
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
    title: '',
    synopsis: '',
    genres: [],
    serie_type: '',
    status: '',
    censorship: '',
    cover: [],
    background_cover: [],
    created: '',
    next_episode: '',
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4'
    ]
  }),

  computed: {
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
            genres: this.gernes,
            status: this.status,
            serie_type: this.serie_type,
            next_episode: this.next_episode,
            cover: 'https://google.com',
            background_cover: 'https://google.com'
          }
        }
      }).then((input) => {
        // eslint-disable-next-line no-console
        console.log(this.$apollo)
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
      })
    }
  }
}
</script>

<style>

</style>
