import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './styles.css'
import api from "./services/api";

function App() {
  const [input, setInput] = useState('')
  const [cep,setCep] = useState('')


  async function handleSearch(){
   if(input === ""){
    alert('preencha algum cep')
    return;
   }
   try {
    const response = await api.get(`${input}/json`);
    setCep(response.data)
    setInput('')
   } catch (error) {
    alert('ops erro ao buscar Cep')
    setInput("")
   }
  }


  return (
  
    <div className="Container">
    
      <h1 className="title">Buscador Cep </h1>
      <div className="containerInput">

        <input type="text"
         placeholder="Digite seu Cep.."
         value={input}
        onChange={(e)=> setInput(e.target.value)}       
         />
       
      

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>

        </div>

        {Object.keys(cep).length > 0 && (
          <main className="main">
          <h2>CEP:{cep.cep}</h2>
          <span>Rua:{cep.logradouro}</span>
          <span>complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      
        )}
        
    </div>
  );
}

export default App;
