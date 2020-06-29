<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h3>All Series</h3>
        <v-alert
          v-if="alertBox"
          type="info"
          :class="alertBoxColor"
          tile
          dismissible
        >
          {{ createdMessage }}
        </v-alert>
        <v-simple-table width="100%">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Episodes
                </th>
                <th class="text-left">
                  Visits
                </th>
                <th class="text-left">
                  ID
                </th>
                <th class="text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(serie,index) in series"
                :key="index"
              >
                <td>{{ serie.title }}</td>
                <td>{{ serie.episodes.length }}</td>
                <td>{{ serie.visits }}</td>
                <td>{{ serie._id }}</td>
                <td>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        :class="{ 'blue darken-4': serie.isFeatured }"
                        v-on="on"
                        @click="setFeatured(serie._id, index)"
                      >
                        <v-icon>
                          mdi-star
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Toggle Featured</span>
                  </v-tooltip>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        :to="'/panel/serie/' + serie._id + '/episode/create'"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon>
                          mdi-plus-circle
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Create Episode</span>
                  </v-tooltip>
                  <v-btn :to="'/panel/serie/' + serie._id + '/episodes'">
                    <v-icon>
                      mdi-play-circle
                    </v-icon>
                  </v-btn>
                  <v-btn :to="'/panel/serie/' + serie._id + '/edit'">
                    <v-icon>
                      mdi-circle-edit-outline
                    </v-icon>
                  </v-btn>
                  <ModalDeleteSerie :title="serie.title" :serieid="serie._id" />
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import ModalDeleteSerie from './ModalDeleteSerie'
export default {
  name: 'SerieList',
  components: {
    ModalDeleteSerie
  },
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: minLength(1) }
  },

  data: () => ({
    series: [],
    alertBox: false,
    createdMessage: '',
    alertBoxColor: ''
  }),
  created () {
    if (this.$route.query.created) {
      this.alertBox = true
      this.alertBoxColor = 'blue darken-4'
      this.createdMessage = 'Serie Created Successfully.'
    }
    if (this.$route.query.edited) {
      this.alertBox = true
      this.alertBoxColor = 'yellow darken-4'
      this.createdMessage = 'Serie Edited Successfully.'
    }
    if (this.$route.query.deleted) {
      this.alertBox = true
      this.alertBoxColor = 'red darken-4'
      this.createdMessage = 'Serie Deleted Successfully.'
    }
    this.$apollo.query({
      query: gql`query ($limit: Int){
        Series(limit: $limit, showNoEpisodes: true){
          _id
          title
          isFeatured
          episodes {
            _id
          }
          visits
        }
      }`,
      variables: {
        limit: 100
      }
    }).then((input) => {
      for (let i = 0; i < input.data.Series.length; i++) {
        this.series.push(input.data.Series[i])
      }
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error)
    })
  },
  methods: {
    setFeatured (serieid, index) {
      this.series[index].isFeatured = !this.series[index].isFeatured
      this.$apollo.mutate({
        mutation: gql`mutation ($_id: ID, $state: Boolean){
          featuredSerie(_id: $_id, state: $state){
            success
          }
        }`,
        variables: {
          _id: serieid,
          state: this.series[index].isFeatured
        }
      })
    }
  }
}
</script>

<style>

</style>
