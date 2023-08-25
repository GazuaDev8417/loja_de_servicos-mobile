import React, { createContext, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { url } from '../constants/urls'




export interface Job{
  id:string
  title:string
  description:string
  phone:number
  period:string
  provider:string
}

interface User{
  id:string
  name:string
  email:string
  password:string
  subscription:string
}

interface GlobaStateProps{
  children:React.ReactNode
}

interface GlobalStateContext{
  getAllJobs: ()=> void
  jobs:Job[]
  job:Job | undefined
  setJob:React.Dispatch<React.SetStateAction<Job | undefined>>
  user:User | undefined
  getProfile: ()=> void
}

const defaultContextValue:GlobalStateContext = {
  getAllJobs: ()=> {},
  jobs:[],
  job:undefined,
  setJob: ()=>{},
  user:undefined,
  getProfile: ()=> {}
}

const Context = createContext<GlobalStateContext>(defaultContextValue)


export const Provider = (props:GlobaStateProps)=>{
  const [jobs, setJobs] = useState<Job[]>([])
  const [job, setJob] = useState<Job | undefined>()
  const [user, setUser] = useState<User | undefined>()
  

  

  const getAllJobs = async()=>{
    axios.get(`${url}/jobs`, {
      headers: {
        Authorization: await AsyncStorage.getItem('id')
      }
    }).then(res=>{
      setJobs(res.data)
    }).catch(err=>{
      alert('erro na função getAlljobs: '+err.response.data)
    })
  }

  const getProfile = async()=>{
    axios.get(`${url}/user`, {
        headers: {
            Authorization: await AsyncStorage.getItem('id')
        }
    }).then(res=>{
        setUser(res.data)
    }).catch(e=>{
        alert(e.response.data)
    })
  }

  


    
  return<Context.Provider value={{
    getAllJobs,
    jobs,
    job,
    setJob,
    user,
    getProfile,
  }}>
          { props.children }
        </Context.Provider>
}

export default Context
