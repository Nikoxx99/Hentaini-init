<template>
  <div>
    <v-app>
      <ToolBar header="Create Genre" />
      <PanelTemplate />
      <v-main>
        <CreateGenre />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import PanelTemplate from '../../../components/PanelTemplate'
import CreateGenre from '../../../components/CreateGenre'
import ToolBar from '../../../components/ToolBar'
export default {
  middleware: 'authenticated',
  components: {
    PanelTemplate,
    CreateGenre,
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
