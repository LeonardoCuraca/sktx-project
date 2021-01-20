import React, { useState } from 'react';
import './Login.css';

import { useForm } from 'react-hook-form';
import AuthService from '../../Services/AuthService';

function Login() {

  const [formState, setFormState] = useState(null);
  const [message, setMessage] = useState({});
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm({});

  const onSubmit = (data) => {
    setLoading(true);
    AuthService.signIn(data)
    .then(data => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.object));
        if (data.code === 200) {
            setMessage({'header': 'Registro Completado', 'content': 'Inicio de Sesión Exitoso.'})
            setFormState('success');
            window.location.reload();
        } else {
            if (data.msg) {
                setMessage({'header': 'Proceso Fallido', 'content': data.msg});
            } else {
                setMessage({'header': 'Registro Fallido', 'content': 'Se produjo un error al Iniciar Sesión.'});
            }
            setFormState('error');
        }
        setLoading(false);
    })
  }

  return (
    <div className="ui middle aligned center aligned grid" style={{height: '100vh'}}>
      <div className="login column">
        <h2 className="ui teal image header">
          <img src="https://semantic-ui.com/examples/assets/images/logo.png" alt="ddasd" className="image" />
          <div className="content">
            Log-in to your account
          </div>
        </h2>
        <form className={loading ? "ui loading large form" : "ui large form"} onSubmit={handleSubmit(onSubmit)}>
          <div className="ui stacked segment">
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon" />
                <input
                  type="text"
                  name="userEmail"
                  placeholder="E-mail address"
                  ref={
                    register({
                        required: {value: true, message: 'El campo Email es obligatorio'}
                    })
                  }>
                </input>
              </div>
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  ref={
                    register({
                        required: {value: true, message: 'La contraseña es obligatoria'}
                    })
                  }>
                </input>
              </div>
            </div>
            <button className="ui fluid large teal submit button" type="submit" style={{backgroundColor: '#18b3c0', color: 'white'}}>Login</button>
          </div>
          <div className="ui error message" />
        </form>
        {formState !== null &&
          <div className={"ui " + formState + " message"}>
            <i className="close icon" onClick={() => setFormState(null)}></i>
            <div className="header">{message.header}</div>
            <p>{message.content}</p>
          </div>
        }
        {Object.entries(errors).length !== 0 &&
          <div className={"ui warning icon message"}>
            <i className="inbox icon"></i>
            <div className="content">
              <div className="header">{Object.entries(errors).length === 1 ? 'Advertencia' : 'Múltiples Advertencias'}</div>
              <ul className="list">
                {errors.userEmail &&
                  <li>{errors.userEmail.message}</li>
                }
                {errors.password &&
                  <li>{errors.password.message}</li>
                }
              </ul>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Login;