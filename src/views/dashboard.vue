<script setup>
import { ref, onMounted } from 'vue'
import Localbase from 'localbase'

const rotasAtivas = ref(0)
const motoristas = ref(0)
const horarioSaida = ref('16h')
const usuario = ref(null)

let db = new Localbase('uniway-db')

async function atualizarRotas() {
  const rotas = await db.collection('rotas').get()
  rotasAtivas.value = rotas.length
}

// Busca os motoristas registrados no sistema
async function atualizarMotoristas() {
  const todosUsuarios = await db.collection('usuarios').get()
  motoristas.value = todosUsuarios.filter(u => u.tipo?.toLowerCase() === 'motorista').length
}

onMounted(() => {
  const u = localStorage.getItem('usuarioLogado')
  if (u) usuario.value = JSON.parse(u)

  atualizarRotas()
  atualizarMotoristas()
})
</script>

<template>
  <div class="p-6 space-y-8">
    <!-- Boas-vindas -->
    <div class="space-y-2">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-base-content">
        Olá, {{ usuario ? usuario.nome : 'Usuário' }}
      </h1>
      <p class="text-gray-400">Bem-vindo ao painel do UniWay!</p>
      <p class="text-sm text-gray-500 mt-1">
        {{ new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }} •
        {{ new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }}
      </p>
    </div>

    <!-- Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Rotas Ativas -->
      <div class="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow rounded-xl p-6 flex flex-col items-center justify-center">
        <div class="text-4xl mb-2 text-primary">📍</div>
        <p class="text-3xl font-bold">{{ rotasAtivas }}</p>
        <p class="text-gray-500 mt-1 text-center">Rotas ativas</p>
      </div>

      <!-- Motoristas Disponíveis -->
      <div class="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow rounded-xl p-6 flex flex-col items-center justify-center">
        <div class="text-4xl mb-2 text-primary">🚗</div>
        <p class="text-3xl font-bold">{{ motoristas }}</p>
        <p class="text-gray-500 mt-1 text-center">Motoristas disponíveis</p>
      </div>

      <!-- Horário de Saída -->
      <div class="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow rounded-xl p-6 flex flex-col items-center justify-center">
        <div class="text-4xl mb-2 text-primary">⏰</div>
        <p class="text-3xl font-bold">{{ horarioSaida }}</p>
        <p class="text-gray-500 mt-1 text-center">Horário de saída</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
