import UserModel from '../models/users.models';
import cloudinary from '../utils/cloudinary.config';

interface IUser {
  _id: string,
  name: string,
  email: string,
  phone: string,
  bio?: string,
  photo?: string,
  lastLogin?: Date,
  createdAt: Date,
  updateAt: Date
}

interface UserRequest {
  name: string,
  email: string,
  phone: string,
  password: string,
  bio?: string,
  photo?: string,
}

interface UserUpdateRequest {
  name?: string,
  email?: string,
  phone?: string,
  bio?: string,
  photo?: string,
  password?: string
}

interface LoginRequest {
  password: string,
  email: string,
}

interface LoginResponse {
  success: boolean,
  code: number,
  message: string,
  accessToken?: string,
  tokenType?: string,
  user?: IUser
}

type CustomResponse = {
  success: boolean,
  code: number,
  message: string
}

type UploadRequest = {
  userId: string,
  base64EncodedImage: string
}


async function listUsers(): Promise<Array<IUser>> {
  return await UserModel.find({}).sort({'createdAt': -1});
};


async function getUser(userId:string): Promise<IUser|null> {
  return await UserModel.findOne({_id: userId});
};


async function createUser(user:UserRequest): Promise<IUser> {
  return await UserModel.create(user);
}

async function updateUser(userId: string, user:UserUpdateRequest): Promise<IUser|null> {
  const userObj = await UserModel.findOne({_id: userId});
  let password: string;
  if (user.password?.trim() !== "") {
    password = await userObj.hash(user.password);
    console.log(password);
    return await UserModel.findOneAndUpdate({_id: userId}, {...user, password: password});
  } else {
    delete user.password;
    return await UserModel.findOneAndUpdate({_id: userId}, {name: user.name, email: user.email, bio: user.bio, phone: user.phone});
  }
}

async function deleteUser(userId: string): Promise<CustomResponse> {
  const user = await UserModel.findOneAndDelete({_id: userId});
  if (user) {
    return { success: true, code: 200, message: 'user deleted successfully' }
  } else {
    return { success: false, code: 404, message: 'user does not exist' }
  }
}

async function login(loginRequest: LoginRequest): Promise<LoginResponse> {
  try {
    const user = await UserModel.findOne({email: loginRequest.email});
    if (!user) return { success: false, code: 403, message: 'invalid credentials' };
    const isMatch = await user.comparePass(loginRequest.password);
    if (!isMatch) return {success: false, code: 403, message: 'invalid credentials'};
    const jwt = await user.getJWT();
    user.lastLogin = Date.now();
    await user.save()
    return {success: true, code: 200, message: 'successful login', accessToken: jwt, tokenType: 'Bearer', user: user }
  } catch (error) {
    return {success: false, code: 500, message: 'internal server error'}
  }
}


async function uploadAvatar(request: UploadRequest): Promise<CustomResponse> {
  try {
    const user = await UserModel.findOne({_id: request.userId});
    console.log(user)
    const result = await cloudinary.v2.uploader.upload(request.base64EncodedImage);
    user.photo = result.secure_url;
    await user.save();
    return {success: true, code: 200, message: 'avatar uploaded successfully'}
  } catch (error) {
    console.log(error)
    return {success: false, code: 500, message: 'internal server error'}
  }
}

export default {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  login,
  uploadAvatar
}