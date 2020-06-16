<template>
  <v-container>
    <v-row>
      <v-card
        class="mx-auto"
        width="100%"
      >
        <v-img
          height="250"
          :src="episode.serie.coverUrl"
        />

        <v-card-title>{{ episode.serie.title }}</v-card-title>

        <v-card-text>
          <v-row
            align="center"
            class="mx-0"
          >
            <v-rating
              v-model="rating"
              length="5"
              empty-icon="mdi-heart-outline"
              full-icon="mdi-heart"
              half-icon="mdi-heart-half-full"
              half-increments
              hover
              medium
              :dense="false"
              color="blue darken-3"
              background-color="blue"
            />
            <span class="font-weight-bold">
              {{ rating }}
            </span>
          </v-row>

          <div class="my-4 subtitle-1">
            <v-btn
              class=""
              color="primary"
              outlined
              rounded
            >
              {{ episode.serie.status }}
              <v-icon right>
                mdi-youtube-tv
              </v-icon>
            </v-btn>
            <v-btn
              color="pink darken-1"
              rounded
              outlined
            >
              <v-icon left>
                mdi-heart
              </v-icon>
              {{ $t('episode.add_favorite') }}
            </v-btn>
          </div>

          <div>{{ episode.serie.synopsis }}</div>
        </v-card-text>

        <v-divider class="mx-4" />

        <v-card-text>
          <v-chip-group
            active-class="blue darken-3"
            column
          >
            <v-chip
              v-for="genre in episode.serie.genres"
              :key="genre.text"
            >
              {{ genre.text }}
            </v-chip>
          </v-chip-group>
        </v-card-text>

        <v-card-actions>
          {{ $t('episode.show_episodes') }}
          <v-btn
            icon
            @click="show = !show"
          >
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="show">
            <v-divider />

            <v-list shaped>
              <v-subheader>Episodes for {{ episode.serie.title }}</v-subheader>
              <v-list-item-group color="primary">
                <v-list-item
                  v-for="episode_item in episode.serie.episodes"
                  :key="episode_item.episode_number"
                >
                  <v-list-item-icon>
                    <span background-color="blue darken-4">{{ episode_item.episode_number }}</span>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <a :href="nextEpisodeUrl.concat('', episode_item.episode_number)"><v-list-item-title v-text="episode.serie.title" /></a>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
        </v-expand-transition>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    episode: {
      type: Object,
      default: () => {
        return {
          serie: {
            title: '',
            synopsis: '',
            genres: {
              value: ''
            },
            status: '',
            coverUrl: ''
          },
          nextEpisodeUrl: '',
          urlName: 'init',
          episode_number: '',
          players: {
            short_name: '',
            url: ''
          },
          downloads: {
            url: ''
          }
        }
      }
    }
  },
  data () {
    this.$i18n.locale = 'en'
    return {
      locale: 'en',
      rating: 0,
      show: false
    }
  },
  created () {
    this.nextEpisodeUrl = this.episode.urlName.slice(0, -1)
  }
}
</script>

<style>

</style>
