import { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import usersServices from '../services/users.services';
import { UserType } from './types.definitions';

export const RootQueryType = new GraphQLObjectType({
  name: "RootQuery",
  description: "Root Query Endpoint (Read)",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      description: "List of All Users",
      resolve: async () => await usersServices.listUsers()
    },
    user: {
      type: UserType,
      description: 'Detail of User',
      args: {
        userId: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, args) => await usersServices.getUser(args.userId)
    }
  })
})