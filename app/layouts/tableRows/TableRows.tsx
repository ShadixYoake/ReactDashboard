import { desc } from "drizzle-orm";

interface TableRowsProps {
  userName: string;
  uploadDate: string |Date;
  category: number;
}

//Caso 1: Subida de archivo
//Caso 2: Eliminacion de archivo
//Caso 3: Modificacion de archivo
//Caso 4: Descarga de archivo

function createDescription(
  category: number | string,
  userName: string,
  uploadDate: string | Date
) {
  if (typeof uploadDate === "string") {
    uploadDate = new Date(uploadDate);
  } else if (!(uploadDate instanceof Date)) {
    throw new Error("uploadDate must be a Date or a string that can be parsed to a Date");
  }

  switch (category) {
    case 1:
      category = "subido un archivo";
    case 2:
      category = "eliminado un archivo";
    case 3:
      category = "modificado un archivo";
    case 4:
      category = "descargado un archivo";
    default:
      category = "realizado una acción no reconocida";
      break;
  }
  return `El usuario con nombre ${userName} ha ${category} un archivo en la fecha ${uploadDate.toLocaleDateString(
    "es-MX"
  )} a la hora ${uploadDate.getHours()}:${uploadDate.getMinutes()}`;
}

export function TableRows({
  userName,
  uploadDate,
}: TableRowsProps) {
  return (
    
      <tr>
        <td> {userName}</td>
        <td> Subir archivo</td>
        <td>
          {createDescription(1, userName, uploadDate)}
        </td>
        <td>{uploadDate.toLocaleString()} </td>
      </tr>
  
  );
}
export default TableRows;
