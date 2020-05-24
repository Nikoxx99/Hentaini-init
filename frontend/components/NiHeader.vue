<template>
  <div>
    <v-toolbar
      dark
    >
      <v-toolbar-title>
        <Logo />
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
      <v-btn icon large>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
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
  }
}
</script>

<style>

</style>
