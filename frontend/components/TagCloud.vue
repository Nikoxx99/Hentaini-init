<template>
  <v-container>
    <v-chip-group
      style="border-bottom: 1px solid rgb(84 84 84);padding-bottom: 10px;padding-top: 5px;"
    >
      <v-chip v-for="tag in Genres" :key="tag.text" :href="`/explore?genre=${tag.url}`">
        {{ tag.text }}
      </v-chip>
    </v-chip-group>
  </v-container>
</template>
<script>
import gql from 'graphql-tag'
export default {
  apollo: {
    Genres () {
      return {
        query: gql`
        query {
          Genres(limit: 20){
            text
            url
          } 
        }
      `
      }
    }
  },
  data: () => ({
    h: 'e'
  })
}
</script>
<style>
.v-slide-group__prev {
display: none !important;
}
</style>
