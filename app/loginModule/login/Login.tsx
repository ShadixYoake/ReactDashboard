import "./Login.css";
import seaLogo from "../../../app/assets/logoFooter.png";
import { NavLink } from "react-router";
import React, { useState, useEffect } from "react";

function Login() {
  const [passwordState, setPasswordState] = useState<"password" | "text">(
    "password"
  );

  useEffect(() => {
    const verificarToken = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/user/", {
          method: "GET",
          credentials: "include", // 👈 Esto permite que se envíen cookies HttpOnly
        });
        if (res.ok){
          window.location.href = "/upload";
        }
      } catch (err) {
        console.error("Error al verificar token:", err);
      }      
    };

    verificarToken();
  }, []); // ⬅️ Solo ejecuta en el montaje, como ngOnInit

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formdata = new FormData(form);

    const email = formdata.get("email") as string;
    const password = formdata.get("password") as string;

    const loginData = {
      email,
      password,
    };

    handleLogin(loginData);
  };

  async function handleLogin(loginData: any) {
    try {
      const response = await fetch("http://localhost:3000/api/user/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (data.passwordComparision) {
        console.log("Login successful");
        window.location.href = "/upload"; // Redirect to dashboard on successful login
      } else {
        console.error("Login failed");
        alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
      }
    } catch (err) {
      console.error("Error de red:", err);
    }
  }

  function showPassword() {
    if (passwordState === "password") {
      setPasswordState("text");
    } else {
      setPasswordState("password");
    }
  }

  return (
    <div className="main-body">
      <div>
        <div className="sea-centered">
          <img
            src={seaLogo}
            alt="Secretaría ejecutiva del sistema estatal anticorrupcion SEA"
          />
        </div>
        <div className="wrapper">
          <form
            action="./upload"
            className="form-group"
            onSubmit={handleSubmit}
          >
            <div className="input-box">
              <label>Correo</label>
              <input name="email" type="text" placeholder="Correo" required />
              <i className="bx bxs-user"></i>
            </div>

            <div className="input-box">
              <label>Contraseña</label>
              <input
                name="password"
                type={passwordState}
                placeholder="Contraseña"
                required
              />
              <i className="bx bxs-lock-alt"></i>
            </div>

            <div className="remember-forgot">
              <label>
                <input
                  type="checkbox"
                  name="remember_me"
                  onClick={showPassword}
                />
                Mostrar Contraseña
              </label>
              <a href="#">¿Contraseña olvidada?</a>
            </div>

            <button type="submit" className="btn">
              Iniciar sesión
            </button>

            <div className="register-link">
              <p>
                ¿No tienes una cuenta? <a href="/register">Registrar</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
