import { useState, useRef } from "react";
import "../views-components.css";
import { NavigationBar } from "layouts/navBar/NavigationBar";

import { useEffect } from "react";

/*useEffect(() => {
  // Esto se ejecuta solo una vez, al montar el componente
  console.log(
    "Componente montado, aquí puedes cargar datos o inicializar estados"
  );
}, []);
*/
function FileUploadPanel() {
  const [fileName, setFileName] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatedDate = new Date()
      .toLocaleString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour12: false,
      })
      .replace("/", "")
      .replace("/", "")

    const file = event.target.files?.[0];
    let time: number | string = Date.now();
    time = time.toString().slice(-6);

    if (!file) return;
    setFileName(file.name);
    setNewFileName(`${time}_${file.name}${formatedDate}.json`);
    setFileSize(`${(file.size / 1024).toFixed(2)} KB`);
  };

  function uploadFile() {
    if (fileInputRef.current?.files) {
      const file = fileInputRef.current.files[0];
      file.name;
    }
  }

  async function handleFile(file: File) {
    if (!file) {
      setError("Por favor, selecciona un archivo.");
      return;
    }

    const formData = new FormData();
    formData.append("jsonFile", file);

    try {
      const response = await fetch("http://localhost:3000/api/createFile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
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

  return (
    <div>
      <NavigationBar titleName="Subir Archivo"></NavigationBar>
      <div className="centered-container">
        <div className="white-box">
          <label className="font-bold">Nombre del archivo</label>
          <input id="name-file" disabled type="text" value={fileName} />

          <label className="font-bold">Nuevo nombre que se le asignará</label>
          <input
            id="new-upload-file-name"
            disabled
            type="text"
            value={newFileName}
          />

          <label className="font-bold">Tamaño de archivo</label>
          <input id="file-size" disabled type="text" value={fileSize} />

          {error && <label className="error-label">{error}</label>}

          <div className="buttons">
            <label
              className="red-button"
              htmlFor="select-file"
              id="select-file-btn"
            >
              Seleccionar archivo
            </label>
            <input
              ref={fileInputRef}
              id="select-file"
              type="file"
              accept=".json"
              onChange={onFileSelected}
              style={{ display: "none" }}
            />
            <label className="red-button leftMargin" onClick={uploadFile}>
              Subir archivo
            </label>
          </div>
        </div>

        <div className="white-box">
          <label className="bold">Archivo Subido</label>
          <div className="labels-container">
            {true ? (
              <>
                <label>
                  Subido por: {/* Aquí puedes insertar dinámicamente */}
                </label>
                <label>Nombre del archivo: {fileName}</label>
                <label>Subido en: {/* Fecha de subida */}</label>
              </>
            ) : (
              <>
                <h1 className="bigHeader">PENDIENTE DE CARGAR</h1>
              </>
            )}
          </div>
          <div className="buttons">
            <button className="red-button">Eliminar archivo</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileUploadPanel;
