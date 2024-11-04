import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({phoneNumber: '', password: ''});
  const [error, setError] = useState({status: false, message: ''});
  const [submit, setSubmit] = useState(false);

  const inputChange = (event) => {
    setInputs(values => ({...values, [event.target.name]: event.target.value}))
  }

  const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(inputs.phoneNumber != '' && inputs.password != ''){
      setSubmit(true)
      axios.post('https://52.53.242.81:7088/japan/edu/api/auth/login', inputs, config).then(response => {
        if(response.data.status){
          localStorage.setItem('token', response.data.token)
          navigate('/');
        }else{
          setError({status: true, message: response.data.message})
        }
        setSubmit(false)
      })
      .catch(error => {
        console.error(error);
      });
    }else{
      setError({status: true, message: "Maydonlarni to'ldiring!"})
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h3 className="text-center mb-4">Login</h3>
          {error.status ?
          <div className="alert alert-danger" role="alert">
            {error.message}
          </div>
          : ''}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="phone">Telefon raqam</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phoneNumber"
                placeholder="Telefon raqamni kiriting"
                value={inputs.phone}
                onChange={inputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Parol</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Parolni kiriting"
                value={inputs.password}
                onChange={inputChange}
              />
            </div>
            <button type="submit" className={submit ? 'btn btn-primary btn-block mt-3 disabled' : 'btn btn-primary btn-block mt-3'}>
            {submit ?
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>  
            : ''}
              Kirish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
