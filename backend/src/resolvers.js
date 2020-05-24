import Serie from "./models/Serie";
import Episode from "./models/Episode";

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
      const payload = new Serie(input)
      return await payload.save()
    },
    createEpisode: async (_,{input}) => {
      const payload = new Episode(input)
      return await payload.save()
    }
  },
  Episode: {
    serie: ({serie_id}) => {
      return Serie.findOne({_id: serie_id})
    }
  },
  Serie: {
    episodes: ({_id}) => {
      const ep = Episode.find({serie_id: _id})
      console.log(ep)
      return ep
    }
  }
}