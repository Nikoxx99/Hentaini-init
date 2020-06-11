<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="6" class="mx-auto">
          <Logo style="justify-self:center;display:flex;" />
          <NiUserAuthForm />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import NiUserAuthForm from '../components/NiUserAuthForm'
import Logo from '../components/Logo'
export default {
  components: {
    NiUserAuthForm,
    Logo
  },
  middleware: 'notAuthenticated'
}
</script>

<style>

</style>
