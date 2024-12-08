import useNowplayingmovies from '@/hooks/useNowplayingmovies'
import Maincontainer from './Maincontainer'
import { lazy } from 'react'
const Secondarycontainer =lazy(()=>import('./Secondarycontainer'))

import usepopularmovies from '@/hooks/usePopularmovies'
import usetopratedmovies from '@/hooks/useToprated'
import useupcomingmovies from '@/hooks/useUpcoming'
import { Suspense } from 'react'
import { SkeletonDemo } from './Skeletonui'

function Home() {
  
  useNowplayingmovies()
  usepopularmovies()
  usetopratedmovies()
  useupcomingmovies()

  return (
    <div className='h-full w-full'>
      <Maincontainer/>
      <Suspense fallback={<SkeletonDemo/>}>
      <Secondarycontainer/>
      </Suspense>
    </div>
  )
}

export default Home
