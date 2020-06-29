<template>
  <v-container>
    <v-alert
      v-if="alertBox"
      type="info"
      :class="alertBoxColor"
      tile
      dismissible
    >
      {{ createdMessage }}
    </v-alert>
    <v-row>
      <v-col cols="3">
        <v-card
          class="mx-auto"
          width="auto"
        >
          <v-img
            class="white--text align-end"
            height="50vh"
            width="auto"
            :src="`${CDN}/cover/${series.coverUrl}`"
          >
            <v-card-title>{{ series.title }}</v-card-title>
          </v-img>
          <v-card-subtitle class="pb-0">
            English: {{ series.title_english }}
          </v-card-subtitle>
          <v-card-subtitle class="pb-0">
            Episodes: {{ series.episodes.length }}
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <div>{{ series.synopsis }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="green"
              text
              :href="'/panel/serie/' + url + '/episode/create'"
            >
              Add Episode
            </v-btn>

            <v-btn
              color="orange"
              text
              :href="'/panel/serie/' + url + '/edit'"
            >
              Edit Serie
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="9">
        <v-simple-table width="100%">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Episode Number
                </th>
                <th class="text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="episode in series.episodes"
                :key="episode._id"
              >
                <td>{{ episode.episode_number }}</td>
                <td>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        :href="'/panel/serie/' + url + '/episodes/' + episode._id + '/edit'"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon>
                          mdi-circle-edit-outline
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Edit Episode</span>
                  </v-tooltip>
                  <ModalDeleteEpisode :episodenumber="episode.episode_number" :episodeid="episode._id" :serieid="$route.params.id" />
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
import ModalDeleteEpisode from './ModalDeleteEpisode'
export default {
  name: 'EpisodeList',
  components: {
    ModalDeleteEpisode
  },
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: minLength(1) }
  },
  data: () => ({
    series: {
      title: '',
      title_english: '',
      synopsis: '',
      episodes: {
        _id: ''
      },
      coverUrl: 'load.jpg'
    },
    url: '',
    CDN: process.env.CDN_URI,
    alertBox: false,
    alertBoxColor: '',
    createdMessage: ''
  }),
  created () {
    if (this.$route.query.created) {
      this.alertBox = true
      this.alertBoxColor = 'blue darken-4'
      this.createdMessage = 'Episode Created Successfully.'
    }
    if (this.$route.query.edited) {
      this.alertBox = true
      this.alertBoxColor = 'yellow darken-4'
      this.createdMessage = 'Episode Edited Successfully.'
    }
    if (this.$route.query.deleted) {
      this.alertBox = true
      this.alertBoxColor = 'red darken-4'
      this.createdMessage = 'Episode Deleted Successfully.'
    }
    this.$apollo.query({
      query: gql`query ($id: ID){
        Serie(_id: $id){
          title
          title_english
          synopsis
          visits
          episodes {
            _id
            serie{
              _id
            }
            episode_number
          }
          coverUrl
        }
      }`,
      variables: {
        id: this.$route.params.id
      }
    }).then((input) => {
      this.series = input.data.Serie
      this.url = this.$route.params.id
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error)
    })
  }
}
</script>

<style>

</style>
