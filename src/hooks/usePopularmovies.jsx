import React from 'react'
import { options,  popularmv} from '@/utils/Constant'
import {  addpopular } from '@/utils/MovieSlice'
import  { useEffect } from 'react'
import { useDispatch ,useSelector} from 'react-redux'

function usepopularmovies() {
    const dispatch =useDispatch()

    const popular =useSelector((store)=>store.movies.popular)
    const popularmovies = async () =>{
       const data =await fetch(popularmv,options)
       const result = await data.json()
     
       dispatch(addpopular(result.results))
       
    }
  
  
    useEffect(()=>{
     !popular && popularmovies()
    },[])
}

export default usepopularmovies
