<template>
  <v-container fluid>
    <v-row>
      <v-container>
        <v-row>
          <v-breadcrumbs :items="breadcrumb" divider="•" style="padding:1rem 1rem 1rem 1rem" class="grey darken-4" />
        </v-row>
      </v-container>
    </v-row>
    <v-row>
      <v-container>
        <v-row class="grey darken-4">
          <v-col cols="12">
            <h1>No GF? No problem. Explore our catalog.</h1>
          </v-col>
          <v-col cols="12">
            <p>You can serch for the best Hentai out there in this page.</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3" class="grey darken-3">
            <v-list rounded :subheader="false">
              <v-subheader>ORDER BY</v-subheader>
              <v-list-item-group color="primary">
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
              </v-list-item-group>
            </v-list>
            <v-list rounded :subheader="false">
              <v-subheader>HENTAI GENRES</v-subheader>
              <v-list-item-group color="primary">
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
              </v-list-item-group>
            </v-list>
          </v-col>
          <v-col
            v-for="serie in Series"
            :key="serie._id"
            cols="12"
            lg="2"
            md="6"
            sm="12"
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
  }
}
</script>

<style>

</style>
