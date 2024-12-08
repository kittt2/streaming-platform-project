import React from 'react'
import { options, upcomingmv } from '@/utils/Constant'
import { addupcoming } from '@/utils/MovieSlice'
import  { useEffect } from 'react'
import { useDispatch ,useSelector} from 'react-redux'

function useupcomingmovies() {
    const dispatch =useDispatch()
    const upcoming =useSelector((store)=>store.movies.upcoming)

    const upcomingmovies = async () =>{
       const data =await fetch(upcomingmv,options)
       const result = await data.json()
     
       dispatch(addupcoming(result.results))
       
    }
  
  
    useEffect(()=>{
    !upcoming &&  upcomingmovies()
    },[])
}

export default useupcomingmovies
