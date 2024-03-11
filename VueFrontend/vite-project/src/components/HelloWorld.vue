<template>
  <div>
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="./assets/vite.svg" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" alt="Vue.js logo" />
      </a>
    </div>
    <h1>Vite + Vue.js</h1>

    <h3>Clientes Cadastrados</h3>
    <ul>
      <li v-for="client in clients" :key="client.id">
        <strong>Nome:</strong> {{ client.nome }}, <strong>Email:</strong> {{ client.email }}
      </li>
    </ul>

    <div class="card">
      <h3>Formulário</h3>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="nome">Nome:</label>
          <input type="text" id="nome" v-model="nome" />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" />
        </div>
        <button type="submit">Criar Usuário</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  data() {
    return {
      nome: '',
      email: '',
      clients: [],
    };
  },
  mounted() {
    this.fetchClients();
  },
  methods: {
    async fetchClients() {
      try {
        const response = await axios.get('http://localhost:3000/clients');
        this.clients = response.data;
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    },
    async handleSubmit() {
      try {
        const response = await axios.post('http://localhost:3000/clients', {
          nome: this.nome,
          email: this.email,
        });
        console.log(response.data);
        // Add success handling, e.g., display success message
      } catch (error) {
        console.error('Erro ao criar usuário:', error);
        // Add error handling, e.g., display error message to user
      }
    },
  },
};
</script>
