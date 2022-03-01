import * as axios from 'axios';
import { getItem } from '../services/local-storage.service';

export const getHistoryLead = async (leadId) => {
    const result = await axios.get(`https://microserver.faydety.dev/api/v1/leadHistories/filter/${leadId}`,
        { headers: { lang: 'en', authorization: `Bearer ${getItem('token')}` } }
    )
    return result.data.data.data
}