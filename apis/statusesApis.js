import * as axios from 'axios';
import { getItem } from '../services/local-storage.service';

export const getStatuses = async () => {
    const result = await axios.get('https://microserver.faydety.dev/api/v1/status',
    {headers:{lang:'en', authorization: `Bearer ${getItem('token')}`}}
    )
    console.log(result.data)
    return result.data.data
}

// Api for add status
export const createStatus = async (body) => {
    try {
        return await axios.post(`https://microserver.faydety.dev/api/v1/status`,
        body,
        {headers:{lang:'en', authorization: `Bearer ${getItem('token')}`}}
        )
    }catch(err){
        return err.response.data
    }
}