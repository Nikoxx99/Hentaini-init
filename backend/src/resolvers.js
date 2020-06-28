import Serie from "./models/Serie";
import Episode from "./models/Episode";
import Genre from "./models/Genre";
import Category from "./models/Category";
import User from "./models/User";
import Role from "./models/Role";
import Player from "./models/Player"
import ViewList from "./models/ViewList";
import { auth } from "./auth";
import { createWriteStream } from "fs";
import fs from "fs";
import shortid from "shortid";
import sharp from "sharp";
import { sendNotificationFn } from "./partials/sendNotification";

const storeUploadCover = async ({createReadStream, filename, mimetype}) => {
  const id1 = filename.replace(/[^A-Z0-9]/ig, "_")
  const id = id1.toLowerCase()
  const r_id = shortid.generate()
  const extension = mimetype.split('/')
  const path = `cdn/cover/${id}-${r_id}-.${extension[1]}`
  const stream = createReadStream();
  const resize = sharp()
    .resize(270, 420,{
      fit: sharp.fit.cover,
      withoutEnlargement: true
    })
  return new Promise((resolve, reject) => 
  stream
  .pipe(resize)
  .pipe(createWriteStream(path))
  .on("finish", () => resolve({ id, path, r_id, extension }))
  .on("error", reject)
  
  )
}
const storeUploadScreenshot = async ({createReadStream, filename, mimetype}) => {
  const id1 = filename.replace(/[^A-Z0-9]/ig, "_")
  const id = id1.toLowerCase()
  const r_id = shortid.generate()
  const extension = mimetype.split('/')
  const path = `cdn/screenshot/${id}-${r_id}-.${extension[1]}`
  const stream = createReadStream();
  const resize = sharp()
    .resize(1280, 720,{
      fit: sharp.fit.cover,
      withoutEnlargement: true
    })
  return new Promise((resolve, reject) => 
  stream
  .pipe(resize)
  .pipe(createWriteStream(path))
  .on("finish", () => resolve({ id, path, r_id, extension }))
  .on("error", reject)
  
  )
}
const storeUploadEpisode = async ({createReadStream, filename, mimetype, episode}) => {
  const id1 = filename.replace(/[^A-Z0-9]/ig, "_")
  const id = id1.toLowerCase()
  const r_id = shortid.generate()
  const e_n = episode
  const extension = mimetype.split('/')
  const path = `cdn/screenshot/${id}-${r_id}_${e_n}-.${extension[1]}`
  const stream = createReadStream();
  const resize = sharp()
    .resize(1280, 720,{
      fit: sharp.fit.cover,
      withoutEnlargement: true
    })
  return new Promise((resolve, reject) => 
  stream
    .pipe(resize)
    .pipe(createWriteStream(path))
    .on("finish", () => resolve({ id, path, r_id, e_n, extension }))
    .on("error", reject)
  
  )
}

