<template>
  <v-row>
    <v-col cols="12">
      <v-simple-table width="100%">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Name
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
              v-for="serie in series"
              :key="serie._id"
            >
              <td>{{ serie.title }}</td>
              <td>{{ serie._id }}</td>
              <td>Edit Buttons</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
  </v-row>
</template>

<script>
import gql from 'graphql-tag'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'SerieList',
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: minLength(1) }
  },

  data: () => ({
    series: []
  }),
  created () {
    this.$apollo.query({
      query: gql`query ($limit: Int){
        Series(limit: $limit){
          _id
          title
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
  }
}
</script>

<style>

</style>
