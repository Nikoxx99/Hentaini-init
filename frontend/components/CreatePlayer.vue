<template>
  <v-container>
    <form>
      <v-container>
        <v-row>
          <v-col>
            <v-container>
              <v-text-field
                v-model="name"
                label="Player Name"
                :hint="hint"
                persistent-hint
                required
              />
              <v-text-field
                v-model="short_name"
                label="Player Short Name"
                persistent-hint
                required
              />
              <v-btn type="submit" class="mr-4" @click="createPlayer">
                submit
              </v-btn>
            </v-container>
          </v-col>
          <v-col>
            <v-card
              tile
            >
              <v-card-title class="blue darken-3">
                Available Players
              </v-card-title>
              <v-list
                rounded
                shaped
              >
                <v-list-item
                  v-for="player in players"
                  :key="player.id"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ player.name }}</v-list-item-title>
                    <v-list-item-subtitle>Short name: {{ player.short_name }}</v-list-item-subtitle>
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
  name: 'CreatePlayer',
  data: () => ({
    name: '',
    short_name: '',
    hint: '',
    players: []
  }),
  created () {
    this.$apollo.query({
      query: gql`query ($limit: Int){
        Players(limit: $limit){
          _id
          name
          short_name
        }
      }`,
      variables: {
        limit: 100
      }
    }).then((input) => {
      this.players = input.data.Players
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error)
    })
  },
  methods: {
    createPlayer () {
      this.$apollo.mutate({
        mutation: gql`mutation ($input: PlayerInput){
          createPlayer(input: $input){
            success
            errors{
              path
              message
            }
          }
        }`,
        variables: {
          input: {
            name: this.name,
            short_name: this.short_name
          }
        }
      }).then((input) => {
        // eslint-disable-next-line no-console
        console.log(this.$apollo)
        this.name = ''
        this.short_name = ''
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
