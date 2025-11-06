<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Localbase from 'localbase'

const rotasAtivas = ref(0)
const universitarios = ref(46) // exemplo fixo, pode puxar de outro banco
const motoristas = ref(3) // podemos atualizar esse depois se quiser
const horarioSaida = ref('16h')

let db = new Localbase('db')

async function atualizarRotas() {
  const rotas = await db.collection('rotas').get()
  rotasAtivas.value = rotas.length
}

onMounted(() => {
  atualizarRotas()
  window.addEventListener('rota-adicionada', atualizarRotas)
  window.addEventListener('rota-removida', atualizarRotas)
})

onBeforeUnmount(() => {
  window.removeEventListener('rota-adicionada', atualizarRotas)
  window.removeEventListener('rota-removida', atualizarRotas)
})
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Boas-vindas -->
    <div>
      <h1 class="text-3xl font-bold">Olá, Usuário</h1>
      <p class="text-gray-600">Bem-vindo ao painel do UniWay!</p>
      <p class="text-sm text-gray-500 mt-2">
        {{ new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }} •
        {{ new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }}
      </p>
    </div>

    <!-- Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-gray-100 rounded-xl shadow p-4 text-center">
        <p class="text-3xl font-bold">{{ rotasAtivas }}</p>
        <p class="text-gray-600">Rotas ativas</p>
      </div>

      <div class="bg-gray-100 rounded-xl shadow p-4 text-center">
        <p class="text-3xl font-bold">{{ universitarios }}</p>
        <p class="text-gray-600">Universitários cadastrados</p>
      </div>

      <div class="bg-gray-100 rounded-xl shadow p-4 text-center">
        <p class="text-3xl font-bold">{{ motoristas }}</p>
        <p class="text-gray-600">Motoristas disponíveis</p>
      </div>

      <div class="bg-gray-100 rounded-xl shadow p-4 text-center">
        <p class="text-3xl font-bold">{{ horarioSaida }}</p>
        <p class="text-gray-600">Horário de saída</p>
      </div>
    </div>
  </div>
</template>
