import React from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Searcher = () => {
    const history = useNavigate()
    const MySwal = withReactContent(Swal);

    const submitHandler = (e) => {
        e.preventDefault()
        const keyword = e.currentTarget.keyword.value.trim().toLowerCase();

        if(keyword.length === 0) {
            new MySwal({
                icon: 'warning',
                text: 'Tienes que escribir una palabra clave'
            })
        } else {
            e.currentTarget.keyword.value = ''
            history(`/results/${keyword}`)
        }

    }

  return (
    <form className='flex gap-2' onSubmit={submitHandler}>
        <input type='text' name='keyword' placeholder='Escribe una palabra clave...' className='p-2'/>
        <button type='submit' className='text-white p-2 w-20 bg-sky-400'>Buscar</button>
    </form>
  )
}

export default Searcher