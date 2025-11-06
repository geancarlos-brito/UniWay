<template>
  <div class="min-h-screen bg-base-200 flex items-center justify-center">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-center mb-4 text-2xl font-bold">UniWay Login</h2>

        <label class="label">Email</label>
        <input
          v-model="email"
          type="email"
          class="input input-bordered w-full"
          placeholder="Digite seu email"
        />

        <label class="label mt-2">Senha</label>
        <input
          v-model="senha"
          type="password"
          class="input input-bordered w-full"
          placeholder="Digite sua senha"
        />

        <div class="mt-4">
          <button class="btn btn-warning w-full font-bold" @click="login">Entrar</button>
        </div>

        <p class="text-sm text-center mt-4 text-gray-500">
          Esqueceu sua senha?
          <a href="#" class="link link-hover text-black">Recuperar</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const senha = ref("");

const login = async () => {
  // Exemplo simples: valida login fake
  if (email.value === "" || senha.value === "") {
    alert("Preencha todos os campos!");
    return;
  }

  // Aqui tu pode adaptar pra IndexedDB ou LocalStorage depois
  const usuario = {
    nome: "Usuário de Teste",
    email: email.value,
    tipo: "universitario",
  };

  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

  alert("Login realizado com sucesso!");
  router.push("/"); // redireciona pra Home
};
</script>
