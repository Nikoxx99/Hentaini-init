<template>
  <v-container>
    <form>
      <v-container>
        <v-alert
          v-if="alertBox"
          type="info"
          :class="alertBoxColor"
          tile
          dismissible
        >
          {{ createdMessage }}
        </v-alert>
        <v-row>
          <v-col>
            <v-container>
              <v-text-field
                v-model="text"
                label="Genre Name"
                :hint="hint"
                persistent-hint
                required
              />
              <v-btn class="mr-4 blue darken-4" @click.once="createGenre">
                submit
              </v-btn>
            </v-container>
          </v-col>
          <v-col>
            <v-card
              tile
            >
              <v-card-title class="blue darken-3">
                Available Genres
              </v-card-title>
              <v-subheader>In the future you're be able to remove it from the list</v-subheader>
              <v-list
                rounded
                shaped
              >
                <v-list-item
                  v-for="genre in genres"
                  :key="genre.id"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ genre.text }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </form>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'CreateGenre',
  data: () => ({
    text: '',
    hint: '',
    genres: [],
    createdMessage: '',
    alertBox: false,
    alertBoxColor: ''
  }),
  created () {
    if (this.$route.query.created) {
      this.alertBox = true
      this.alertBoxColor = 'blue darken-4'
      this.createdMessage = 'Genre Created Successfully.'
    }
    this.$apollo.query({
      query: gql`query ($limit: Int){
        Genres(limit: $limit){
          text
          url
        }
      }`,
      variables: {
        limit: 1000
      }
    }).then((input) => {
      this.genres = input.data.Genres
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error)
    })
  },
  methods: {
    createGenre () {
      this.$apollo.mutate({
        mutation: gql`mutation ($input: GenreInput){
          createGenre(input: $input){
            success
            errors{
              path
              message
            }
          }
        }`,
        variables: {
          input: {
            text: this.text,
            value: this.text,
            url: this.text
          }
        }
      }).then((input) => {
        // eslint-disable-next-line no-console
        this.$router.replace({ path: '/panel/genre/create', query: { created: true } }, () => { window.location.reload(true) })
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
