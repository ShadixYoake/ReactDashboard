import "./FileCollapsable.css";

export interface FileCollapsableProps {
  id: string;
  providerName: string;
  uploadDate: string;
  fileName: string;
}

function FileCollapsable({id, providerName, uploadDate, fileName}: FileCollapsableProps) {
  return (
      <div className="collapse-view">
        <input type="checkbox" id={`${id}`} />
        <label className="collapse-label" htmlFor={`${id}`}>
          Proveedor: {providerName} <br />
        </label>
        <div className="collapse-text">
          <p>Subido en la fecha: {uploadDate}</p>
          <p>Nombre del archivo: {fileName}</p>
          <div className="collapse-buttons">
            <button className="red-button">Descargar</button>
            <button className="red-button">Eliminar</button>
          </div>
        </div>
      </div>
  );
}
export default FileCollapsable;
