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
        <v-list-item-subtitle>Admin Access</v-list-item-subtitle>
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
          <nuxt-link :to="`${this.$route.path}/serie/create`">
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
    </v-expansion-panels>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: 'PanelTemplate'
}
</script>

<style>

</style>
