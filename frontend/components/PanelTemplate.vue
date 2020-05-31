<template>
  <v-navigation-drawer
    permanent
    aria-expanded
  >
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img src="/img/user_default.jpg" />
      </v-list-item-avatar>
    </v-list-item>

    <v-list-item link>
      <v-list-item-content>
        <v-list-item-title class="title">
          {{ $store.state.auth.username }}
        </v-list-item-title>
        <v-list-item-subtitle>Back to home</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider />

    <v-expansion-panels accordion flat>
      <v-expansion-panel class="grey darken-3">
        <v-expansion-panel-header>
          Serie Controls
          <template v-slot:actions>
            <v-icon>mdi-cog</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <nuxt-link to="/panel/serie/create">
            Create Serie
          </nuxt-link>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
          List Series
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header expand-icon="mdi-account" disable-icon-rotate>
          User Controls
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          List User
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header expand-icon="mdi-format-list-bulleted-type" disable-icon-rotate>
          Genre Controls
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <nuxt-link to="/panel/genre/create">
            Create Genre
          </nuxt-link>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header expand-icon="mdi-format-list-bulleted-type" disable-icon-rotate>
          Category Controls
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <nuxt-link to="/panel/category/create">
            Create Category
          </nuxt-link>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <Logo class="ml-4" />
  </v-navigation-drawer>
</template>
<script>
import Logo from '../components/Logo'
export default {
  name: 'PanelTemplate',
  components: {
    Logo
  }
}
</script>

<style>

</style>
