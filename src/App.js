import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';

import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleserach() {
    if (input === '') {
      alert("Preencha algum cep!");
      return
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("Erro ao discar");
      setInput("");
    }

  }

  return (
    <div className="container">
      <h1 className="title">Buscador de Cep</h1>
      <div className="containerInput">
        <input type="text" placeholder="Digite seu CEP" value={input} onChange={(e) => setInput(e.target.value)}></input>

        <button className="buttonSearch" onClick={handleserach}>
          <FiSearch size={25} color='#fff' />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>Rua: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Localidade/Estado = {cep.localidade}/{cep.uf}</span>
        </main>
      )}

    </div>
  );
}

export default App;
