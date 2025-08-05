import "./NavigationBar.css";
import seaLogo from 'assets/logoFooter.png';

export interface NavigationBarProps {
  titleName: string; 
}

export function NavigationBar({titleName = "Default title"} : NavigationBarProps) {
  var isAdmin = 1   ; 
  
  
  function logout() {}
  
  return(
  <>
    <div className="nav-bar">
      <a href="/">
        <img src={seaLogo} alt="Not found" />
      </a>
      <a href="/upload">Subir archivo</a>
      {
        isAdmin && (
          <>
            <a href="/uploaded">Archivos subidos</a>
            <a href="/providers">Lista de proveedores</a>
            <a href="/logs">Logs</a>
          </>
        )
      }
      <div className="user-space">
        <span className="dropdown-starter">
          Sistema Estatal Anticorrupcion
          <div className="dropdown-content">
            <a href="/">Modificar perfil</a>
            <a onClick={logout}>Cerrar sesión</a>
          </div>
        </span>
      </div>
    </div>
    <div className="view-name">
      <h1>{titleName}</h1>
    </div>
  </>
  );
}

export default NavigationBar