<template>
  <v-app>
    <v-main>
      <SerieList />
    </v-main>
  </v-app>
</template>

<script>
import SerieList from '../../../components/SerieList'
export default {
  layout: 'panel',
  middleware: 'authenticated',
  components: {
    SerieList
  },
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
