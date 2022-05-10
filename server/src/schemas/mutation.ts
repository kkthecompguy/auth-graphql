import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import usersServices from '../services/users.services';
import { CustomResponseType, LoginResponseType, UserType } from './types.definitions';


export const RootMutationType = new GraphQLObjectType({
  name: "RootMutation",
  description: "Root Mutation Endpoint (Create, Update, Delete)",
  fields: () => ({
    createUser: {
      type: UserType,
      description: 'create new user',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        bio: { type: GraphQLString },
        photo: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        return await usersServices.createUser({name: args.name, email: args.email, phone: args.phone, password: args.password, bio: args.bio, photo: args.photo})
      }
    },
    updateUser: {
      type: UserType,
      description: 'update user',
      args: {
        userId: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        password: { type: GraphQLString },
        bio: { type: GraphQLString },
        photo: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        return await usersServices.updateUser(args.userId, {name: args.name, email: args.email, phone: args.phone, bio: args.bio, photo: args.photo})
      }
    },
    deleteUser: {
      type: CustomResponseType,
      description: 'delete user',
      args: {
        userId: { type: GraphQLString }
      },
      resolve: async (_, args) => {
        const user = await usersServices.deleteUser(args.userId);
        if (user) {
          return { success: true, code: 200, message: 'user successfully deleted' }
        } else {
          return { success: false, code: 404, message: 'user does not exist' }
        }
      }
    },
    login: {
      type: LoginResponseType,
      description: 'login user',
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: async(_, args) => {
        return await usersServices.login({email: args.email, password: args.password});
      }
    },
    uploadAvatar: {
      type: CustomResponseType,
      description: 'upload user avatar',
      args: {
        userId: { type: GraphQLNonNull(GraphQLString) },
        base64EncodedImage: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, args) => {
        return await usersServices.uploadAvatar({userId: args.userId, base64EncodedImage: args.base64EncodedImage});
      }
    }
  })
});