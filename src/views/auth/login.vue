<script setup>
import { ref } from 'vue'
import Localbase from 'localbase'
import { useRouter } from 'vue-router'

let db = new Localbase('db')
const router = useRouter()

const email = ref('')
const senha = ref('')

const login = async () => {
  const usuarios = await db.collection('usuarios').get()
  const usuario = usuarios.find(u => u.email === email.value && u.senha === senha.value)

  if (!usuario) {
    alert('E-mail ou senha inválidos!')
    return
  }

  localStorage.setItem('usuarioLogado', JSON.stringify(usuario))

  if (usuario.tipo === 'admin') router.push('/')
  else if (usuario.tipo === 'universitario') router.push('/')
  else if (usuario.tipo === 'motorista') router.push('/')
}
</script>

<template>
  <div class="p-6 space-y-4">
    <h2 class="text-xl font-bold">Login</h2>

    <input v-model="email" placeholder="E-mail" class="input input-bordered w-full" type="email" />
    <input v-model="senha" placeholder="Senha" class="input input-bordered w-full" type="password" />

    <button class="btn btn-warning w-full" @click="login">Entrar</button>
  </div>
</template>
