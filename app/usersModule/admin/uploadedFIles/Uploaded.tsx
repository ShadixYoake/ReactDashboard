import { NavigationBar } from 'layouts/navBar/NavigationBar';
import FileCollapsable from 'layouts/fileCollapsable/FileCollapsable';
import "./UploadedFiles.css"

// Función para generar datos aleatorios
function getRandomFileData(id: number) {
  const providers = ["Proveedor A", "Proveedor B", "Proveedor C", "Proveedor D"];
  const fileNames = ["archivo1.pdf", "documento2.docx", "imagen3.png", "reporte4.xlsx"];
  const dates = ["2025-07-10", "2025-06-21", "2025-05-15", "2025-04-30"];
  return {
    id: `file${id}`,
    providerName: providers[Math.floor(Math.random() * providers.length)],
    uploadDate: dates[Math.floor(Math.random() * dates.length)],
    fileName: fileNames[Math.floor(Math.random() * fileNames.length)],
  };
}

export function UploadedFiles() {
  // Genera un array de 5 archivos aleatorios
  const files = Array.from({ length: 5 }, (_, i) => getRandomFileData(i + 1));

  return (
    <>
      <NavigationBar titleName="Archivos Subidos">
      </NavigationBar>
      <div className="centered-container">
        <div id="w-alt1" className="white-box">
          <input id="alt-input1" type="text" />
          <button className="red-button">Buscar</button>
        </div>
      </div>
      <div className="white-box column ">
        {files.map(file => (
          <FileCollapsable
            key={file.id}
            id={file.id}
            providerName={file.providerName}
            uploadDate={file.uploadDate}
            fileName={file.fileName}
          />
        ))}
      </div>
    </>
  );
}
export default UploadedFiles;