import * as axios from 'axios';
import { getItem } from '../services/local-storage.service';

export const getLeads = async () => {
    const result = await axios.get('https://microserver.faydety.dev/api/v1/leads',
    {headers:{lang:'en', authorization: `Bearer ${getItem('token')}`}}
    )
    return result.data.data.data
}