import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'This represent the user object',
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    phone: { type: GraphQLNonNull(GraphQLString) },
    bio: { type: GraphQLString },
    photo: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export const CustomResponseType = new GraphQLObjectType({
  name: 'CustomResponse',
  description: 'This is custom server response',
  fields: () => ({
    success: { type: GraphQLBoolean },
    code: { type: GraphQLInt },
    message: { type: GraphQLString }
  })
});


export const LoginResponseType = new GraphQLObjectType({
  name: 'LoginResponse',
  description: 'This is custom server response',
  fields: () => ({
    success: { type: GraphQLBoolean },
    code: { type: GraphQLInt },
    message: { type: GraphQLString },
    accessToken: { type: GraphQLString },
    tokenType: { type: GraphQLString },
    user: { type: UserType }
  })
});