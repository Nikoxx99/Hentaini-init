<template>
  <v-container>
    <v-row>
      <v-col>
        <h5>
          <a href="/explore">{{ $t('landpage.latest_episodes_little') }}</a>
        </h5>
        <h1>{{ $t('landpage.latest_episodes') }}</h1>
        <h4 class="grey--text text-body-2 darken-3">
          <v-icon class="grey--text darken-3">
            mdi-clock-outline
          </v-icon>
          {{ $t('landpage.updated_text') }} {{ $moment(Episodes[1].created_at).fromNow() }}
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
          :isAd="episode.isAd"
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
        limit: 16
      }
    }
  },
  components: {
    NiEpisodeCard
  },
  mounted () {
    this.createEpisodeAd()
  },
  methods: {
    createEpisodeAd () {
      const ad = {
        _id: 'ad1',
        created_at: '2020-07-10T01:25:22.543Z',
        episode_number: 1,
        screenshot: 'img/animation2.gif',
        urlName: 'https://tm-offers.gamingadult.com/?offer=47&uid=d1c53b21-f8cb-414d-a456-2f0643c82204',
        serie: {
          title: 'Tentacle Fantasy'
        },
        isAd: true
      }
      this.Episodes.unshift(ad)
    }
  }
}
</script>

<style>

</style>
