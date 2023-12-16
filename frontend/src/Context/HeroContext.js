import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../url";

const HeroContext = createContext();
const HeroContextProvider = ({children}) => {

    const [hero,setHero] = useState(null);
    const [education,setEducation] = useState(null); 
    const [experiences,setExperiences] = useState(null); 
    const [projects,setProjects] = useState(null);
    const [projectList ,setProjectList] = useState(null);
    const [certifications,setCertifications] = useState(null);

     

    useEffect(() => 
    {
        getHero();
        getEducation();
        getExperience();
        getProject();
        getCertifications();
    },[])

    const getHero = async () =>{
        try {
            await axios.get(`${BASE_URL}/users/hero`)
            .then((res) =>{
                setHero(res.data);
            })
        } catch (error) {
            setHero(null);
            console.log(error.response.data);
        }
    }

    const getEducation = async () => {
        try {
            await axios.get(`${BASE_URL}/education/getAll`)
            .then((res) => {
                const data = res.data;
                if(data){
                    setEducation(data)
                }
            })
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const getExperience = async () => {
        try {
            await axios.get(`${BASE_URL}/experience/getAllSorted`)
            .then((res) => {
                const data = res.data;
                if(data){
                    setExperiences(data)
                }
            })
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const getCertifications = async () => {
        try {
            await axios.get(`${BASE_URL}/certifications/getAllSorted`)
            .then((res) => {
                const data = res.data;
                if(data){
                    setCertifications(data)
                }
            })
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const getProject = async () => {
        try {
            await axios.get(`${BASE_URL}/projects/getAllSorted`)
            .then((res) => {
                const data = res.data;
                if(data){
                    setProjects(data)
                    setProjectList(data)
                }else{
                    setProjects([]);
                    setProjectList([]);
                }
            })
        } catch (error) {
            console.log(error.response.data)
        }
    }

    
    return <HeroContext.Provider value={{hero,education,experiences,projects,projectList,certifications,setProjectList}}>
        {children}
    </HeroContext.Provider>
}

export {HeroContext,HeroContextProvider}