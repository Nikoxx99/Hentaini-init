<template>
  <v-app>
    <ToolBar header="Episodes From Serie" />
    <PanelTemplate />
    <v-content>
      <EpisodeList />
    </v-content>
  </v-app>
</template>

<script>
import PanelTemplate from '../../../../../components/PanelTemplate'
import EpisodeList from '../../../../../components/EpisodeList'
import ToolBar from '../../../../../components/ToolBar'
export default {
  middleware: 'authenticated',
  components: {
    PanelTemplate,
    EpisodeList,
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
