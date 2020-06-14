<template>
  <v-app>
    <ToolBar header="Edit Episode" />
    <PanelTemplate />
    <v-content>
      <EpisodeEdit />
    </v-content>
  </v-app>
</template>

<script>
import PanelTemplate from '../../../../../../components/PanelTemplate'
import EpisodeEdit from '../../../../../../components/EpisodeEdit'
import ToolBar from '../../../../../../components/ToolBar'
export default {
  middleware: 'authenticated',
  components: {
    PanelTemplate,
    EpisodeEdit,
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
