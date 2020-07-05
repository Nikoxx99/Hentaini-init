<template>
  <v-app>
    <v-main>
      <SerieEdit />
    </v-main>
  </v-app>
</template>

<script>
import SerieEdit from '../../../../components/Edit/SerieEdit'
export default {
  layout: 'panel',
  middleware: 'authenticated',
  components: {
    SerieEdit
  },
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