const processUploadCover = async (upload,filename) => {
  const {createReadStream, mimetype} = upload
  const { id, r_id, extension } = await storeUploadCover({createReadStream, filename, mimetype})
  return id+'-'+r_id+'-.'+extension[1]
}
const processUploadScreenshot = async (upload,filename) => {
  const {createReadStream, mimetype} = upload
  const { id, r_id, extension } = await storeUploadScreenshot({createReadStream, filename, mimetype})
  return id+'-'+r_id+'-.'+extension[1]
}
const processUploadEpisode = async (upload,filename,episode) => {
  const {createReadStream, mimetype} = upload
  const { id, r_id, e_n, extension } = await storeUploadEpisode({createReadStream, filename, mimetype, episode})
  return id+'-'+r_id+'_'+e_n+'-.'+extension[1]
}
const genUrlName = async (serie_id) => {
  const serieTitle = await Serie.findOne({_id: serie_id})
  const serieName = serieTitle.title.replace(/[^A-Z0-9]/ig, '-')
  const urlNameCompose = serieName
  const urlName = urlNameCompose.toLowerCase()
  return urlName
}
const simpleResponse = async (success,path,message) => {
  return { success: success, errors: [{path: path, message: message}]}
}
export const resolvers = {
  Query: {
    Serie: async (_,{_id}) => {
      return await Serie.findById(_id)
    },
    Series: async (_,{limit,order,showNoEpisodes}) => {
      if (showNoEpisodes) {
        return await Serie.find().sort({'visits': order}).limit(limit)
      } else {
        return await Serie.find({'hasEpisodes': true}).sort({'visits': order}).limit(limit)
      }
    },
    Episode: async (_,{_id}) => {
      return await Episode.findById(_id)
    },
    EpisodeByUrlName: async (_,{urlName, episode_number}) => {
      return await Episode.findOne({'urlName': urlName, 'episode_number': episode_number})
    },
    Episodes: async (_,{limit,showInvisible}) => {
      if (showInvisible) {
        return await Episode.find().limit(limit).sort({ 'created_at' : 'desc' })
      } else {
        return await Episode.find({'visible': true}).limit(limit).sort({ 'created_at' : 'desc' })
      }
    },
    Genre: async (_,{url}) => {
      return await Genre.findOne({url: url})
    },
    Genres: async (_,{limit}) => {
      return await Genre.find().limit(limit)
    },
    Categories: async (_,{limit}) => {
      return await Category.find().limit(limit)
    },
    Player: async (_,{_id}) => {
      return await Player.findById(_id)
    },
    Players: async (_,{limit}) => {
      return await Player.find().limit(limit)
    },
    Users: async (_,{limit}) => {
      return await User.find().limit(limit)
    }
  },
  Mutation:{
    createSerie: async (_,{input: {cover, background_cover, genres, ...data}}) => {
      var genres = genres.map(function(newGenreObject){
        const url_regex = newGenreObject.text.replace(/[^A-Z0-9]/ig, "-")
        const url = url_regex.toLowerCase()
        newGenreObject.text = newGenreObject.text
        newGenreObject.value = newGenreObject.text
        newGenreObject.url = url
        return newGenreObject
      })
      console.table({cover, background_cover})
      const coverUrl = await processUploadCover(cover[0].file, cover[1])
      const background_coverUrl = await processUploadScreenshot(background_cover[0].file, background_cover[1])
      const payload = new Serie({
        genres,
        coverUrl,
        background_coverUrl,
        ...data
      })
      const res = await payload.save()
      if(res){
        return simpleResponse(true,'Create Serie','Serie Created Successfuly')
      }else{
        return simpleResponse(false,'Create Serie','Error Creating Serie')
      }
    },
    createEpisode: async (_,{input: {customScreenshot,serie_id,episode_number,sendNotification,players, ...data}}) => {
      var players = await Promise.all(players.map(async (newPlayerObject) => {
        const player = await Player.find({ 'short_name': newPlayerObject.name })
        const player_code = player[0].player_code
        const player_url = player_code.replace('codigo',newPlayerObject.url)
        newPlayerObject.name = newPlayerObject.name
        newPlayerObject.url = player_url
        return newPlayerObject
      }))
      var urlName = await genUrlName(serie_id, episode_number)
      const serie = await Serie.findById(serie_id)
      if (episode_number < 2) {
        await Serie.updateOne({_id: serie_id}, {'hasEpisodes': true}, {multi: false})
      }
      if (sendNotification) {
        var message = { 
          app_id: process.env.ONESIGNAL_API_ID,
          contents: {
            "en": "New episode of " + serie.title
          },
          headings: {
            "en": "Hentaini"
          },
          url: process.env.BASE_URI + '/episode/' + urlName + '/' + episode_number,
          big_picture: process.env.CDN_URI + '/screenshot/' + serie.background_coverUrl,
          chrome_web_image: process.env.CDN_URI + '/screenshot/' + serie.background_coverUrl,
          chrome_big_picture: process.env.CDN_URI + '/screenshot/' + serie.background_coverUrl,
          included_segments: ["All"]
        };
        const sentNotification = sendNotificationFn(message)
        console.log(sentNotification)
      }
      if(!customScreenshot){
        const payload = new Episode({
          serie_id,
          episode_number,
          urlName,
          players,
          ...data
        })
        const res =  await payload.save()
        if(res){
          return simpleResponse(true,'Create Episode','Episode Created Successfuly')
        }else{
          return simpleResponse(false,'Create Episode','Error Creating Episode')
        }
      }else{
        const customScreenshotUrl = await processUploadEpisode(customScreenshot[0].file, customScreenshot[1], customScreenshot[2])
        const payload = new Episode({
          customScreenshotUrl,
          serie_id,
          players,
          episode_number,
          ...data,
        })
        const res = await payload.save()
        if(res){
          return simpleResponse(true,'Create Serie New Image','Serie Created Successfuly With new Image')
        }else{
          return simpleResponse(false,'Create Serie New Image','Error Creating Serie with new Image')
        }
      }
    },
    createGenre: async (_,{input}) => {
      const url_regex = input.text.replace(/[^A-Z0-9]/ig, "-")
      const url = url_regex.toLowerCase()
      const value = input.text
      const text = input.text
      const payload = new Genre({text, value, url})
      const res =  await payload.save()
      if(res){
        return simpleResponse(true,'Create Genre','Genre Created Successfuly')
      }else{
        return simpleResponse(false,'Create Genre','Error Creating Genre')
      }
    },
    createCategory: async (_,{input}) => {
      const payload = new Category(input)
      const res =  await payload.save()
      if(res){
        return simpleResponse(true,'Create Category','Category Created Successfuly')
      }else{
        return simpleResponse(false,'Create Category','Error Creating Category')
      }
    },
    createPlayer: async (_,{input}) => {
      const payload = new Player(input)
      const res =  await payload.save()
      if(res){
        return simpleResponse(true,'Create Player','Player Created Successfuly')
      }else{
        return simpleResponse(false,'Create Player','Error Creating Player')
      }
    },
    createUser: async function (_,{input: {...data}}){
      console.log(data)
      const emailUser = await User.findOne({email: data.email})
      const userUser = await User.findOne({username: data.username})
      const role = 1
      if(emailUser){
        return simpleResponse(false,'Create User','Email already exists.')
      }else if (userUser){
        return simpleResponse(false,'Create User','Username already exists.')
      }else{
        const newUser = new User({role,...data})
        newUser.password = await newUser.encryptPassword(data.password)
        const res = await newUser.save()
        if(res){
          return simpleResponse(true,'Create User','User created successfully.')
        }else{
          return simpleResponse(false,'Create User','User creating error.')
        }
      }
    },
    createRole: async function (_,{input}){
      const newRole = new Role(input)
      const res = await newRole.save()
      if (res){
        return simpleResponse(true,'Create Role','Role Created Successfullly.')
      } else {
        return simpleResponse(false,'Create Role','Error Creating Role.')
      }
    },
    editSerie: async (_,{input}) => {
      const id = input._id
      const res = await Serie.updateOne({_id: id}, input, {multi: false})
      if(res){
        return simpleResponse(true,'Edit Serie','Serie Edited Successfuly')
      }else{
        return simpleResponse(false,'Edit Serie','Error Editing Serie')
      }
    },
    editEpisode: async (_,{input: {customScreenshot, ...data}}) => {
      const id = data._id
      if(!customScreenshot){
        const res = await Episode.updateOne({_id: id}, data, {multi: false})
        if(res){
          return simpleResponse(true,'Edit Episode','Episode Edited Successfuly')
        }else{
          return simpleResponse(false,'Edit Episode','Error Editing Episode')
        }
      }else{
        const customScreenshotUrl = await processUploadEpisode(customScreenshot[0].file, customScreenshot[1], customScreenshot[2])
        const res = await Episode.updateOne({_id: id}, {...data,customScreenshotUrl}, {multi: false})
        if(res){
          return simpleResponse(true,'Episode Edit New Image','Episode Edited Successfuly With new Image')
        }else{
          return simpleResponse(false,'Episode Edit New Image','Error Editing Episode with new Image')
        }
      }
    },
    deleteSerie: async (_,{id}) => {
      const deleteSerie = await Serie.findByIdAndDelete(id)
      console.log(deleteSerie)
      const pathCover = 'cdn/cover/'+deleteSerie.coverUrl
      const pathBackgroundCover = 'cdn/screenshot/'+deleteSerie.background_coverUrl
      fs.unlink(pathCover, (err) => {
        if (err) {
          console.error(err)
          return
        }
      })
      fs.unlink(pathBackgroundCover, (err) => {
        if (err) {
          console.error(err)
          return
        }
      })
      // await Episode.deleteMany({serie_id: id})
      if(deleteSerie){
        return simpleResponse(true,'Delete Serie','Serie deleted successfully.')
      }else{
        return simpleResponse(false,'Delete Serie','Error deleting Serie.')
      }
    },
    deleteEpisode: async (_,{id}) => {
      const deleteEpisode = await Episode.findByIdAndDelete(id)
      if(deleteEpisode){
        return simpleResponse(true,'Delete Episode','Episode deleted successfully.')
      }else{
        return simpleResponse(false,'Delete Episode','Error deleting Episode.')
      }
    },
    viewRegister: async (_,{input}) => {
      if (!input.user_id) {
        const serie_id = input.serie_id
        await Serie.updateOne({_id: serie_id}, { $inc: { 'visits': 1 } }, {multi: false})
      } else {
        const previousEntry = await ViewList.find({'serie_id': input.serie_id, 'episode_number': input.episode_number, 'user_id': input.user_id})
        if (previousEntry.length < 1) {
          await Serie.updateOne({_id: input.serie_id}, { $inc: { 'visits': 1 } }, {multi: false})
          const view = new ViewList(input)
          await view.save()
        }
      }
    },
    login: async (_, {input}, SECRET) => auth.login(input, User, SECRET)
    
  },
  Episode: {
    serie: ({serie_id}) => {
      return Serie.findOne({_id: serie_id})
    }
  },
  Serie: {
    episodes: ({_id}) => {
      return Episode.find({serie_id: _id}).sort({ 'episode_number' : 'asc' })
    }
  },
  Genre: {
    series ({url},{sort}) {
      return Serie.find({'genres.url': url}).sort({'visits': sort})
    }
  }
}