<template>
  <v-app>
    <ToolBar header="Create Episode" />
    <PanelTemplate />
    <v-main>
      <CreateEpisode />
    </v-main>
  </v-app>
</template>

<script>
import PanelTemplate from '../../../../../components/PanelTemplate'
import CreateEpisode from '../../../../../components/CreateEpisode'
import ToolBar from '../../../../../components/ToolBar'
export default {
  middleware: 'authenticated',
  components: {
    PanelTemplate,
    CreateEpisode,
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
