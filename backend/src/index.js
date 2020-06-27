import 'regenerator-runtime/runtime'
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
    msg: "Oh you checky wanker..."
  })
})
var corsOptions = {
  origin: 'https://hentaini.com',
  methods: 'POST, PUT, OPTIONS, DELETE, GET',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.use('/graphql',
graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
graphqlHTTP({
  graphiql:true,
  schema: schema,
  context: SECRET
}))
app.use(express.static('cdn'));

app.listen(4000, () =>{
  console.log('Server on port 4000');
})