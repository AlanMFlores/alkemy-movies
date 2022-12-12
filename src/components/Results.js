import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import MovieCard from './MovieCard';

const Results = () => {

  let { resultQuery } = useParams();

  const [moviesResults, setMoviesResults] = useState([]);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=5891f0824a46470ad64bb3e67a7e8289&query=${resultQuery}`;

    axios.get(endPoint)
        .then(response => {
            const movieArray = response.data.results;
            setMoviesResults(movieArray)
        })
  }, [resultQuery])

  return (
    <div>
        <h1 className='mb-4 mt-8 text-2xl font-medium'>Resultados de la Búsqueda</h1>
        <div className='grid grid-container gap-4 mb-8'>
            {
                moviesResults.length === 0 && 
                <h3>No se encontraron resultados.</h3>
            }
            {
                moviesResults.map(movie => (
                <MovieCard movie={movie} key={movie.id}/>
                ))
            }
        </div>
    </div>
  )

}

export default Results