<template>
  <v-app>
    <v-main>
      <EpisodeEdit />
    </v-main>
  </v-app>
</template>

<script>
import EpisodeEdit from '../../../../../../components/Edit/EpisodeEdit'
export default {
  layout: 'panel',
  middleware: 'authenticated',
  components: {
    EpisodeEdit
  },
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
