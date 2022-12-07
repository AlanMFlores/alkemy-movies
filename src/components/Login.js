import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate, Navigate } from 'react-router-dom';

const Login = () => {

  const history = useNavigate();

  const MySwal = withReactContent(Swal);

  const submitHandler = (e) => {
    e.preventDefault()
    const email = e.target.email.value;
    const password = e.target.password.value;

    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(email === '' || password === '') {
      new MySwal({
        icon: 'warning',
        title: 'Error',
        text: 'Los campos no pueden estar vacíos',
        confirmButtonColor: '#059669'
      })
      return;
    }

    if(email !== '' && !regexEmail.test(email)) {
      new MySwal({
        icon: 'warning',
        title: 'Error',
        text: 'Debe escribir una dirección de correo electrónico válida',
        confirmButtonColor: '#059669'
      })
      return;
    }

    if(email !== 'challenge@alkemy.org' || password !== 'react') {
      new MySwal({
        icon: 'error',
        title: 'Error',
        text: 'Credenciales inválidas',
        confirmButtonColor: '#059669'
      })
      return;
    }

    new MySwal({
      icon: 'success',
      title: 'Éxito!',
      text: 'Ingresaste correctamente',
      confirmButtonColor: '#059669'
    })

    axios.post('http://challenge-react.alkemy.org', {email, password})
    .then( res => {
      const token = res.data.token;
      sessionStorage.setItem('token', token);
      history('/home')
    })
  }

  let token = sessionStorage.getItem('token')

  return (
    <>
      {
        token && <Navigate replace to='/home'/>
      }
      <div>
        <h1 className='text-center m-8 text-2xl'>The Movie Database</h1>
        <form className='flex flex-col justify-center items-center max-w-sm mb-8' onSubmit={submitHandler}>
            <label className='w-full'>
              <span className='font-bold block mb-1'>Correo Electrónico</span>
              <input type='email' name='email' className='bg-gray-200 w-full p-2'/>
            </label>
            <label className='w-full mb-4'>
              <span className='font-bold block mb-1'>Contraseña</span> 
              <input type='password' name='password' className='bg-gray-200 w-full p-2'/>
            </label>
            <button type='submit' className='bg-sky-400 hover:bg-sky-600 ease-in duration-300 text-white p-2 w-full'>Ingresar</button>
        </form>
      </div>
    </>
  )
}

export default Login