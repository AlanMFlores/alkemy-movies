import React from 'react'
import { Link } from 'react-router-dom'
import Searcher from './Searcher'
import alkemyLogo from '../images/alkemy-logo.svg'
import hambMenu from '../images/hamb-menu.svg'
import closeMenuIcon from '../images/close-menu.svg'
import { useState } from 'react'

const Header = () => {
    const [isActive, setIsActive] = useState(false)

    const showMenu = () => {
        setIsActive(true)
    }

    const closeMenu = () => {
        setIsActive(false)
    }

  return (
    <header className='flex pr-8 lg:pr-16 pl-8 lg:pl-16 p-6 bg-slate-100 w-full justify-between relative'>
        <Link to={'/'}>
            <img src={alkemyLogo} alt='header logo'/>
        </Link>
        <nav className={`flex flex-col items-center bg-slate-100 p-8 pb-16 gap-8 absolute z-10 left-0 right-0 close-menu ${isActive && 'translate-x-0'} lg:static lg:flex-row lg:translate-x-0 lg:pb-0 lg:p-0`}>
        <button className='absolute right-6 top-0 lg:hidden' onClick={closeMenu}>
            <img src={closeMenuIcon} alt='close-menu' className='w-6 left-0'/>
        </button>

            <ul className='flex flex-col items-center gap-8 text-slate-900 lg:flex-row'>
                <li>
                    <Link to={'/'}>Home</Link>
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
        <button className='lg:hidden' onClick={showMenu}>
            <img src={hambMenu} alt='hamb-menu'/>
        </button>
    </header>
  )
}

export default Header