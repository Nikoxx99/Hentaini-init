import {makeExecutableSchema} from 'graphql-tools'
import {resolvers} from './resolvers'

const typeDefs = `
  type Query {
    Serie(_id: ID): Serie
    Series(limit: Int): [Serie]
    Episode(_id: ID): Episode
    Episodes(limit: Int): [Episode]
  }
  type Serie {
    _id: ID
    title: String
    synopsis: String
    genres: [Genre]
    status: String
    serie_type: String
    episodes: [Episode]
    next_episode: String
    visits: Int
    cover: String
    background_cover: String
    rating: String
  }
  type Episode {
    _id: ID
    serie: Serie
    episode_number: Int
    players: [Player]
    downloads: [Download]
  }

  type Player {
    _id: ID
    name: String
    short_name: String
    player_type: String
    url: String
  }

  type Download {
    _id: ID
    name: String
    short_name: String
    url: String
  }

  type Genre {
    _id: ID
    name: String
  }

  type Mutation {
    createSerie(input: SerieInput): Serie
    createEpisode(input: EpisodeInput): Episode
  }

  input SerieInput {
    title: String
    synopsis: String
    genres: [GenreInput]
    status: String
    serie_type: String
    next_episode: String
    visits: Int
    cover: String
    background_cover: String
  }

  input EpisodeInput {
    serie_id: String
    episode_number: Int
    players: [PlayerInput]
    downloads: [DownloadInput]
  }

  input PlayerInput {
    name: String
    short_name: String
    player_type: String
    url: String
  }

  input DownloadInput {
    name: String
    short_name: String
    url: String
  }

  input GenreInput {
    _id: ID
    name: String
  }
`;

export default makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
})

