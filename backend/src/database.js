import mongoose from "mongoose";



export async function connect(){
  try {
      await mongoose.connect(',mongodb://localhost/mongodbgraphql',{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
  console.log('>>> DB IS ONLINE');
  } catch (e) {
    console.log('Something goes wrong!')
    console.log (e)
  }
}