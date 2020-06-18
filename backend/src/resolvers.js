import Serie from "./models/Serie";
import Episode from "./models/Episode";
import Genre from "./models/Genre";
import Category from "./models/Category";
import User from "./models/User";
import Player from "./models/Player"
import { auth } from "./auth";
import { createWriteStream } from "fs";
import shortid from "shortid";
import sharp from "sharp";

const storeUploadCover = async ({createReadStream, filename, mimetype}) => {
  const id = filename
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
  const id = filename
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

export const resolvers = {
  Query: {
    Serie: async (_,{_id}) => {
      return await Serie.findById(_id)
    },
    Series: async (_,{limit}) => {
      return await Serie.find().sort({x:-1}).limit(limit)
    },
    Episode: async (_,{_id}) => {
      return await Episode.findById(_id)
    },
    EpisodeByUrlName: async (_,{urlName}) => {
      return await Episode.findOne({urlName})
    },
    Episodes: async (_,{limit}) => {
      return await Episode.find().limit(limit)
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
    }
  },
  Mutation:{
    createSerie: async (_,{input: {cover, background_cover, ...data}}) => {
      const coverUrl = await processUploadCover(cover[0].file, cover[1])
      const background_coverUrl = await processUploadScreenshot(background_cover[0].file, background_cover[1])
      const payload = new Serie({
        ...data,
        coverUrl,
        background_coverUrl
      })
      const res = await payload.save()
      if(res){
        return { success: true, errors: [{path:'Create Serie',message: 'Serie Created Successfuly'}]}
      }else{
        return { success: false, errors: [{path:'Create Serie',message: 'Error Creating Serie'}]}
      }
    },
    createEpisode: async (_,{input: {customScreenshot, ...data}}) => {
      if(!customScreenshot){
        const payload = new Episode({...data})
        const res =  await payload.save()
        if(res){
          return { success: true, errors: [{path:'Create Episode',message: 'Episode Created Successfuly'}]}
        }else{
          return { success: false, errors: [{path:'Create Episode',message: 'Error Creating Episode'}]}
        }
      }else{
        const customScreenshotUrl = await processUploadEpisode(customScreenshot[0].file, customScreenshot[1], customScreenshot[2])
        const payload = new Episode({
          ...data,
          customScreenshotUrl
        })
        const res = await payload.save()
        if(res){
          return { success: true, errors: [{path:'Create Serie New Image',message: 'Serie Created Successfuly With new Image'}]}
        }else{
          return { success: false, errors: [{path:'Create Serie New Image',message: 'Error Creating Serie with new Image'}]}
        }
      }
    },
    createGenre: async (_,{input}) => {
      const payload = new Genre(input)
      const res =  await payload.save()
      if(res){
        return { success: true, errors: [{path:'Create Genre',message: 'Genre Created Successfuly'}]}
      }else{
        return { success: false, errors: [{path:'Create Genre',message: 'Error Creating Genre'}]}
      }
    },
    createCategory: async (_,{input}) => {
      const payload = new Category(input)
      const res =  await payload.save()
      if(res){
        return { success: true, errors: [{path:'Create Category',message: 'Category Created Successfuly'}]}
      }else{
        return { success: false, errors: [{path:'Create Category',message: 'Error Creating Category'}]}
      }
    },
    createPlayer: async (_,{input}) => {
      const payload = new Player(input)
      const res =  await payload.save()
      if(res){
        return { success: true, errors: [{path:'Create Player',message: 'Player Created Successfuly'}]}
      }else{
        return { success: false, errors: [{path:'Create Player',message: 'Error Creating Player'}]}
      }
    },
    createUser: async function (_,{input}){
      const emailUser = await User.findOne({email: input.email})
      const userUser = await User.findOne({username: input.username})
      if(emailUser){
        return { success: false, errors: [{path:'Create User',message: 'Email already exists.'}]}
      }else if (userUser){
        return { success: false, errors: [{path:'Create User',message: 'Username already exists.'}]}
      }else{
        const newUser = new User(input)
        newUser.password = await newUser.encryptPassword(input.password)
        return await newUser.save()
      }
    },
    editSerie: async (_,{input}) => {
      const id = input._id
      const res = await Serie.updateOne({_id: id}, input, {multi: false})
      if(res){
        return { success: true, errors: [{path:'Create Serie',message: 'Serie Edited Successfuly'}]}
      }else{
        return { success: false, errors: [{path:'Create Serie',message: 'Error Creating Serie'}]}
      }
    },
    editEpisode: async (_,{input: {customScreenshot, ...data}}) => {
      const id = data._id
      if(!customScreenshot){
        const res = await Episode.updateOne({_id: id}, data, {multi: false})
        if(res){
          return { success: true, errors: [{path:'Edit Episode',message: 'Episode Edited Successfuly'}]}
        }else{
          return { success: false, errors: [{path:'Edit Episode',message: 'Error Creating Episode'}]}
        }
      }else{
        const customScreenshotUrl = await processUploadEpisode(customScreenshot[0].file, customScreenshot[1], customScreenshot[2])
        const res = await Episode.updateOne({_id: id}, {...data,customScreenshotUrl}, {multi: false})
        if(res){
          return { success: true, errors: [{path:'Episode Edit New Image',message: 'Episode Edited Successfuly With new Image'}]}
        }else{
          return { success: false, errors: [{path:'Episode Edit New Image',message: 'Error Editing Episode with new Image'}]}
        }
      }
    },
    deleteSerie: async (_,{id}) => {
      const deleteSerie = await Serie.findByIdAndDelete(id)
      await Episode.deleteMany({serie_id: id})
      if(deleteSerie){
        return { success: true, errors: [{path:'Delete Serie',message: 'Serie deleted successfully.'}]}
      }else{
        return { success: false, errors: [{path:'Delete Serie',message: 'Error deleting Serie.'}]}
      }
    },
    deleteEpisode: async (_,{id}) => {
      const deleteEpisode = await Episode.findByIdAndDelete(id)
      if(deleteEpisode){
        return { success: true, errors: [{path:'Delete Episode',message: 'Episode deleted successfully.'}]}
      }else{
        return { success: false, errors: [{path:'Delete Episode',message: 'Error deleting Episode.'}]}
      }
    },
    login: async (parent, {input}, SECRET) => auth.login(input, User, SECRET)
    
  },
  Episode: {
    serie: ({serie_id}) => {
      return Serie.findOne({_id: serie_id})
    }
  },
  Serie: {
    episodes: ({_id}) => {
      const ep = Episode.find({serie_id: _id})
      return ep
    }
  }
}