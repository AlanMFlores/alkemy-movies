import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Ring } from '@uiball/loaders'


const MovieDetails = () => {
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);

    let { movieId } = useParams();

    useEffect(() => {

        const endPoint = `https://api.themoviedb.org/3/movie/${movieId}?api_key=5891f0824a46470ad64bb3e67a7e8289&language=en-US`
        axios.get(endPoint)
            .then(response => {
                const movieData = response.data
                setMovie(movieData);
            })
    }, [])

    useEffect(()=> {
        const endPoint = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=5891f0824a46470ad64bb3e67a7e8289&language=en-US`;
        axios.get(endPoint)
            .then(response => {
                const castData = response.data.cast;
                const mainCast = castData.slice(0, 10)
                setCast(mainCast);
            }) 
    }, [setCast])


  return (
    <div className="mb-16">
        { !movie && <Ring 
                    size={40}
                    lineWeight={5}
                    speed={2} 
                    color="black"
                    />}

        {
            movie && 
            <div className='pr-16 pl-16'>
                <h1 className='mb-4 mt-8 text-2xl font-medium'>Detalles</h1>
                <div className='grid grid-cols-1 lg:grid-cols-3 lg:gap-16 mt-8'>
                    <div className='columns-full'>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className='mt-0 mb-0 ml-auto mr-auto'/>
                    </div>
                    <div className='overflow-hidden col-span-2'>
                        <h2 className='mb-4 mt-4 text-2xl font-medium'>{movie.title}</h2>
                        <p className='mb-2 italic'>Fecha de Estreno: {movie.release_date}</p>
                        <h4 className='font-medium mb-1 text-lg'>Rese??a:</h4>
                        <p className='font-extralight mb-4'>{movie.overview}</p>
                        <h4 className='mb-4 text-lg font-medium'>Rating: <span className='text-amber-400 font-medium'>{movie.vote_average}</span></h4>
                        <h4 className='font-medium mb-4 text-lg'>
                            G??neros: 
                            {
                                movie.genres.map(genre => (
                                    <span key={genre.id} className='ml-2 text-base text-sky-400'>{genre.name}</span>
                                ))    
                            }
                        </h4>
                        <div className='overflow-x-auto'>
                            <h4 className='font-medium mb-1 text-lg'>Reparto:</h4>
                            <div className='flex gap-4'>
                                {
                                    cast.map(c => (
                                        <div key={c.order}> 
                                            <p className='overflow-hidden text-ellipsis whitespace-nowrap w-32'>{c.name}</p>
                                            <figure className='w-24'>
                                                <img src={`https://image.tmdb.org/t/p/original${c.profile_path}`} alt={c.name} className='object-cover w-full mt-0 mb-0 ml-auto mr-auto'/>
                                            </figure>
                                            <p className='font-medium'>{c.character}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default MovieDetails