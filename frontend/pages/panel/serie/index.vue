<template>
  <v-app>
    <ToolBar title="All Series" />
    <PanelTemplate />
    <v-main>
      <SerieList />
    </v-main>
  </v-app>
</template>

<script>
import PanelTemplate from '../../../components/PanelTemplate'
import SerieList from '../../../components/SerieList'
import ToolBar from '../../../components/ToolBar'
export default {
  middleware: 'authenticated',
  components: {
    PanelTemplate,
    SerieList,
    ToolBar
  },
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
