<template>
  <v-app-bar
    app
    dark
    style="background: #424242;"
    flat
  >
    <div class="v-toolbar-title">
      <v-toolbar-title class="font-weight-light text-general">
        <v-btn
          v-if="responsive"
          class="default v-btn--simple"
          icon
          @click.stop="onClickBtn"
        >
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
        {{ header }}
        {{ serie }}
      </v-toolbar-title>
    </div>

    <v-spacer />
    <v-toolbar-items>
      <v-flex
        align-center
        layout
        py-2
      >
        <v-text-field
          v-if="responsiveInput"
          class="mr-4 mt-2 purple-input"
          label="Search..."
          hide-details
          color="purple"
        />
        <v-icon
          class="toolbar-items"
          color
        >
          mdi-power
        </v-icon>
      </v-flex>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  name: 'ToolBar',
  props: {
    header: {
      type: String,
      default: 'Hentaini Panel'
    },
    serie: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    title: 'I got a digital dash -Future Hendrixx',
    responsive: false,
    responsiveInput: false
  })
}
</script>

<style>

</style>
