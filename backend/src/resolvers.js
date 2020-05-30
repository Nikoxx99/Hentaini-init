import Serie from "./models/Serie";
import Episode from "./models/Episode";
import User from "./models/User";
import { auth } from "./auth";

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
  },
  Mutation:{
    createSerie: async (_,{input}) => {
      console.log(input)
      const payload = new Serie(input)
      const res =  await payload.save()
      if(res){
        return { success: true, errors: [{path:'Create Serie',message: 'Serie Created Successfuly'}]}
      }else{
        return { success: false, errors: [{path:'Create Serie',message: 'EError Creating Serie'}]}
      }
    },
    createEpisode: async (_,{input}) => {
      const payload = new Episode(input)
      return await payload.save()
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