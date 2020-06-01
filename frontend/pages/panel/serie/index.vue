<template>
  <v-app>
    <v-navigation-drawer
      permanent
      width="100%"
    >
      <v-row class="fill-height" no-gutters>
        <PanelTemplate />
        <SerieList />
      </v-row>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import PanelTemplate from '../../../components/PanelTemplate'
import SerieList from '../../../components/SerieList'
export default {
  middleware: 'authenticated',
  components: {
    PanelTemplate,
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
