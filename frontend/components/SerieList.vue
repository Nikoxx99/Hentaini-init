<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-alert
          v-if="alertBox"
          type="info"
          :class="alertBoxColor"
          tile
          dismissible
        >
          {{ createdMessage }}
        </v-alert>
        <v-card-title>
          All Series
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search for Hentai"
            single-line
            hide-details
            class="white--text"
          />
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="series"
          :page.sync="page"
          :search="search"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="elevation-1"
          @page-count="pageCount = $event"
        >
          <template v-slot:item.isFeatured="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  :class="{ 'blue darken-4': item.isFeatured }"
                  v-on="on"
                  @click="setFeatured(item._id, series.map(function(x) {return x._id; }).indexOf(item._id))"
                >
                  <v-icon>
                    mdi-star
                  </v-icon>
                </v-btn>
              </template>
              <span>Toggle Featured</span>
            </v-tooltip>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :to="'/panel/serie/' + item._id + '/episode/create'"
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
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :to="'/panel/serie/' + item._id + '/episodes'"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>
                    mdi-play-circle
                  </v-icon>
                </v-btn>
              </template>
              <span>Episode List</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :to="'/panel/serie/' + item._id + '/edit'"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>
                    mdi-circle-edit-outline
                  </v-icon>
                </v-btn>
              </template>
              <span>Edit Serie</span>
            </v-tooltip>
            <ModalDeleteSerie :title="item.title" :serieid="item._id" />
          </template>
        </v-data-table>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import ModalDeleteSerie from './Delete/ModalDeleteSerie'
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
    search: '',
    series: [],
    alertBox: false,
    createdMessage: '',
    alertBoxColor: '',
    page: 0,
    itemsPerPage: 50,
    pageCount: 1,
    headers: [
      {
        text: 'Name',
        align: 'start',
        sortable: false,
        value: 'title'
      },
      { text: 'Episodes', value: 'episodes.length' },
      { text: 'Visits', value: 'visits' },
      { text: 'ID', value: '_id' },
      { text: 'Featured', sortable: true, value: 'isFeatured' },
      { text: 'Actions', value: 'actions' }
    ]
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
