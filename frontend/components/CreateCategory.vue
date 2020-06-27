<template>
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
              <v-btn type="submit" class="mr-4" @click.once="createCategory">
                submit
              </v-btn>
            </v-container>
          </v-col>
          <v-col>
            <v-card
              tile
            >
              <v-card-title class="blue darken-3">
                Available Categories
              </v-card-title>
              <v-subheader>In the future you're be able to remove it from the list</v-subheader>
              <v-list
                rounded
                shaped
              >
                <v-list-item
                  v-for="category in categories"
                  :key="category.id"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ category.name }}</v-list-item-title>
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
  name: 'CreateCategory',
  data: () => ({
    name: '',
    hint: '',
    categories: '',
    createdMessage: '',
    alertBox: false,
    alertBoxColor: ''
  }),
  created () {
    if (this.$route.query.created) {
      this.alertBox = true
      this.alertBoxColor = 'blue darken-4'
      this.createdMessage = 'Category Created Successfully.'
    }
    this.$apollo.query({
      query: gql`query ($limit: Int){
        Categories(limit: $limit){
          _id
          name
        }
      }`,
      variables: {
        limit: 1000
      }
    }).then((input) => {
      this.categories = input.data.Categories
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error)
    })
  },
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
        this.$router.replace({ path: '/panel/category/create', query: { created: true } }, () => { window.location.reload(true) })
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
