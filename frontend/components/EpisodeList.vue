<template>
  <v-container>
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
            :src="'http://localhost:4000/cover/'+series.coverUrl"
          >
            <v-card-title>{{ series.title }}</v-card-title>
          </v-img>

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
                  <v-btn :href="'/panel/serie/' + url + '/episodes/' + episode._id + '/edit'">
                    <v-icon>
                      mdi-circle-edit-outline
                    </v-icon>
                  </v-btn>
                  <ModalDeleteEpisode :episodenumber="episode.episode_number" :episodeid="episode._id" />
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
      synopsis: '',
      episodes: {
        _id: ''
      },
      coverUrl: 'load.jpg'
    },
    url: ''
  }),
  created () {
    this.$apollo.query({
      query: gql`query ($id: ID){
        Serie(_id: $id){
          title
          synopsis
          visits
          episodes {
            _id
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
