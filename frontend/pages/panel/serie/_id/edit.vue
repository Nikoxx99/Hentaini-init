<template>
  <v-app>
    <ToolBar header="Edit Serie" />
    <PanelTemplate />
    <v-main>
      <SerieEdit />
    </v-main>
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
