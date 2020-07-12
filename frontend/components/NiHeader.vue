<template>
  <div>
    <v-toolbar
      dark
      style="position:relative;z-index:1"
      flat
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
            <nuxt-link to="/explore?filter=airing" style="color:white">
              {{ $t('menu.airing') }}
            </nuxt-link>
          </v-btn>
        </li>
        <li class="mr-2">
          <v-btn text large>
            <nuxt-link to="/" style="color:white">
              {{ $t('menu.suggestions') }}
            </nuxt-link>
          </v-btn>
        </li>
      </ul>
      <v-spacer />
      <v-row class="mr-2 d-none d-md-flex d-lg-flex d-lx-flex">
        <Search />
      </v-row>
      <v-menu offset-y :close-on-click="true">
        <template #activator="{ on: onMenu }">
          <v-tooltip bottom>
            <template #activator="{ on: onTooltip }">
              <v-btn
                icon
                large
                dark
                v-on="{ ...onMenu, ...onTooltip }"
              >
                <v-icon>
                  mdi-translate
                </v-icon>
              </v-btn>
            </template>
            <span>{{ $t('menu.change_language') }}</span>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item
            v-for="lang in availableLocales"
            :key="lang.code"
            :to="switchLocalePath(lang.code)"
          >
            <v-list-item-title>{{ lang.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-tooltip v-if="!$store.state.auth" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            large
            to="/login"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <span>Login</span>
      </v-tooltip>
      <div v-else class="d-none d-sm-flex d-md-flex d-lg-flex">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              large
              color="blue"
              v-bind="attrs"
              to="/user"
              v-on="on"
            >
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('menu.user_profile') }}</span>
        </v-tooltip>
        <v-tooltip v-if="$store.state.auth.role === 2" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              large
              v-bind="attrs"
              to="/panel"
              v-on="on"
            >
              <v-icon>mdi-cog</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('menu.admin_panel_button') }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              large
              v-bind="attrs"
              v-on="on"
              @click="logout"
            >
              <v-icon>mdi-exit-to-app</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('menu.logout_text') }}</span>
        </v-tooltip>
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
      style="z-index:2!important"
    >
      <v-img
        src="/img/nav-bg.jpg"
        height="100%"
      >
        <v-layout
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
                {{ $t('menu.login_register_nav') }}
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
    return {
      nav: false,
      search: '',
      focus: false,
      navs: [
        { id: 1, name: this.$t('menu.explore'), url: '/explore', icon: 'mdi-home' },
        { id: 2, name: this.$t('menu.airing'), url: '/explore?filter=airing', icon: 'mdi-plus-circle' },
        { id: 3, name: this.$t('menu.suggestions'), url: '/', icon: 'mdi-format-list-bulleted-square' }
      ]
    }
  },
  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
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
