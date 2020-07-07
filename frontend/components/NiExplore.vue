<template>
  <v-container fluid>
    <v-row>
      <v-container class="pb-0">
        <v-row>
          <v-breadcrumbs
            :items="breadcrumb"
            divider="•"
            style="padding:1rem 1rem 1rem 1rem"
            class="grey darken-4 rounded-r-xl"
          />
        </v-row>
        <v-row>
          <v-col v-if="$route.query.genre" cols="12" class="mt-4 px-2">
            <h1>No GF? No problem. Explore our <strong class="blue--text darken-4"> {{ prettyGenre }} </strong> catalog.</h1>
          </v-col>
          <v-col v-else cols="12" class="mt-4 px-2">
            <h1>No GF? No problem. Explore our catalog.</h1>
          </v-col>
          <v-col v-if="$route.query.genre" cols="12" class="px-2 pb-0">
            <p>You can serch for the best {{ prettyGenre }} Hentai out there in this page.</p>
          </v-col>
          <v-col v-else cols="12" class="px-2 pb-0">
            <p>You can serch for the best Hentai out there in this page.</p>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
    <v-row>
      <v-container class="px-0">
        <v-row>
          <v-col
            cols="12"
            xs="12"
            sm="12"
            md="12"
            lg="3"
          >
            <v-expansion-panels
              v-model="expandedFilterBy"
              multiple
              tile
            >
              <v-expansion-panel>
                <v-expansion-panel-header>FILTER</v-expansion-panel-header>
                <v-expansion-panel-content class="px-0">
                  <v-list
                    rounded
                    :subheader="false"
                  >
                    <v-list-item
                      v-for="filter in Filters"
                      :key="filter.id"
                      :href="`/explore?filter=${filter.url}`"
                      :class="filter.class"
                    >
                      <v-list-item-icon>
                        <v-icon>mdi-filter</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="filter.name" />
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-expansion-panels
              v-model="expandedOrderBy"
              multiple
              tile
            >
              <v-expansion-panel class="blue darken-4">
                <v-expansion-panel-header>ORDER BY</v-expansion-panel-header>
                <v-expansion-panel-content class="px-0">
                  <v-list
                    rounded
                    class="blue darken-4 px-0"
                    :subheader="false"
                  >
                    <v-list-item
                      v-for="order in Orders"
                      :key="order.id"
                      :href="`/explore?order=${order.url}`"
                    >
                      <v-list-item-icon>
                        <v-icon>mdi-filter</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="order.name" />
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-expansion-panels
              v-model="expanded"
              multiple
              tile
            >
              <v-expansion-panel>
                <v-expansion-panel-header>HENTAI GENRES</v-expansion-panel-header>
                <v-expansion-panel-content class="px-0">
                  <v-list
                    rounded
                    class="px-0"
                  >
                    <v-list-item
                      v-for="genre in Genres"
                      :key="genre.text"
                      :href="`/explore?genre=${genre.url}`"
                    >
                      <v-list-item-icon>
                        <v-icon>mdi-folder-search-outline</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="genre.text" />
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
          <v-col
            cols="12"
            xs="12"
            sm="12"
            md="12"
            lg="9"
            class="pa-0"
          >
            <v-container class="pa-0">
              <v-row>
                <v-col
                  v-for="serie in Series"
                  :key="serie._id"
                  cols="4"
                  lg="3"
                  md="4"
                  sm="4"
                >
                  <NiSerieCard
                    :title="serie.title"
                    :synopsis="serie.synopsis"
                    :genres="serie.genres"
                    :status="serie.status"
                    :screenshot="serie.coverUrl"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import NiSerieCard from '../components/NiSerieCard'
export default {
  components: {
    NiSerieCard
  },
  apollo: {
    Series () {
      return {
        query: gql`
        query ($limit: Int, $order: String, $filter: String, $genre: String){
          Series(limit: $limit, order: $order, filter: $filter, genre: $genre){
            title
            synopsis
            genres{
              text
            }
            status
            coverUrl
          }
        }
      `,
        variables: {
          imit: 1000,
          order: this.$route.query.order,
          filter: this.$route.query.filter,
          genre: this.$route.query.genre
        }
      }
    },
    Genres () {
      return {
        query: gql`
        query ($limit: Int){
          Genres(limit: $limit){
            text
            url
          }
        }
      `,
        variables: {
          limit: 1000
        }
      }
    }
  },
  data () {
    this.$i18n.locale = 'en'
    return {
      locale: 'en',
      expanded: [0],
      expandedOrderBy: [0],
      expandedFilterBy: [0],
      innerWidth: 0,
      prettyGenre: '',
      Genres: {
        episodes: {
          urlName: ''
        }
      },
      Orders: [
        { id: 1, name: 'Most Views', url: 'ascending' },
        { id: 2, name: 'Low Views', url: 'descending' }
      ],
      Filters: [
        { id: 1, name: 'Airing', url: 'airing', class: 'grey darken-4' },
        { id: 2, name: 'No Censorship', url: 'no-censorship', class: 'grey darken-4' }
      ],
      breadcrumb: [
        {
          text: 'Hentaini',
          disabled: false,
          href: '/'
        },
        {
          text: 'Explore',
          disabled: true
        }
      ]
    }
  },
  watch: {
    innerWidth (innerWidth) {
      if (innerWidth < 1264) {
        this.expanded = []
        this.expandedOrderBy = []
        this.expandedFilterBy = []
      } else {
        this.expanded = [0]
        this.expandedOrderBy = [0]
        this.expandedFilterBy = [0]
      }
    }
  },
  created () {
    if (this.$route.query.filter) {
      const filter = this.$route.query.filter
      if (filter === 'airing') {
        this.Filters[0].class = 'blue darken-4'
      } else if (filter === 'no-censorship') {
        this.Filters[1].class = 'blue darken-4'
      }
    }
  },
  beforeMount () {
    window.addEventListener('resize', () => {
      this.innerWidth = window.innerWidth
    })
    this.innerWidth = window.innerWidth
    if (innerWidth < 1264) {
      this.expanded = []
      this.expandedOrderBy = []
      this.expandedFilterBy = []
    } else {
      this.expanded = [0]
      this.expandedOrderBy = [0]
      this.expandedFilterBy = [0]
    }
    if (this.$route.query.genre) {
      const g = this.Genres.find(genre => genre.url === this.$route.query.genre)
      this.prettyGenre = g.text
    }
  }
}
</script>

<style>

</style>
