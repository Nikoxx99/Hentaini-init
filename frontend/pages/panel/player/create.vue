<template>
  <div>
    <v-app>
      <ToolBar header="Create Player" />
      <PanelTemplate />
      <v-content>
        <CreatePlayer />
      </v-content>
    </v-app>
  </div>
</template>

<script>
import PanelTemplate from '../../../components/PanelTemplate'
import CreatePlayer from '../../../components/CreatePlayer'
import ToolBar from '../../../components/ToolBar'
export default {
  middleware: 'authenticated',
  components: {
    PanelTemplate,
    CreatePlayer,
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
