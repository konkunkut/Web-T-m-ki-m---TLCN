import {API_URL} from '../config';
import axios from 'axios';

export const getAllPlaces=()=>{
    return axios.get(`${API_URL}/Places/getAllPlace`)
                .then(res=>{
                    // console.log("thành cÔng");
                    return res.data;
                })
                .catch(err=>{
                    console.log("Lỗi");
                })
}

export const getUserPlaces =(token) =>{

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }

    return axios.get(`${API_URL}/Places/getUserPlaces`, config)
                .then(res=>{
                    // console.log("thành công");
                    return res.data
                })
                .catch(err=>{
                    console.log("Lỗi");
                })
}

export const getDetailPlaces=(id_Place)=>{
    return axios.get()
                .then(res=>{
                    return res.data;
                })
                .catch(err=>{
                    console.log(err);
                })
}