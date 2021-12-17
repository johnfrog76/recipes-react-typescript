import axios from 'axios';
import {iUserItem} from '../../interfaces/users/users.interface'


const baseURL = process.env.REACT_APP_BASEURL;
const endpoint = process.env.REACT_APP_USERS_ENDPOINT;


interface iGetUsersResp  {
    users: iUserItem[];
}


export const getUsers = async () => {
    try {

        const resp = await axios.get(`${baseURL}${endpoint}`);
        return resp.data
    } catch (err) {
        throw(err)
    }
}