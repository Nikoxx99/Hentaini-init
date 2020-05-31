<template>
  <v-container>
    <form>
      <v-container>
        <v-row>
          <v-col>
            <v-container>
              <v-text-field
                v-model="name"
                label="Genre Name"
                :hint="hint"
                persistent-hint
                required
              />
              <v-btn class="mr-4" @click="createGenre">
                submit
              </v-btn>
            </v-container>
          </v-col>
          <v-col>
            <v-card
              tile
            >
              <v-list-item
                v-for="genre in genres"
                :key="genre.id"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ genre.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
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
    name: '',
    hint: ''
  }),
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
            name: this.name
          }
        }
      }).then((input) => {
        // eslint-disable-next-line no-console
        console.log(this.$apollo)
        this.name = ''
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
