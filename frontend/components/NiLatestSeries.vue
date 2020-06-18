<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Recent Series</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(episode) in Episodes"
        :key="episode._id"
        cols="12"
        lg="2"
        md="6"
        sm="12"
      >
        <NiSerieCard
          :episode="episode._id"
          :title="episode.serie.title"
          :synopsis="episode.serie.synopsis"
          :episodeNumber="episode.episode_number"
          :status="episode.serie.status"
          :url="episode.urlName"
          :screenshot="episode.serie.coverUrl"
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
    Episodes: {
      query: gql`
        query ($limit: Int){
          Episodes(limit: $limit){
            _id
            urlName
            episode_number
            serie{
              title
              synopsis
              status
              coverUrl
              background_coverUrl
            }
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
