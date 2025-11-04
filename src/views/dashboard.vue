<template>
  <div class="p-6 space-y-6">
    <!-- Boas-vindas -->
    <div>
      <h1 class="text-3xl font-bold">Olá, {{ nomeUsuario }}</h1>
      <p class="text-gray-600">Bem-vindo ao painel do UniWay!</p>
      <p class="text-sm text-gray-500 mt-2">
        {{ dataAtual }} • {{ horaAtual }}
      </p>
    </div>

    <!-- Cards de resumo -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="card in cards"
        :key="card.titulo"
        class="p-4 bg-base-200 rounded-2xl shadow-md border border-base-300"
      >
        <div class="text-xl font-bold">{{ card.valor }}</div>
        <div class="text-gray-600">{{ card.titulo }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const nomeUsuario = "Usuário"; // futuramente pode vir do login
const dataAtual = ref("");
const horaAtual = ref("");

// Atualiza data e hora
onMounted(() => {
  const atualizarDataHora = () => {
    const agora = new Date();
    dataAtual.value = agora.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    horaAtual.value = agora.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  atualizarDataHora();
  setInterval(atualizarDataHora, 1000);
});

// Cards de exemplo
const cards = [
  { titulo: "Rotas ativas", valor: 5 },
  { titulo: "Universitários cadastrados", valor: 46 },
  { titulo: "Motoristas disponíveis", valor: 3 },
  { titulo: "Horário de saída", valor: "16h" },
];
</script>
