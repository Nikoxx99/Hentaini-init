<template>
  <v-card
    flat
    color="rgba(51,51,51,0.5)"
  >
    <v-alert
      v-if="firstTime"
      type="info"
      class="blue darken-4"
      tile
    >
      Welcome to Hentaini. Now you can log into your account.
    </v-alert>
    <v-alert
      v-if="loginFailed"
      type="error"
      tile
    >
      Invalid login credentials. Try again.
    </v-alert>
    <v-card-title class="justify-center">
      Login into your account
    </v-card-title>
    <v-card-text>
      <form @keyup.enter="login">
        <v-text-field
          v-model="username"
          :error-messages="nameErrors"
          label="Username"
          required
          @input="$v.username.$touch()"
          @blur="$v.username.$touch()"
        />
        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          hint="Enter your password"
          required
          @click:append="showPassword = !showPassword"
        />
      </form>
    </v-card-text>
    <v-card-text>
      <v-btn tile text block class="my-2 blue darken-4" @click.enter="login">
        Login
      </v-btn>
      <v-btn block text class="gray darken-4" href="/">
        Back to home
      </v-btn>
    </v-card-text>
    <v-card-text>
      <h4 class="text-center">
        Not registered yet?
      </h4>
      <p class="text-center">
        Join us and access the best Hentai in the interwebs!
      </p>
      <v-btn block tile text class="yellow darken-4" href="/register">
        Register
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import gql from 'graphql-tag'
import Cookie from 'js-cookie'
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    username: { required, maxLength: maxLength(24) },
    password: { required }
  },

  data: () => ({
    username: '',
    password: '',
    showPassword: false,
    firstTime: false,
    loginFailed: false
  }),

  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) { return errors }
      !this.$v.username.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.username.required && errors.push('Name is required.')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) { return errors }
      return errors
    }
  },
  mounted () {
    if (this.$route.query.firstTime) {
      this.firstTime = true
    }
    if (this.$route.query.loginFailed) {
      this.loginFailed = true
    }
  },
  methods: {
    clear () {
      this.username = ''
      this.password = ''
    },
    login () {
      this.$apollo.mutate({
        mutation: gql`mutation ($input: LoginInput!){
          login(input: $input){
            success
            token
            username
            role
            errors{
              path
              message
            }
          }
        }`,
        variables: {
          input: {
            username: this.username,
            password: this.password
          }
        }
      }).then((input) => {
        if (input.data.login.success) {
          const auth = {
            accessToken: input.data.login.token,
            username: input.data.login.username,
            role: input.data.login.role
          }
          this.$store.commit('setAuth', auth)
          Cookie.set('auth', auth)
          this.$router.replace('/')
        } else {
          this.loginFailed = true
        }
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
      })
    }
  }
}
</script>

<style>

</style>
