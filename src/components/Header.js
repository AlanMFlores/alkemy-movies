import React from 'react'
import { Link } from 'react-router-dom'
import Searcher from './Searcher'
import alkemyLogo from '../images/alkemy-logo.svg'

const Header = () => {
  return (
    <header className='flex pr-16 pl-16 p-6 bg-slate-100 w-full justify-between'>
        <Link to={'/home'}>
            <img src={alkemyLogo} alt='header logo'/>
        </Link>
        <nav className='hidden lg:flex items-center gap-4'>
            <ul className='flex text-slate-900 gap-4'>
                <li>
                    <Link to={'/home'}>Home</Link>
                </li>
                <li>
                    <Link to={'/movies'}>Películas</Link>
                </li>
                <li>
                    <Link to={'/tv'}>TV Shows</Link>
                </li>
                <li>
                    <Link to={'/releases'}>Estrenos</Link>
                </li>
                <li>
                    <Link to={'/favorites'}>Favoritos</Link>
                </li>
            </ul>
            <Searcher/>
        </nav>
    </header>
  )
}

export default Header