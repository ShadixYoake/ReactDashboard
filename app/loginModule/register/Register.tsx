import { useRef, useState } from "react";
import "./register.css"; // Assuming you have a CSS file for styles
import seaLogo from "assets/logoFooter.png";
import { schema } from "database/schema"; // Adjust the import path as necessary

function Register() {
  const users = schema.users;
  const [result, setResult] = useState<"ok" | "ko" | null>(null);
  const [overlayState, setOverlay ] = useState<"overlay visibleOverlay" | "overlay">("overlay");
  const [passwordState, setPasswordState] = useState<"text" | "password">(
    "password"
  );
  const password = useRef<HTMLInputElement>(null);
  const overlay = useRef<HTMLInputElement>(null);


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(null);

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const lastName = formData.get("lastName") as string;
    const secondLastName = formData.get("secondLastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm_password") as string;

    const user = {
      name,
      lastName,
      secondLastName,
      email,
      password,
      confirmPassword,
    };
    if (confirmPassword === password){
      handleRegister(user);
      changeOverlayState();
      //form.reset();
    }else{
      setResult("ko");
      changeOverlayState();
    }


  };
  
  function changeOverlayState() {
    if (overlayState === "overlay") {
      setOverlay("overlay visibleOverlay");
    }else {
      setOverlay("overlay");
    }

  }

  function showPassword() {
    if (passwordState === "password") {
      setPasswordState("text");
    } else {
      setPasswordState("password");
    }
  }

  async function handleRegister(user: any) {
    try {
      const response = await fetch("http://localhost:3000/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        setResult("ko");
      } else {
        setResult("ok");
      }
    } catch (err) {
      console.error("Error de red:", err);
      setResult("ko");
    }
  }

  return (
    <div className="main-body">
      <div>
        <div className="sea-centered">
          <img src={seaLogo} alt="Not found" />
        </div>
        <div className="wrapper">
          <form className="form-group" onSubmit={handleSubmit}>
            <div className="input-box">
              <label>Nombre</label>
              <input
                type="text"
                placeholder="Ruby Araceli (Nombre de ejemplo)"
                name="name"
                pattern="^^[a-zA-ZÀ-ÿ\s]+$"
                minLength={2}
                maxLength={20}
                required
              />
              <i className="bx bxs-user"></i>
            </div>

            <div className="input-box">
              <label>Apellidos</label>
              <div className="row-container">
                <input
                  type="text"
                  placeholder="Gonzales (Paterno)"
                  name="lastName"
                  pattern="^[a-zA-Z]+$"
                  minLength={2}
                  maxLength={20}
                  required
                />
                <input
                  type="text"
                  placeholder="Lozano (Materno)"
                  name="secondLastName"
                  pattern="^[a-zA-Z]+$"
                  minLength={2}
                  maxLength={20}
                  required
                />
              </div>
            </div>

            <div className="input-box">
              <label>Correo electrónico</label>
              <input
                type="email"
                placeholder="Correo"
                name="email"
                pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-z]{2,}$"
                title="Favor de ingresar un correo electrónico válido"
                required
              />
              <i className="bx bxs-envelope"></i>
            </div>

            <div className="input-box">
              <label>Contraseña</label>
              <input
                type={passwordState}
                placeholder="Contraseña"
                name="password"
                ref={password}
                required
                pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$"
                title="Debe contener al menos una mayúscula, un número, un símbolo y mínimo 8 caracteres"
              />
              <i className="bx bxs-lock-alt"></i>
            </div>

            <div className="input-box">
              <label>Confirmar contraseña</label>
              <input
                type={passwordState}
                placeholder="Confirmar contraseña"
                name="confirm_password"
                required
              />
              <i className="bx bxs-lock-alt"></i>
            </div>

            <div className="remember-forgot">
              <label>
                <input id="showPass" type="checkbox" onClick={showPassword} />
                Mostrar contraseña
              </label>
            </div>

            <button type="submit" className="btn" >
              Registrarse
            </button>
          </form>

          <div className="register-link">
            <p>
              ¿Ya tienes cuenta? <a href="./">¡Inicia sesión!</a>
            </p>
          </div>
        </div>
      </div>

      <div id="popup1" className={overlayState} ref={overlay}>
        <div className="popup">
           {result === "ok" ? (
              <h2>Usuario creado correctamente.</h2>
            ) : (
              <h2>Error al crear el usuario</h2>
            )} 
          <a className="close" onClick={changeOverlayState}>
            &times;
          </a>
          <div className="content">
            {result === "ok" ? (
              <p>El usuario ha sido creado correctamente, por favor iniciar sesion.</p>
            ) : result === "ko" ? (
              <p>Error al crear el usuario. Por favor, inténtalo de nuevo.</p>
            ) : (
              <p>Se ha generado un error</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
