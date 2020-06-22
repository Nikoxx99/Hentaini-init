<template>
  <v-container>
    <form>
      <v-container>
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
              <v-btn type="submit" class="mr-4" @click="createGenre">
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
                    <v-list-item-title>{{ genre.name }}</v-list-item-title>
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
    genres: []
  }),
  created () {
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
        this.text = ''
        this.hint = 'Genre Created Succesfully'
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
