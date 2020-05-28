<template>
  <div>
    <NiHeader />
    <v-container>
      <NiUserAuthForm />
    </v-container>
    <NiMobileHeader />
  </div>
</template>

<script>
import NiHeader from '../components/NiHeader'
import NiMobileHeader from '../components/NiMobileHeader'
import NiUserAuthForm from '../components/NiUserAuthForm'
export default {
  components: {
    NiHeader,
    NiMobileHeader,
    NiUserAuthForm
  },
  middleware: 'notAuthenticated'
}
</script>

<style>

</style>
