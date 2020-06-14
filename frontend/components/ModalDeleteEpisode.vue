<template>
  <span>
    <v-btn
      @click.stop="modal = true"
    >
      <v-icon>
        mdi-delete-outline
      </v-icon>
    </v-btn>
    <v-dialog
      v-model="modal"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Delete Episode {{ episodenumber }}?
        </v-card-title>

        <v-card-text>
          This will delete this Episode. This operation can not be undo.
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="green darken-1"
            text
            @click="modal = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="red darken-1"
            text
            @click="deleteEpisode(episodeid)"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import gql from 'graphql-tag'
export default {
  props: {
    episodeid: {
      type: String,
      default: ''
    },
    episodenumber: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    modal: false
  }),
  methods: {
    deleteEpisode (episodeid) {
      this.$apollo.mutate({
        mutation: gql`mutation ($id: ID){
          deleteEpisode(id: $id){
            success
            errors{
              path
              message
            }
          }
        }`,
        variables: {
          id: this.episodeid
        }
      }).then((input) => {
        window.location.reload(true)
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
