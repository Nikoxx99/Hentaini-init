<template>
  <v-app>
    <v-main>
      <CreateEpisode />
    </v-main>
  </v-app>
</template>

<script>
import CreateEpisode from '../../../../../components/Create/CreateEpisode'
export default {
  layout: 'panel',
  middleware: 'authenticated',
  components: {
    CreateEpisode
  },
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
