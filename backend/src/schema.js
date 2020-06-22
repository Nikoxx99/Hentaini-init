import {makeExecutableSchema} from 'graphql-tools'
import {resolvers} from './resolvers'

const typeDefs = `
  type Query {
    Serie(_id: ID): Serie
    Series(limit: Int, order: String): [Serie]
    Episode(_id: ID): Episode
    EpisodeByUrlName(urlName: String): Episode
    Episodes(limit: Int): [Episode]
    Genre(url: String): Genre
    Genres(limit: Int): [Genre]
    Categories(limit: Int): [Category]
    Player(_id: ID): Player
    Players(limit: Int): [Player]
    Users(limit: Int): [User]
    Roles: [Role]
  }
  type Serie {
    _id: ID
    title: String
    title_english: String
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
    urlName: String
    serie: Serie
    episode_number: Int
    hasCustomScreenshot: Boolean
    customScreenshotUrl: String
    screenshot: String
    language: String
    visible: Boolean
    players: [Player]
    downloads: [Download]
  }

  type Player {
    name: String
    short_name: String
    url: String
  }

  type Download {
    url: String
  }

  type Genre {
    _id: ID
    text: String
    url: String
    series(sort: String): [Serie]
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
    date: String
  }

  type Role {
    _id: ID
    role: Int
    accesslevel: Int
    name: String
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
    role: Int
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
    createRole(input: RoleInput): SimpleResponse
    editSerie(input: EditSerieInput): SimpleResponse
    editEpisode(input: EditEpisodeInput): SimpleResponse
    deleteSerie(id: ID): SimpleResponse
    deleteEpisode(id: ID): SimpleResponse
    login(input: LoginInput): Response
    uploadFile(file: Upload!): SimpleResponse
  }

  input SerieInput {
    title: String
    title_english: String
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

  input EditSerieInput {
    _id: String
    title: String
    title_english: String
    synopsis: String
    genres: [GenreInput]
    status: String
    serie_type: String
    censorship: Boolean
    updated_at: String
    next_episode: String
    visits: Int
  }

  input EpisodeInput {
    urlName: String
    serie_id: String
    episode_number: Int
    visible: Boolean
    created_at: String
    language: String
    hasCustomScreenshot: Boolean
    screenshot: String
    customScreenshot: Upload
    players: [PlayerInput]
    downloads: [DownloadInput]
  }
  input EditEpisodeInput {
    _id: String
    serie_id: String
    episode_number: Int
    visible: Boolean
    language: String
    hasCustomScreenshot: Boolean
    screenshot: String
    customScreenshot: Upload
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
    url: String
  }

  input CategoryInput {
    _id: ID
    name: String
  }

  input UserInput {
    username: String!
    email: String
    password: String!
    date: String
    role: Int
  }

  input RoleInput {
    role: Int!
    accessLevel: Int!
    name: String
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

