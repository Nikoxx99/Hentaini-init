<template>
  <v-app>
    <ToolBar header="Create Category" />
    <PanelTemplate />
    <v-main>
      <CreateCategory />
    </v-main>
  </v-app>
</template>

<script>
import PanelTemplate from '../../../components/PanelTemplate'
import CreateCategory from '../../../components/CreateCategory'
import ToolBar from '../../../components/ToolBar'
export default {
  middleware: 'authenticated',
  components: {
    PanelTemplate,
    CreateCategory,
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
