/*
 * @Author: Li yli2935@uwo.ca
 * @Date: 2024-12-18 17:32:56
 * @LastEditors: Li
 * @LastEditTime: 2024-12-18 17:35:25
 * @FilePath: /Recipe_Finder/src/components/Header.tsx
 */
import React, { useEffect, useState } from 'react'
import logo from '../assets/react.svg'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
    const location = useLocation()
    const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ")
    const [searchInput,setSearchInput] = useState(removeSpace)
    const navigate = useNavigate()
   


    const handleSubmit = (e: { preventDefault: () => void })=>{
        e.preventDefault()
    }

  return (
    <header className='fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40'>
            <div className='container mx-auto px-3 flex items-center h-full'>
                <Link to={"/"}>
                    <img
                        src={logo}
                        alt='logo'
                        width={120} 
                    />
                </Link>



                <div className='ml-auto flex items-center gap-5'>
                    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
                        <input
                            type='text'
                            placeholder='Search here...'
                            className='bg-transparent px-4 py-1 outline-none border-none hidden lg:block'
                            onChange={(e)=>setSearchInput(e.target.value)}
                            value={searchInput}
                        />
                        <button className='text-2xl text-white'>
                                {/* <IoSearchOutline/> */}
                        </button>
                    </form>

                </div>
            </div>
    </header>
  )
}

export default Header