import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from "./schema";
import cors from "cors";
import { graphqlUploadExpress } from 'graphql-upload';
import { connect } from "./database"
const SECRET = "theheaveniscolorHENTAI"
const app = express();
connect();
app.get('/', (req,res) => {
  res.json({
    msg: "Hello bro"
  })
})

app.use(cors())
app.use('/graphql',
graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
graphqlHTTP({
  graphiql:true,
  schema: schema,
  context:
    SECRET,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type' : 'application/*'
    }
}))

app.listen(4000, () =>{
  console.log('Server on port 4000');
})