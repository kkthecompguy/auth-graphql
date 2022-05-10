import express from 'express';
import expressGraphql from 'express-graphql';
import { GraphQLSchema } from 'graphql';
import dotenv from 'dotenv';

dotenv.config();


// initialize server config
interface serverConfig {
  init: () => void,
  connect: () => void
}


const app: express.Application = express();
const port: string|number = process.env.PORT || 3001;


const server: serverConfig = {
  connect: async function() {
    try {
      console.log('mongodb connected successfully')
    } catch (error) {
      console.log('connection failed')
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

