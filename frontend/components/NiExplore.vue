<template>
  <v-container fluid>
    <v-row>
      <v-container>
        <v-row>
          <v-breadcrumbs :items="breadcrumb" divider="•" style="padding:1rem 1rem 1rem 1rem" class="grey darken-4" />
        </v-row>
        <v-row>
          <v-col cols="12" class="grey darken-4 mt-4 px-2">
            <h1>No GF? No problem. Explore our catalog.</h1>
          </v-col>
          <v-col cols="12" class="grey darken-4 px-2">
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
              v-model="expandedOrderBy"
              multiple
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
                      :href="`/genres/${genre.url}`"
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
        query ($limit: Int, $order: String){
          Series(limit: $limit, order: $order){
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
        variables () {
          if (!this.$route.query.order) {
            return {
              limit: 1000
            }
          } else {
            return {
              limit: 1000,
              order: this.$route.query.order
            }
          }
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
      innerWidth: 0,
      Genres: {
        episodes: {
          urlName: ''
        }
      },
      Orders: [
        { name: 'Most Views', url: 'ascending' },
        { name: 'Low Views', url: 'descending' }
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
      } else {
        this.expanded = [0]
        this.expandedOrderBy = [0]
      }
    }
  },
  mounted () {
    window.addEventListener('resize', () => {
      this.innerWidth = window.innerWidth
    })
  }
}
</script>

<style>

</style>
