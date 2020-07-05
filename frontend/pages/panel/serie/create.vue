<template>
  <v-app>
    <v-main>
      <CreateSerie />
    </v-main>
  </v-app>
</template>

<script>
import CreateSerie from '../../../components/Create/CreateSerie'
export default {
  layout: 'panel',
  middleware: 'authenticated',
  components: {
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
