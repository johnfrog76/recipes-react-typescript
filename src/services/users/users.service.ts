import axios from 'axios';
import { iUser } from '../../interfaces/user/user.interface';
import {iUserItem} from '../../interfaces/users/users.interface'


const baseURL = process.env.REACT_APP_BASEURL;
const endpoint = process.env.REACT_APP_USERS_ENDPOINT;
const deleteUserEndpoint = process.env.REACT_APP_USER_DELETE;

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

export const deleteUserAccount = async (user: iUser) => {

    try {
        const resp = await axios({
            method: 'delete',
            url: `${baseURL}${deleteUserEndpoint}/${user.userId}`,
            headers: {
                Authorization: `Bearer ${user.token ? user.token : 'none'}`
            }
        })
    } catch (err) {
        throw(err);
    }
}
