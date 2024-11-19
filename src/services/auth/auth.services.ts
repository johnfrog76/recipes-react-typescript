import axios from "axios";
import { iUser } from "../../interfaces/user/user.interface";

type iPost = {
  email: string;
  password: string;
};

type iSignUp = {
  name: string;
  password: string;
  email: string;
};

const baseURL = process.env.REACT_APP_BASEURL;
const endpoint = process.env.REACT_APP_USER_LOGIN;
const signupEndpoint = process.env.REACT_APP_USER_SIGNIN;

export const logInUser = async ({ email, password }: iPost) => {
  try {
    const resp = await axios.post<iUser>(`${baseURL}${endpoint}`, {
      email,
      password,
    });
    return resp.data;
  } catch (err) {
    throw err;
  }
};

export const signUpUser = async ({ name, email, password }: iSignUp) => {
  try {
    const resp = await axios.post<iUser>(`${baseURL}${signupEndpoint}`, {
      email,
      password,
      name,
    });
    return resp.data;
  } catch (err) {
    throw err;
  }
};
