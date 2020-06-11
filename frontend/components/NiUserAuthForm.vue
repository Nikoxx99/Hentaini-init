<template>
  <v-card>
    <v-card-title>
      Login into your account
    </v-card-title>
    <v-container>
      <form>
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
          counter
          @click:append="showPassword = !showPassword"
        />
        <v-btn class="mr-4" @click="login">
          Login
        </v-btn>
        <v-btn @click="clear">
          Clear
        </v-btn>
      </form>
    </v-container>
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
    showPassword: false
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

  methods: {
    clear () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.select = null
      this.checkbox = false
    },
    login () {
      this.$apollo.mutate({
        mutation: gql`mutation ($input: LoginInput!){
          login(input: $input){
            success
            token
            username
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
        const auth = {
          accessToken: input.data.login.token,
          username: input.data.login.username
        }
        this.$store.commit('setAuth', auth)
        Cookie.set('auth', auth)
        this.$router.push('/')
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
