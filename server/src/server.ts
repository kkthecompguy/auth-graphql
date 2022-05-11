import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import schema from './schemas';
import cors from 'cors';

dotenv.config();


// initialize server config
interface serverConfig {
  init: () => void,
  connect: () => void
}


const app: express.Application = express();
const port: string|number = process.env.PORT || 3001;

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));


const server: serverConfig = {
  connect: async function() {
    try {
      let mongouri: string = process.env.MONGO_URI || '';
      await mongoose.connect(mongouri);
      console.log('mongodb connected successfully');
    } catch (error) {
      console.log('connection failed');
    }
  },
  init: function() {
    app.listen(port, () => {
      console.log(`server running on http://localhost:${port}`);
    });
  }
};

server.connect();
server.init();

