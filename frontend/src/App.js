import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const generatePDF = () => {
    // Replace with the URL of your Node.js server

    axios({
      method: "get",
      url: "http://localhost:8000/generate-pdf",
      responseType: "blob",
    })
      .then(response => {
        // Create a link to download the file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = "file.pdf"; // Specify the file name
        a.click();
      })
      .catch(error => {
        console.error("Error downloading the file", error);
      });
  };

  return (
    <div>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
}

export default App;
