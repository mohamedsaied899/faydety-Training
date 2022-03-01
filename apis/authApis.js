import * as axios from 'axios'
import { getItem} from '../services/local-storage.service'

// Api for Login
export const login = async (email, password) => {
    try{
        const result = await axios.post('https://microserver.faydety.dev/api/v1/adminAuth/login', {email,password},
        {headers:{lang:'en'}}
    )
    return {result,status:true}
    }catch(err){
        console.log('error from catch', err.response.data.errors)
    return {status:false,errors: err.response.data.errors}
    }
}

// Api for verifyOtp
export const verifyOtp = async (email, otp) => {
    try{
        const result = await axios.post('https://microserver.faydety.dev/api/v1/adminAuth/verifyOtp', {email, otp},
        {headers:{lang:'en'}}
    )
    return {result, status:true}
    }catch(err){
        console.log('error from catch', err.response.data.errors)
        return {status:false,errors: err.response.data.errors}
    }
}

// Api for logout
export const logout = async ()=>{
    const result = await axios.delete('https://microserver.faydety.dev/api/v1/adminAuth/logout',
    {headers:{lang:'en', authorization: `Bearer ${getItem('token')}`}}
    )
    return result
}