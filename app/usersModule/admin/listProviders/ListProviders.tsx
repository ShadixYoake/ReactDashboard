import "./listProviders.css"; // Asegúrate de importar tu CSS
import { NavigationBar } from 'layouts/navBar/NavigationBar';

type Provider = {
  name: string;
  declaration: string;
  uploadedAt: string;
};

const sampleData: Provider[] = [
  { name: "Proveedor A", declaration: "archivo_a.pdf", uploadedAt: "2025-07-14" },
  { name: "Proveedor B", declaration: "archivo_b.json", uploadedAt: "2025-07-13" },
  { name: "Proveedor B", declaration: "archivo_b.json", uploadedAt: "2025-07-13" },
  { name: "Proveedor B", declaration: "archivo_b.json", uploadedAt: "2025-07-13" },
];

export function ListProviders() {
  return (
    <>
    <NavigationBar titleName="Lista de proveedores"/>
      <div className="centered-container">
        <div id="w-alt1" className="search-box white-box">
          <input id="alt-input1" type="text" placeholder="Buscar proveedor..." />
          <button className="red-button">Buscar</button>
        </div>
      </div>

      <div className="centered-container">
        <div className="white-box">
          <table id="providers-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Declaración subida</th>
                <th>Fecha de subida</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((user, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#fff",
                  }}
                >
                  <td>{user.name}</td>
                  <td>{user.declaration}</td>
                  <td>{user.uploadedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default ListProviders;