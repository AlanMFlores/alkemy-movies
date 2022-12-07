import React from 'react'
import { Link } from 'react-router-dom'
import emptyHeart from '../images/empty-heart.svg'

const MovieCard = ( {movie} ) => {

  return (
    <div className='relative flex flex-col card bg-slate-100 p-4 w-72'>
        <h3 className='text-md font-medium mb-2 text-ellipsis overflow-hidden whitespace-nowrap'>{movie.title}</h3>
        <figure className='object-cover h-96 mb-4'>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className='mb-2 w-full h-full'/>
        </figure>
        <button >
          <img src={emptyHeart} alt='empty heart' className='w-6 absolute top-16 right-8 drop-shadow-sm'/>
        </button>
        <p className='mb-4 h-16 text-ellipsis'>{movie.overview.substring(0, 90)}...</p>
        <Link to={`/movie-details/${movie.id}`} className='block bg-sky-400 hover:bg-sky-600 ease-in duration-300 p-2 text-white text-center justify-end'>Ver Detalles</Link>
    </div>
  )
}

export default MovieCard 