import React from 'react'
import { options,  topratedmv} from '@/utils/Constant'
import {  addtoprated } from '@/utils/MovieSlice'
import  { useEffect } from 'react'
import { useDispatch ,useSelector} from 'react-redux'

function usetopratedmovies() {
    const dispatch =useDispatch()
    const toprated =useSelector((store)=>store.movies.toprated)

    const topratedmovies = async () =>{
       const data =await fetch(topratedmv,options)
       const result = await data.json()
     
       dispatch(addtoprated(result.results))
       
    }
  
  
    useEffect(()=>{
     !toprated && topratedmovies()
    },[])
}

export default usetopratedmovies
