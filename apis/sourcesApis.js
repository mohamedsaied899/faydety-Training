import * as axios from 'axios';
import { getItem } from '../services/local-storage.service';

export const getSources = async () => {
    const result = await axios.get('https://microserver.faydety.dev/api/v1/sources',
    {headers:{lang:'en', authorization: `Bearer ${getItem('token')}`}}
    )
    return result.data.data
}

// Api for add sourcs
export const createSource = async (body) => {
    try{
        return await axios.post('https://microserver.faydety.dev/api/v1/sources',
        body,
        {headers:{lang:'en', authorization: `Bearer ${getItem('token')}`}}
        )
    }catch(err){
        return err.response.data
    }
}