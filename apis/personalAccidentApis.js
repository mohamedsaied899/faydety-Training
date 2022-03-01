import * as axios from 'axios';
import { getItem } from '../services/local-storage.service';

export const getPersonalAccident = async () => {
    const result = await axios.get('https://development-backend.faydety.dev/api/v1/insurance/personalAccidents/filterPersonalAccidents?page=1&perPage=3&coverageAmount=75000&orderKey=r1NNdGv',
    {headers:{lang:'en', authorization: `Bearer ${getItem('token')}`}}
    )
    return result.data
}