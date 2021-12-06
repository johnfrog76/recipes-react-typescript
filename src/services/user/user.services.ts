import axios from 'axios';
import { iUser } from '../../interfaces/user/user.interface';

type iPost = {
    email: string;
    password: string;
}

const baseURL = process.env.REACT_APP_BASEURL;
const endpoint = process.env.REACT_APP_USER_LOGIN;

export const logInUser = async ({email, password}: iPost) => {

    try {
        const resp = await axios.post<iUser>(`${baseURL}${endpoint}`, {email, password});
        return resp.data;
    } catch (err) {
        throw(err)
    }
}