<template>
  <div>
    <v-toolbar
      dark
      style="position:relative;z-index:1"
    >
      <v-app-bar-nav-icon
        class="d-flex d-md-none d-lg-none d-lx-flex"
        @click="nav = !nav"
      />
      <v-toolbar-title>
        <a href="/"><Logo /></a>
      </v-toolbar-title>
      <ul class="d-none d-md-flex d-lg-flex">
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
      <v-row class="mr-2 d-none d-md-flex d-lg-flex d-lx-flex">
        <Search />
      </v-row>
      <v-btn v-if="!$store.state.auth" icon large to="/login">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <div v-else class="d-none d-sm-flex d-md-flex d-lg-flex">
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
    <v-navigation-drawer
      v-model="nav"
      app
      dark
      floating
      mobile-breakpoint="960"
      disable-resize-watcher
      width="260"
      absolute
    >
      <v-img
        src="/img/nav-bg.jpg"
        height="100%"
      >
        <v-layout
          class=""
          tag="v-list"
          column
        >
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img src="/img/user_default.jpg" />
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item v-if="$store.state.auth" link>
            <v-list-item-content>
              <v-list-item-title class="title">
                {{ $store.state.auth.username }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-else link to="/login">
            <v-list-item-content>
              <v-list-item-title class="title">
                Login or Register
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider />
          <v-row class="px-4 d-flex d-sm-flex d-sx-flex d-md-none d-lg-none d-lx-none">
            <Search />
          </v-row>
          <v-list>
            <v-list-item-group>
              <v-list-item
                v-for="link in navs"
                :key="link.id"
                :to="link.url"
              >
                <v-list-item-icon>
                  <v-icon v-text="link.icon" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="link.name" />
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <Logo class="ml-4" />
        </v-layout>
      </v-img>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import Logo from '../components/Layout/Logo'
import Search from '../components/Utils/Search'
export default {
  name: 'NiHeader',
  components: {
    Logo,
    Search
  },
  data () {
    this.$i18n.locale = 'en'
    return {
      locale: 'en',
      nav: false,
      search: '',
      focus: false,
      navs: [
        { id: 1, name: 'Explore', url: '/explore', icon: 'mdi-home' },
        { id: 2, name: 'Airing', url: '/airing', icon: 'mdi-plus-circle' },
        { id: 3, name: 'Suggestions', url: '/suggestions', icon: 'mdi-format-list-bulleted-square' }
      ]
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
