import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from "./schema";
import cors from "cors";
import {connect} from "./database"
const SECRET = "theheaveniscolorHENTAI"
const app = express();
connect();
app.get('/', (req,res) => {
  res.json({
    msg: "Hello bro"
  })
})

app.use(cors())
app.use('/graphql',graphqlHTTP({
  graphiql:true,
  schema: schema,
  context:
    SECRET,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
}))

app.listen(4000, () =>{
  console.log('Server on port 4000');
})