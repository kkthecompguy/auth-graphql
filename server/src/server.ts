import express, { Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import schema from './schemas';
import cors from 'cors';
import path from 'path';

dotenv.config();


// initialize server config
interface serverConfig {
  init: () => void,
  connect: () => void
}


const app: express.Application = express();
const port: string|number = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }))
app.use(express.static('../../client/build'))

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', '..', 'client', 'build', 'index.html'));
});

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

