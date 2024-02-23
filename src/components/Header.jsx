import React from 'react'
import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom'

export default function Header() {
  return (
    <header className='bg-slate-400 shadow-md'>
    <div className='flex justify-between items-center max-w-7xl mx-auto p-3 '>
    <Link to={'/'}>
    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
        <span className='text-slate-600'>Findur</span>
        <span className='text-slate-800'>Estate</span>
    </h1>
    </Link>
    <form className='bg-slate-300 flex justify-between p-2 rounded-lg  sm:w-64'>
      <input type='text' placeholder='search...' className='bg-transparent focus:outline-none'/>
      <FaSearch></FaSearch>
    </form>
    <ul className='flex gap-4'>
      <Link to={'/'}>
      <li className='hidden sm:inline'>Home</li>
      </Link>
      <Link to={'/sign-up'}>
      <li className='hidden sm:inline'>Sign Up</li>
      </Link>
      <Link className='focus:hover:underline' to={'/sign-in'}>
      <li>Sign In</li>
      </Link>

    </ul>
    </div>
    </header>
    
  )
}