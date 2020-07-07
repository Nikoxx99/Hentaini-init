<template>
  <v-container>
    <v-row>
      <v-col>
        <h5>
          <a href="/explore">Explore Recent Hentai Episodes</a>
        </h5>
        <h1>Recent Episodes</h1>
        <h4 class="grey--text text-body-2 darken-3">
          <v-icon class="grey--text darken-3">
            mdi-clock-outline
          </v-icon>
          Updated {{ $moment(Episodes[0].created_at).fromNow() }}
        </h4>
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
          :screenshot="episode.screenshot"
          :created="episode.created_at"
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
            episode_number
            urlName
            screenshot
            serie{
              title
              status
              coverUrl
            }
            created_at
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
