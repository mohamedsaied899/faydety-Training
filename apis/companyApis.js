import * as axios from 'axios';
import { getItem } from '../services/local-storage.service';

export const getCompanies = async () => {
    const result = await axios.get('https://microserver.faydety.dev/api/v1/companies',
    {headers:{lang:'en', authorization: `Bearer ${getItem('token')}`}}
    )
    return result.data.data.data
}

// Api for add company
export const createCompanies = async (body) => {
    try {
        return await axios.post(`https://microserver.faydety.dev/api/v1/companies`,
        body,
        {headers:{lang:'en', authorization: `Bearer ${getItem('token')}`}}
        )
    }catch(err){
        return err.response.data
    }

}