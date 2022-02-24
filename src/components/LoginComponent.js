import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

export default function LoginComponent(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState(false)

    const handleSubmit = (e) => {
        console.log(email,password)
        e.preventDefault()
        axios.post('http://localhost:4000/login', {
            email: email,
            password: password
          })
          .then((res) => {
            document.cookie = "token=" + res.data.cookieData
            console.log(res, document.cookie)
            setSuccess(res.data.success)
            props.setLoggedIn(true)
          })
          .catch(error => {
            console.log(error);
          });
    }





    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePassChange = (e) => {
        setPassword(e.target.value)
    }


  return (
    <>
         <div className="container">
        <div className="row row-content mt-5">
          <div className="col-12 mt-5">
              <h2 className="mt-4">Login</h2>
              <hr />
          </div>
          <div className="col-md-10">
              <form onSubmit={handleSubmit}>
                  <div className="form-group row">
                      <label htmlFor="email" className="col-md-2 col-form-label">Email</label>
                      <div className="col-md-10">
                          <input type="email" className="form-control" value={email} onChange={handleEmailChange} id="email" name="email" placeholder="Email" />
                      </div>
                  </div>
                    <div className="form-group row">
                      <label htmlFor="password" className="col-md-2 col-form-label">Password</label>
                      <div className="col-md-10">
                          <input type="password" className="form-control" value={password} onChange={handlePassChange} id="password" name="password" placeholder="Password" />
                      </div>
                  </div>
                  <div className="form-group row">
                      <div className="offset-md-2 col-md-10">
                          <button type="submit" className="btn btn-primary">Login</button>
                      </div>
                  </div>
              </form>
              {success && <Redirect push to={{
                  pathname: '/home',
                  state: {message: "logged in"}
              }} />}
          </div>
     </div>
     </div>
     


    </>
  )
}
