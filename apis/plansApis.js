import * as axios from 'axios';
import { getItem } from '../services/local-storage.service';

//Api for the plans
export const plans = async () => {
    const result = await axios.get('https://microserver.faydety.dev/api/v1/plans',
    {headers:{lang:'en', authorization: `Bearer ${getItem('token')}`}}
    )
    return result.data.data
}

// Api for add plan
export const createPlan = async (body) => {
   try{
    return await axios.post('https://microserver.faydety.dev/api/v1/plans',
    body,
    {headers:{lang:'en', authorization: `Bearer ${getItem('token')}`}}
    )
   }catch(err){
    return err.response.data
   }
}