import {makeExecutableSchema} from 'graphql-tools'
import {resolvers} from './resolvers'

const typeDefs = `
  type Query {
    Serie(_id: ID): Serie
    Series(limit: Int): [Serie]
    Episode(_id: ID): Episode
    Episodes(limit: Int): [Episode]
    Genres(limit: Int): [Genre]
    Categories(limit: Int): [Category]
    Player(_id: ID): Player
    Players(limit: Int): [Player]
  }
  type Serie {
    _id: ID
    title: String
    synopsis: String
    genres: [GenreQuery]
    status: String
    serie_type: String
    censorship: Boolean
    episodes: [Episode]
    next_episode: String
    visits: Int
    coverUrl: String
    background_coverUrl: String
    rating: String
  }
  type Episode {
    _id: ID
    serie: Serie
    episode_number: String
    players: [Player]
    downloads: [Download]
  }

  type Player {
    _id: ID
    name: String
    short_name: String
    player_type: String
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

  type GenreQuery {
    text: String
    value: String
  }

  type Category {
    _id: ID
    name: String
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    date: String
  }

  type Error {
    path: String!
    message: String!
  }

  type SimpleResponse {
    success: Boolean!
    errors: [Error]
  }

  type Response {
    success: Boolean!
    token: String
    username: String
    errors: [Error]
  }

  scalar Upload

  type Mutation {
    createSerie(input: SerieInput): SimpleResponse
    createEpisode(input: EpisodeInput): SimpleResponse
    createGenre(input: GenreInput): SimpleResponse
    createCategory(input: CategoryInput): SimpleResponse
    createPlayer(input: PlayerInput): SimpleResponse
    createUser(input: UserInput): Response
    deleteSerie(id: ID): SimpleResponse
    deleteEpisode(id: ID): SimpleResponse
    login(input: LoginInput): Response
    uploadFile(file: Upload!): SimpleResponse
  }

  input SerieInput {
    title: String
    synopsis: String
    genres: [GenreInput]
    status: String
    serie_type: String
    censorship: Boolean
    created_at: String
    next_episode: String
    visits: Int
    cover: Upload
    background_cover: Upload
  }

  input EpisodeInput {
    serie_id: String
    episode_number: String
    visible: Boolean
    created_at: String
    language: String
    screenshot: String
    screenshotNew: Upload
    players: [PlayerInput]
    downloads: [DownloadInput]
  }

  input PlayerInput {
    name: String
    url: String
  }

  input DownloadInput {
    url: String
  }

  input GenreInput {
    text: String
    value: String
  }

  input CategoryInput {
    _id: ID
    name: String
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
    date: String
  }

  input LoginInput {
    username: String!
    password: String!
  }
`;

export default makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
})

