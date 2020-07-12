<template>
  <v-img
    src="img/login-bg.jpg"
    style="width:100%!important;height:100vh!important;background-position:bottom!important"
  >
    <v-container>
      <v-row>
        <v-col
          cols="12"
          xs="12"
          sm="10"
          md="8"
          lg="4"
          lx="4"
          class="mx-auto"
        >
          <Logo class="my-4" style="justify-self:center;display:flex;" />
          <NiUserRegisterForm />
        </v-col>
      </v-row>
    </v-container>
  </v-img>
</template>

<script>
import NiUserRegisterForm from '../components/NiUserRegisterForm'
import Logo from '../components/Layout/Logo'
export default {
  components: {
    NiUserRegisterForm,
    Logo
  },
  middleware: 'notAuthenticated'
}
</script>

<style>

</style>
