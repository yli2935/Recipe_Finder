import React from 'react'
import useFetchData from '../hooks/useFetchData'
import { useState } from 'react'

const Home = () => {
    const [shouldFetch, setShouldFetch] = useState(false);




  return (
    <div className='bg-slate-100 rounded-xl p-4'>

        <button >Fetch</button>
    </div>

  )
}

export default Home
