<template>
  <v-app>
    <v-navigation-drawer
      permanent
      width="100%"
      absolute
    >
      <v-row class="fill-height" no-gutters>
        <PanelTemplate />
        <CreateSerie />
      </v-row>
    </v-navigation-drawer>
  </v-app>
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
