<template>
  <v-app>
    <v-main>
      <Logo />
    </v-main>
  </v-app>
</template>

<script>
import Logo from '../../components/Logo'
export default {
  layout: 'panel',
  middleware: 'authenticated',
  components: {
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
