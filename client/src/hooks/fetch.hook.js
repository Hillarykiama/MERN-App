import axios from "axios";
import {useEffect, useState} from "react";
import { getUsername } from "../helper/helper";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/** custom hook */

export default function useFetch(querry){
 const [getData, setData] = useState({ isLoading : false, apiData: undefined, status: null, serverError: null})


 useEffect(() =>{

    const FetchData = async () => {
        try {
        setData(prev => ({...prev, isLoading: true }));
        const { username } = !querry ? await getUsername() : '';
        getUsername();
        const { data,status } = !querry ? await axios.get('api/user/${username}') : await axios.get(`/api/${querry}`);
        if(status === 201){
            setData(prev => ({...prev, isLoading: false }));
            setData(prev => ({...prev, apiData: data, status: status }));
        }
        setData(prev => ({...prev, isLoading: false }));
        } catch (error) {
            setData(prev => ({...prev, isLoading: false, serverError: error }))   
        }
    };
    FetchData()
 }, [querry]);

 return [getData, setData];
}