<template>
  <v-app>
    <ToolBar header="Create Serie" />
    <PanelTemplate />
    <v-main>
      <CreateSerie />
    </v-main>
  </v-app>
</template>

<script>
import PanelTemplate from '../../../components/PanelTemplate'
import CreateSerie from '../../../components/CreateSerie'
import ToolBar from '../../../components/ToolBar'
export default {
  middleware: 'authenticated',
  components: {
    PanelTemplate,
    CreateSerie,
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
