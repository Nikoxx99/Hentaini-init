<template>
  <v-app>
    <v-main>
      <EpisodeList />
    </v-main>
  </v-app>
</template>

<script>
import EpisodeList from '../../../../../components/EpisodeList'
export default {
  layout: 'panel',
  middleware: 'authenticated',
  components: {
    EpisodeList
  },
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
