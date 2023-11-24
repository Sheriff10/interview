import logo from "./logo.svg";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Index from "./container";

function App() {
   window.api = "https://dizzy-cape-mite.cyclic.app";
   // window.api = "http://localhost:5001"
   return (
      <div className="App">
         <Index />
      </div>
   );
}

export default App;
