import * as axios from 'axios';
import { getItem } from '../services/local-storage.service';

export const getProducts = async () => {
    const result = await axios.get('https://microserver.faydety.dev/api/v1/products',
    {headers:{lang:'en', authorization: `Bearer ${getItem('token')}`}}
    )
    return result.data.data
}

// Api for add product
export const createProduct = async (body) => {
    try{
        return await axios.post('https://microserver.faydety.dev/api/v1/products',
        body,
        {headers:{lang:'en', authorization: `Bearer ${getItem('token')}`}}
        )
    }catch(err){
        return err.response.data
    }
}