<script setup>
import { ref } from 'vue'
import Localbase from 'localbase'
import { useRouter } from 'vue-router'

let db = new Localbase('db')
const router = useRouter()

const nome = ref('')
const email = ref('')
const senha = ref('')
const tipo = ref('universitario') // padrão
const curso = ref('')
const veiculo = ref('')

const registrar = async () => {
  const novoUsuario = {
    nome: nome.value,
    email: email.value,
    senha: senha.value,
    tipo: tipo.value,
    curso: tipo.value === 'universitario' ? curso.value : '',
    veiculo: tipo.value === 'motorista' ? veiculo.value : '',
  }

  await db.collection('usuarios').add(novoUsuario)
  alert('Usuário registrado com sucesso!')
  router.push('/login')
}
</script>

<template>
  <div class="p-6 space-y-4">
    <h2 class="text-xl font-bold">Cadastro de Usuário</h2>

    <input v-model="nome" placeholder="Nome completo" class="input input-bordered w-full" />
    <input v-model="email" placeholder="E-mail" class="input input-bordered w-full" type="email" />
    <input v-model="senha" placeholder="Senha" class="input input-bordered w-full" type="password" />

    <select v-model="tipo" class="select select-bordered w-full">
      <option value="universitario">Universitário</option>
      <option value="motorista">Motorista</option>
      <option value="admin">Administrador</option>
    </select>

    <div v-if="tipo === 'universitario'">
      <input v-model="curso" placeholder="Curso" class="input input-bordered w-full" />
    </div>

    <div v-if="tipo === 'motorista'">
      <input v-model="veiculo" placeholder="Veículo" class="input input-bordered w-full" />
    </div>

    <button class="btn btn-warning w-full" @click="registrar">Registrar</button>
  </div>
</template>
