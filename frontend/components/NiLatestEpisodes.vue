<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(episode) in Episodes"
        :key="episode._id"
        cols="12"
        lg="3"
        md="6"
        sm="12"
      >
        <NiEpisodeCard
          :episode="episode._id"
          :title="episode.serie.title"
          :episodeNumber="episode.episode_number"
          :status="episode.serie.status"
          :url="episode.urlName"
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
