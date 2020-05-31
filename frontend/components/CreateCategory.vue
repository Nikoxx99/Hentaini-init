<template>
  <v-container>
    <form>
      <v-container>
        <v-row>
          <v-col>
            <v-container>
              <v-text-field
                v-model="name"
                label="Category Name"
                :hint="hint"
                persistent-hint
                required
              />
              <v-btn class="mr-4" @click="createCategory">
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
  name: 'CreateCategory',
  data: () => ({
    name: '',
    hint: ''
  }),
  methods: {
    createCategory () {
      this.$apollo.mutate({
        mutation: gql`mutation ($input: CategoryInput){
          createCategory(input: $input){
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
        this.hint = 'Category Created Succesfully'
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
