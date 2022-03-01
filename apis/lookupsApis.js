import * as axios from 'axios';
import { getItem } from '../services/local-storage.service';

export const plans = async () => {
    const result = await axios.get('https://microserver.faydety.dev/api/v1/lookups/plans',
    {headers:{lang:'en', authorization: `Bearer ${getItem('token')}`}}
    )
    return result.data.data
}