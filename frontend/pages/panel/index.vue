<template>
  <v-navigation-drawer
    permanent
    width="100%"
  >
    <v-row class="fill-height" no-gutters>
      <PanelTemplate />
      <Logo />
    </v-row>
  </v-navigation-drawer>
</template>

<script>
import Logo from '../../components/Logo'
import PanelTemplate from '../../components/PanelTemplate'
export default {
  middleware: 'authenticated',
  components: {
    PanelTemplate,
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
