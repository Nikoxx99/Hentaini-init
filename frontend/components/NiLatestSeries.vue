<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Recent Series</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(serie) in Series"
        :key="serie._id"
        cols="12"
        lg="2"
        md="4"
        sm="6"
        xs="6"
      >
        <NiSerieCard
          :title="serie.title"
          :synopsis="serie.synopsis"
          :genres="serie.genres"
          :status="serie.status"
          :url="serie.episodes[0].urlName"
          :screenshot="serie.coverUrl"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import NiSerieCard from '../components/NiSerieCard'
export default {
  name: 'NiLatestSeries',
  apollo: {
    Series: {
      query: gql`
        query ($limit: Int){
          Series(limit: $limit){
            _id
            episodes{
              episode_number
              urlName
            }
            genres{
              text
            }
            title
            synopsis
            status
            coverUrl
          }
        }
      `,
      variables: {
        limit: 10
      }
    }
  },
  components: {
    NiSerieCard
  },
  data () {
    this.$i18n.locale = 'en'
    return {
      locale: 'en',
      Series: {
        episodes: {
          urlName: ''
        }
      }
    }
  }
}
</script>

<style>

</style>
