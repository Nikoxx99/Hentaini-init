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
        md="6"
        sm="12"
      >
        <NiSerieCard
          :episode="serie.episodes._id"
          :title="serie.title"
          :synopsis="serie.synopsis"
          :episodeNumber="serie.episodes.episode_number"
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
      locale: 'en'
    }
  }
}
</script>

<style>

</style>
