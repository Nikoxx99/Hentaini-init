<template>
  <v-container>
    <v-row style="position:relative">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        :label="$t('menu.search_bar_text')"
        solo
        filled
        dense
        hide-details
        @focus="focus = true"
        @blur="blurFocus"
      />
      <v-sheet
        v-if="search && focus"
        width="100%"
        height="auto"
        style="position:absolute;top:2.7rem;left:0;z-index:999!important"
        elevation="4"
        color="grey darken-4"
        tile
      >
        <v-hover
          v-for="serie in searchResult"
          v-slot:default="{ hover }"
          :key="serie._id"
          class="my-3"
        >
          <a :href="`/episode/${serie.episodes[0].urlName}/${1}`">
            <v-card
              :color="hover ? 'grey darken-3' : 'grey darken-4'"
              class="py-4"
            >
              <ul>
                <li>
                  <v-img
                    :src="`${CDN}/cover/${serie.coverUrl}`"
                    width="76px"
                    height="76px"
                    class="mr-3"
                    style="display:inline-block;vertical-align:middle"
                  />
                  <span
                    :class="hover ? 'blue--text darken-3' : 'white--text'"
                  >
                    {{ serie.title }}
                  </span>
                </li>
              </ul>
            </v-card>
          </a>
        </v-hover>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
export default {
  data: () => {
    return {
      search: '',
      searchResult: [],
      focus: false,
      CDN: process.env.CDN_URI
    }
  },
  watch: {
    // eslint-disable-next-line object-shorthand
    search: function (searchQuery) {
      this.$apollo.query({
        query: gql`query ($search: String){
          Search(search: $search){
            _id
            title
            synopsis
            coverUrl
            episodes{
              urlName
            }
          }
        }`,
        variables: {
          search: searchQuery
        }
      }).then((input) => {
        this.searchResult = input.data.Search
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
      })
    }
  },
  methods: {
    // eslint-disable-next-line object-shorthand
    blurFocus: function () {
      setTimeout(() => { this.focus = false }, 100)
    }
  }
}
</script>

<style>

</style>
