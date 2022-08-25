<template>
  <v-container>
    <v-row class="justify-center">
      <client-only>
        <VueScriptComponent script='<script data-cfasync="false" type="text/javascript" src="//platform.bidgear.com/ads.php?domainid=6413&sizeid=2&zoneid=6905"></script>'/>
      </client-only>
    </v-row>
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
          {{ $t('landpage.updated_text') }} {{ Episodes.length > 0 ? $moment(Episodes[1].created_at).fromNow() : 'Recently' }}
        </h4>
      </v-col>
    </v-row>
    <v-row v-if="Episodes.length > 0">
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
import VueScriptComponent from '../components/Utils/VueScriptComponent'
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
    NiEpisodeCard,
    VueScriptComponent
  },
  mounted () {
    const rn = Math.floor(Math.random() * 2)
    if (rn === 0) {
      this.createEpisodeAd()
    } else {
      this.createEpisodeAd2()
    }
  },
  methods: {
    createEpisodeAd () {
      const ad = {
        _id: 'ad1',
        created_at: '2020-07-10T01:25:22.543Z',
        episode_number: 1,
        screenshot: `img/${Math.floor(Math.random() * 2)}.gif`,
        urlName: 'https://tm-offers.gamingadult.com/?offer=47&uid=d1c53b21-f8cb-414d-a456-2f0643c82204',
        serie: {
          title: 'Tentacle Fantasy'
        },
        isAd: true
      }
      this.Episodes.unshift(ad)
    },
    createEpisodeAd2 () {
      const ad = {
        _id: 'ad2',
        created_at: '2020-07-10T01:25:22.543Z',
        episode_number: 1,
        screenshot: `img/psh${Math.floor(Math.random() * 5)}.gif`,
        urlName: 'https://tm-offers.gamingadult.com/?offer=2565&uid=d1c53b21-f8cb-414d-a456-2f0643c82204',
        serie: {
          title: 'Pornstar Harem RPG'
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
