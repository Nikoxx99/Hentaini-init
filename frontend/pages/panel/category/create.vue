<template>
  <div>
    <v-navigation-drawer
      permanent
      width="100%"
    >
      <v-row class="fill-height" no-gutters>
        <PanelTemplate />
        <CreateCategory />
      </v-row>
    </v-navigation-drawer>
  </div>
</template>

<script>
import PanelTemplate from '../../../components/PanelTemplate'
import CreateCategory from '../../../components/CreateCategory'
export default {
  middleware: 'authenticated',
  components: {
    PanelTemplate,
    CreateCategory
  },
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
