import "./logs.css";
import { NavigationBar } from "layouts/navBar/NavigationBar";
import { TableRows } from "layouts/tableRows/TableRows";

export function logs() {
  return (
    <>
      <NavigationBar titleName="Logs"/>
      <div className="centered-container">
        <div id="w-alt1" className="search-box white-box">
          <input id="alt-input1" type="text" />
          <button className="red-button"> Buscar</button>
        </div>
      </div>
      <div className="centered-container">
        <div className="white-box">
          <table id="providers-table">
            <thead>
              <th> Usuario</th>
              <th> Clasificacion</th>
              <th> Descripcion</th>
              <th> fecha</th>
            </thead>
            <tbody>
              <tr>
                <td> Usuario</td>
                <td> Subir archivo</td>
                <td>
                  {" "}
                  El usuario con nombre Sistema Estatal Anticorrupcion ha subido
                  un archivo en la fecha dd/mm/yyyy a la hora hh:mm
                </td>
                <td> dd/mm/yyyy hh:mm </td>
              </tr>
              <TableRows category={1} userName="Juan" uploadDate="16-10-2023" />
              <tr>
                <td> Usuario</td>
                <td> Subir archivo</td>
                <td>
                  {" "}
                  El usuario con nombre Sistema Estatal Anticorrupcion ha subido
                  un archivo en la fecha dd/mm/yyyy a la hora hh:mm
                </td>
                <td> dd/mm/yyyy hh:mm </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default logs;
