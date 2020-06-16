<template>
  <div>
    <NiHeader />
    <v-container fluid>
      <v-row>
        <v-col cols="12" xl="8" lg="7" md="12" sm="12">
          <NiEpisodeRender
            :episode="episode"
          />
        </v-col>
        <v-col cols="12" xl="4" lg="5" md="12" sm="12">
          <NiRecomendedSeries
            :episode="episode"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <Comments />
    </v-container>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import NiHeader from '../../../components/NiHeader'
import NiEpisodeRender from '../../../components/NiEpisodeRender'
import NiRecomendedSeries from '../../../components/NiRecomendedSeries'
import Comments from '../../../components/Comments'
export default {
  components: {
    NiHeader,
    NiEpisodeRender,
    NiRecomendedSeries,
    Comments
  },
  async fetch () {
    await this.$apollo.query({
      query: gql`query ($urlName: String){
        EpisodeByUrlName(urlName: $urlName){
          serie{
            title
            synopsis
            genres{
              text
            }
            episodes{
              episode_number
            }
            status
            coverUrl
          }
          urlName
          episode_number
          players{
            name
            url
          }
          downloads{
            url
          }
        }
      }`,
      variables: {
        urlName: this.$route.params.episode
      }
    }).then((input) => {
      this.episode = input.data.EpisodeByUrlName
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error)
    })
  },
  data () {
    this.$i18n.locale = 'en'
    return {
      locale: 'en',
      episode: {
        serie: {
          synopsis: '',
          title: '',
          genres: {
            value: ''
          },
          status: '',
          coverUrl: ''
        },
        episode_number: '',
        urlName: '',
        players: {
          short_name: '',
          url: ''
        },
        downloads: {
          url: ''
        }
      }
    }
  }
}
</script>
