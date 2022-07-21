import axios from 'axios';

import { iRecipeCategory } from '../../interfaces/category/category.interface';

const baseURL = process.env.REACT_APP_BASEURL;
const endpoint = process.env.REACT_APP_CATEGORY_ENDPOINT;

export const getCategories = async () => {
    try {
        const resp = await axios.get<iRecipeCategory[]>(`${baseURL}${endpoint}`);
        return resp.data;
    } catch (err) {
        throw(err);
    }
};