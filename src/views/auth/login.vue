<template>
  <div class="min-h-screen bg-base-200 flex items-center justify-center">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h1 class="card-title text-center mb-4 text-2xl font-bold">
          UniWay Login
        </h1>

        <!-- Seleção de tipo de usuário -->
        <div class="flex justify-center mb-4 gap-2">
          <button
            v-for="tipo in tipos"
            :key="tipo"
            @click="selecionarTipo(tipo)"
            :class="[
              'btn w-28 font-semibold',
              tipoUsuario === tipo ? 'btn-warning' : 'btn-outline'
            ]"
          >
            {{ tipo }}
          </button>
        </div>

        <label class="label">E-mail</label>
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
          <button class="btn btn-warning w-full font-bold" @click="login">
            Entrar
          </button>
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
import Localbase from "localbase";

let db = new Localbase("db");

const router = useRouter();
const email = ref("");
const senha = ref("");
const tipos = ["Universitário", "Motorista", "Administrador"];
const tipoUsuario = ref("");

const selecionarTipo = (tipo) => {
  tipoUsuario.value = tipo;
};

// Função para evitar erros ao consultar o banco de dados
const normalizar = (str) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const login = async () => {
  if (email.value === "" || senha.value === "") {
    alert("Preencha todos os campos!");
    return;
  }

  if (!tipoUsuario.value) {
    alert("Selecione o tipo de usuário!");
    return;
  }

  try {
    const usuarios = await db.collection("usuarios").get();

    const usuarioEncontrado = usuarios.find(
      (u) =>
        u.email === email.value &&
        u.senha === senha.value &&
        normalizar(u.tipo) === normalizar(tipoUsuario.value)
    );

    if (!usuarioEncontrado) {
      alert("E-mail, senha ou tipo de usuário incorretos!");
      return;
    }

    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));

    alert(`Login realizado como ${tipoUsuario.value}!`);
    router.push("/");
  } catch (error) {
    console.error("Erro ao acessar o banco:", error);
    alert("Erro ao fazer login!");
  }
}
</script>
