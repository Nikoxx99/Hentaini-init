<template>
  <v-card>
    <v-card-title>
      Register a new Account
    </v-card-title>
    <v-container>
      <form>
        <v-text-field
          v-model="username"
          :rules="usernameRules"
          label="Username"
          required
        />
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Email (Optional)"
          hint="You can't recover your account if you forgot your password if you not define an email."
        />
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          hint="Enter your password"
          required
          counter
          @click:append="showPassword = !showPassword"
        />
        <v-text-field
          v-model="confirmPassword"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          label="Confirm Password"
          hint="Confirm your password"
          required
          counter
          @blur="matchPasswords"
          @click:append="showPassword = !showPassword"
        />
        <v-btn class="mr-4 blue darken-4" @click="createUser">
          Register
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
    usernameRules: [
      v => !!v || 'Username is required',
      v => (v && v.length <= 32) || 'Name must be less than 32 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be a valid one'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Really men?',
      v => (v && v.length >= 8) || 'Your password must be at least 8 characters or more.'
    ],
    confirmPassword: '',
    confirmPasswordRules: [
      v => !!v || 'U want a hug?'
    ],
    showPassword: false,
    valid: false
  }),

  methods: {
    matchPasswords () {
      if (this.password === this.confirmPassword) {
        this.valid = true
      } else {
        this.valid = false
      }
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.select = null
      this.checkbox = false
    },
    createUser () {
      this.$apollo.mutate({
        mutation: gql`mutation ($input: UserInput!){
          createUser(input: $input){
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
            email: this.email,
            password: this.password
          }
        }
      }).then((input) => {
        this.$router.push({ path: '/login?firstTime=true' })
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
