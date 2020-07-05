<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="6" class="mx-auto">
          <Logo style="justify-self:center;display:flex;" />
          <NiUserRegisterForm />
        </v-col>
      </v-row>
    </v-container>
  </div>
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
