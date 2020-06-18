<template>
  <div>
    <v-toolbar
      dark
    >
      <v-toolbar-title>
        <a href="/"><Logo /></a>
      </v-toolbar-title>
      <ul class="d-flex">
        <li class="mr-2">
          <v-btn text large>
            <nuxt-link to="/explore" style="color:white">
              {{ $t('menu.explore') }}
            </nuxt-link>
          </v-btn>
        </li>
        <li class="mr-2">
          <v-btn text large>
            <nuxt-link to="/airing" style="color:white">
              {{ $t('menu.airing') }}
            </nuxt-link>
          </v-btn>
        </li>
        <li class="mr-2">
          <v-btn text large>
            <nuxt-link to="/suggestions" style="color:white">
              {{ $t('menu.suggestions') }}
            </nuxt-link>
          </v-btn>
        </li>
      </ul>
      <v-spacer />
      <v-btn v-if="!$store.state.auth" icon large to="/login">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <div v-else>
        <v-btn icon large color="blue" to="/user">
          <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn icon large to="/panel">
          <v-icon>mdi-cog</v-icon>
        </v-btn>
        <v-btn icon large @click="logout">
          <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
      </div>
    </v-toolbar>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import Logo from '../components/Logo'
export default {
  name: 'NiHeader',
  components: {
    Logo
  },
  data () {
    this.$i18n.locale = 'en'
    return {
      locale: 'en'
    }
  },
  methods: {
    logout () {
      Cookie.remove('auth')
      this.$store.commit('setAuth', null)
    }
  }
}
</script>

<style>

</style>
