<template>
  <div>
    <NiHeader />
    <v-container>
      <v-row>
        <v-col cols="8">
          <NiEpisodeRender />
        </v-col>
        <v-col cols="4">
          <NiRecomendedSeries />
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <Comments />
    </v-container>
  </div>
</template>

<script>
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
  data () {
    this.$i18n.locale = 'en'
    return {
      locale: 'en'
    }
  }
}
</script>
