<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Recent Episodes</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(episode) in Episodes"
        :key="episode._id"
        cols="12"
        lg="3"
        md="4"
        sm="6"
        xs="6"
      >
        <NiEpisodeCard
          :episode="episode._id"
          :title="episode.serie.title"
          :episodeNumber="episode.episode_number"
          :status="episode.serie.status"
          :url="episode.urlName"
          :screenshot="episode.serie.background_coverUrl"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import NiEpisodeCard from '../components/NiEpisodeCard'
export default {
  name: 'NiLatestEpisodes',
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
    NiEpisodeCard
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
