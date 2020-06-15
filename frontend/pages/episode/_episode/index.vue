<template>
  <div>
    <NiHeader />
    <v-container fluid>
      <v-row>
        <v-col cols="12" lg="8" md="10" sm="12" xs="12">
          <NiEpisodeRender />
        </v-col>
        <v-col cols="12" lg="4" md="2" sm="12" xs="12">
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
