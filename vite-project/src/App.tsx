import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import { useEffect } from 'react';

function App() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:3000/clients');
        setClients(response.data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchClients();
  }, []);

  const handleDeleteClick = async (clientId: any) => {
    try {
      const response = await axios.delete(`http://localhost:3000/clients/${clientId}`);

      // Update the client list efficiently:
      setClients(clients.filter((client) => client.id !== clientId));

      // Optionally, display a success message or notification
      console.log('Client deleted successfully:', response.data);
    } catch (error) {
      console.error('Error deleting client:', error);

      // Handle deletion errors gracefully, e.g., display an error message
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/clients", {
        nome,
        email,
      });
      console.log(response.data);
      // Adicione aqui qualquer manipulação de sucesso, como exibir uma mensagem de sucesso
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      // Adicione aqui qualquer manipulação de erro, como exibir uma mensagem de erro para o usuário
    }
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className='text-red-500'>Vite + React</h1>

      <h3>Clientes Cadastrados</h3>
      <ul>
        {clients.map(client => (
          <h3 key={client.id}>
            <strong>Nome:</strong> {client.nome}, <strong>Email:</strong> {client.email}
            <button onClick={() => handleDeleteClick(client.id)}>Delete</button>
          </h3>
        ))}
      </ul>

      <div className="card">
        <h3 className="text-green-600">Formulário</h3>

        <h1 className="text-green-600">
    Hello world!
  </h1>
      <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">Criar Usuário</button>
    </form>
      </div>
    </>
  )
}

export default App
