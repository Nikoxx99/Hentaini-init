<template>
  <div>
    <v-navigation-drawer
      permanent
      width="100%"
    >
      <v-row class="fill-height" no-gutters>
        <PanelTemplate />
        <CreateSerie />
      </v-row>
    </v-navigation-drawer>
  </div>
</template>

<script>
import PanelTemplate from '../../../components/PanelTemplate'
import CreateSerie from '../../../components/CreateSerie'
export default {
  middleware: 'authenticated',
  components: {
    PanelTemplate,
    CreateSerie
  },
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
