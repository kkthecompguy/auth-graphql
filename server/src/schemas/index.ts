import { GraphQLSchema, GraphQLSchemaConfig } from 'graphql';
import { RootMutationType } from './mutation';
import { RootQueryType } from './queries';


const config: GraphQLSchemaConfig = {
  query: RootQueryType,
  mutation: RootMutationType
}

export default new GraphQLSchema(config);