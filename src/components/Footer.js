import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-sky-100 text-slate-900 text-center p-6 w-full absolute bottom-0 mt-80'>
        <ul className='flex justify-center gap-4'>
            <li>
                <span>Instagram</span>
            </li>
            <li>
                <span>Facebook</span>
            </li>
            <li>
                <span>Twitter</span>
            </li>
        </ul>

        <small>Copyright Alkemy</small>
    </footer>
  )
}

export default Footer