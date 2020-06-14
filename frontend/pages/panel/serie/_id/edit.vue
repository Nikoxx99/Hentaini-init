<template>
  <v-app>
    <ToolBar header="Edit Serie" />
    <PanelTemplate />
    <v-content>
      <SerieEdit />
    </v-content>
  </v-app>
</template>

<script>
import PanelTemplate from '../../../../components/PanelTemplate'
import SerieEdit from '../../../../components/SerieEdit'
import ToolBar from '../../../../components/ToolBar'
export default {
  middleware: 'authenticated',
  components: {
    PanelTemplate,
    SerieEdit,
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
