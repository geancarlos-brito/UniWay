<template>
  <div class="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center p-4">
    <div class="card w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8 animate-fade flex flex-col items-center">

      <div class="flex flex-col items-center mb-6">
        <img src="@/assets/images/logo.png" class="w-70 h-34 object-contain mb-1" />
        <p class="text-sm opacity-70">Faça login para continuar</p>
      </div>

      <div class="flex justify-center mb-6 gap-3">
        <button
          v-for="tipo in tipos"
          :key="tipo"
          @click="tipoUsuario = tipo"
          :class="[
            'btn w-28 font-semibold transition-all',
            tipoUsuario === tipo
              ? 'btn-warning shadow-md scale-105'
              : 'btn-outline'
          ]"
        >
          {{ tipo }}
        </button>
      </div>

      <div class="w-full max-w-xs flex flex-col gap-4">
        <div class="form-control">
          <label class="label justify-center pb-1">
            <span class="label-text">E-mail</span>
          </label>
          <div class="input input-bordered flex items-center gap-2 w-full justify-center">
            <i class="ri-mail-line text-lg opacity-60"></i>
            <input
              type="email"
              v-model="email"
              placeholder="Seu email"
              class="text-center bg-transparent w-full focus:outline-none"
            />
          </div>
        </div>

        <div class="form-control">
          <label class="label justify-center pb-1">
            <span class="label-text">Senha</span>
          </label>
          <div class="input input-bordered flex items-center gap-2 w-full justify-center">
            <i class="ri-lock-2-line text-lg opacity-60"></i>
            <input
              type="password"
              v-model="senha"
              placeholder="Sua senha"
              class="text-center bg-transparent w-full focus:outline-none"
            />
          </div>
        </div>
      </div>

      <button class="btn btn-warning w-full max-w-xs font-bold mt-6 shadow-md" @click="login">
        Entrar
      </button>

      <p class="text-sm text-center mt-4 opacity-70">
        Esqueceu sua senha?
        <a class="link link-hover font-bold text-black">Recuperar</a>
      </p>
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import DBService from "@/services/DBService.js";
import { login as loginAuth } from "@/services/AuthService.js";

const router = useRouter();
const email = ref("");
const senha = ref("");
const tipoUsuario = ref("");
const tipos = ["Universitário", "Motorista", "Administrador"];

const login = async () => {
  if (!email.value || !senha.value || !tipoUsuario.value) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    const usuarios = await DBService.listar("usuarios");
    const usuarioEncontrado = usuarios.find(
      (u) =>
        u.email === email.value &&
        u.senha === senha.value &&
        u.tipo.toLowerCase() === tipoUsuario.value.toLowerCase()
    );

    if (!usuarioEncontrado) {
      alert("E-mail, senha ou tipo de usuário incorretos!");
      return;
    }

    loginAuth(usuarioEncontrado);
    alert(`Login realizado com sucesso como ${tipoUsuario.value}!`);
    router.push("/");
  } catch (error) {
    console.error("Erro ao acessar o banco:", error);
    alert("Erro ao fazer login!");
  }
};
</script>

<style>
.animate-fade {
  animation: fade .35s ease-out;
}
@keyframes fade {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
