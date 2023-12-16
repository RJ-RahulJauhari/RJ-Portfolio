import { createContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import { BASE_URL } from "../url";
import axios from "axios";

const UserContext = createContext();
const UserContextProvider = ({children}) => {

    const [user,setUser] = useState(null); 
    const navigate = useNavigate();
     

    useEffect(() => {getUser()},[])
    const getUser = async () =>{
        try {
            const res = await axios.get(BASE_URL+'/auth/refetch',{withCredentials:true})
            console.log(res.data)
            setUser(res.data);
        } catch (error) {
            setUser(null);
            navigate('/login');
            console.log(error);
        }
    }
    
    return <UserContext.Provider value={{user,setUser,getUser}}>
        {children}
    </UserContext.Provider>
}

export {UserContext,UserContextProvider}