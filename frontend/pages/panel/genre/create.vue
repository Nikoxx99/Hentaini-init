<template>
  <div>
    <v-navigation-drawer
      permanent
      width="100%"
    >
      <v-row class="fill-height" no-gutters>
        <PanelTemplate />
        <CreateGenre />
        <Logo />
      </v-row>
    </v-navigation-drawer>
  </div>
</template>

<script>
import PanelTemplate from '../../../components/PanelTemplate'
import CreateGenre from '../../../components/CreateGenre'
import Logo from '../../../components/Logo'
export default {
  middleware: 'authenticated',
  components: {
    PanelTemplate,
    CreateGenre,
    Logo
  },
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
