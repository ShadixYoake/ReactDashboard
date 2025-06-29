
import './App.css'
import './Login.css'
import seaLogo from './assets/logoFooter.png';
import { NavLink } from "react-router";

function LoginForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí va tu lógica de envío
  };

  return (
    <div className="main_body">
      <div>
        <div className="sea-centered">
          <img
            src={seaLogo}
            alt="Secretaría ejecutiva del sistema estatal anticorrupcion SEA"
          />
        </div>
        <div className="wrapper">
          <form action="./upload" className="form-group" onSubmit={handleSubmit}>
            <div className="input-box">
              <label>Correo</label>
              <input
                name="email"
                type="text"
                placeholder="Correo"
                required
              />
              <i className="bx bxs-user"></i>
            </div>

            <div className="input-box">
              <label>Contraseña</label>
              <input
                name="password"
                type="password"
                placeholder="Contraseña"
                required
              />
              <i className="bx bxs-lock-alt"></i>
            </div>

            <div className="remember-forgot">
              <label>
                <input type="checkbox" name="remember_me" />
                Recordar usuario
              </label>
              <a href="#">¿Contraseña olvidada?</a>
            </div>

            <button type="submit" className="btn">Iniciar sesión</button>

            <div className="register-link">
              <NavLink to="/login">All Concerts</NavLink>
              <p>¿No tienes una cuenta? <a href="/register">Registrar</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default LoginForm;
