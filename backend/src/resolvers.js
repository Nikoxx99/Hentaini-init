import Serie from "./models/Serie";
import Episode from "./models/Episode";
import Genre from "./models/Genre";
import Category from "./models/Category";
import User from "./models/User";
import { auth } from "./auth";
import { createWriteStream } from "fs";
import shortid from "shortid";

const storeUpload = async ({createReadStream, filename, mimetype}) => {
  const id = filename
  const r_id = shortid.generate()
  const extension = mimetype.split('/')
  const path = `uploadedFiles/${id}-${r_id}-.${extension[1]}`
  const stream = createReadStream();
  return new Promise((resolve, reject) => 
  stream
    .pipe(createWriteStream(path))
    .on("finish", () => resolve({ id, path, r_id, extension }))
    .on("error", reject)
  
  )
}

const processUpload = async (upload,filename) => {
  const {createReadStream, mimetype} = upload
  const { id, r_id, extension } = await storeUpload({createReadStream, filename, mimetype})
  return id+'-'+r_id+'-.'+extension[1]
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
    Episodes: async (_,{limit}) => {
      return await Episode.find().limit(limit)
    },
    Genres: async (_,{limit}) => {
      return await Genre.find().limit(limit)
    },
    Categories: async (_,{limit}) => {
      return await Category.find().limit(limit)
    },
  },
  Mutation:{
    createSerie: async (_,{input: {cover, background_cover, ...data}}) => {
      const coverUrl = await processUpload(cover[0].file, cover[1])
      const background_coverUrl = await processUpload(background_cover[0].file, background_cover[1])
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
    createEpisode: async (_,{input}) => {
      const payload = new Episode(input)
      const res =  await payload.save()
      if(res){
        return { success: true, errors: [{path:'Create Episode',message: 'Episode Created Successfuly'}]}
      }else{
        return { success: false, errors: [{path:'Create Episode',message: 'Error Creating Episode'}]}
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