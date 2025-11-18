<template>
  <div class="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center p-4">
    <div class="card w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8 animate-fade flex flex-col items-center">

      <!-- LOGO -->
      <div class="flex flex-col items-center mb-6">
        <img src="@/assets/images/logo.png" class="w-70 h-34 object-contain mb-1" />
        <h1 class="text-3xl font-bold">Criar Conta</h1>
        <p class="text-sm opacity-70">Preencha seus dados para continuar</p>
      </div>
      <div class="w-full max-w-xs flex flex-col gap-4">

        <!-- Nome -->
        <div class="form-control">
          <label class="label justify-center pb-1">
            <span class="label-text">Nome completo</span>
          </label>
          <div class="input input-bordered flex items-center gap-2 w-full justify-center">
            <i class="ri-user-line text-lg opacity-70"></i>
            <input
              type="text"
              v-model="nome"
              placeholder="Seu nome"
              class="text-center bg-transparent w-full focus:outline-none"
            />
          </div>
        </div>

        <!-- E-mail -->
        <div class="form-control">
          <label class="label justify-center pb-1">
            <span class="label-text">E-mail</span>
          </label>
          <div class="input input-bordered flex items-center gap-2 w-full justify-center">
            <i class="ri-mail-line text-lg opacity-70"></i>
            <input
              type="email"
              v-model="email"
              placeholder="Seu e-mail"
              class="text-center bg-transparent w-full focus:outline-none"
            />
          </div>
        </div>

        <!-- Senha -->
        <div class="form-control">
          <label class="label justify-center pb-1">
            <span class="label-text">Senha</span>
          </label>
          <div class="input input-bordered flex items-center gap-2 w-full justify-center">
            <i class="ri-lock-2-line text-lg opacity-70"></i>
            <input
              type="password"
              v-model="senha"
              placeholder="Crie uma senha"
              class="text-center bg-transparent w-full focus:outline-none"
            />
          </div>
        </div>

        <!-- Confirmar senha -->
        <div class="form-control">
          <label class="label justify-center pb-1">
            <span class="label-text">Confirmar senha</span>
          </label>
          <div class="input input-bordered flex items-center gap-2 w-full justify-center">
            <i class="ri-lock-password-line text-lg opacity-70"></i>
            <input
              type="password"
              v-model="confirmarSenha"
              placeholder="Repita a senha"
              class="text-center bg-transparent w-full focus:outline-none"
            />
          </div>
        </div>

        <!-- Tipo de usuário -->
        <div class="form-control">
          <label class="label justify-center pb-1">
            <span class="label-text">Tipo de usuário</span>
          </label>
          <select v-model="tipo" class="select select-bordered w-full text-center">
            <option disabled value="">Selecione...</option>
            <option value="Universitário">Universitário</option>
            <option value="Motorista">Motorista</option>
            <option value="Administrador">Administrador</option>
          </select>
        </div>

        <!-- Universidade (condicional) -->
        <div v-if="tipo === 'Universitário'" class="form-control">
          <label class="label justify-center pb-1">
            <span class="label-text">Universidade</span>
          </label>
          <select v-model="universidade" class="select select-bordered w-full text-center">
            <option disabled value="">Selecione sua universidade</option>
            <option value="UNINASSAU">UNINASSAU</option>
            <option value="UFDPar">UFDPar</option>
            <option value="UESPI">UESPI</option>
            <option value="UNIP">UNIP</option>
            <option value="IESVAP">AFYA - IESVAP</option>
          </select>
        </div>
      </div>

      <!-- Botão Registrar -->
      <button class="btn btn-warning w-full max-w-xs font-bold mt-6 shadow-md" @click="registrar">
        Registrar
      </button>

      <!-- Link Login -->
      <p class="text-sm text-center mt-4 opacity-70">
        Já tem uma conta?
        <RouterLink to="/login" class="link link-hover font-semibold text-gray-900">
          Fazer login
        </RouterLink>
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
const nome = ref("");
const email = ref("");
const senha = ref("");
const confirmarSenha = ref("");
const tipo = ref("");
const universidade = ref("");

const dominios = ["@gmail.com", "@hotmail.com", "@outlook.com", "@yahoo.com"];
const emailValido = (e) => dominios.some((d) => e.endsWith(d));

const registrar = async () => {
  if (!nome.value || !email.value || !senha.value || !tipo.value) {
    alert("Preencha todos os campos obrigatórios!");
    return;
  }

  if (!emailValido(email.value)) {
    alert("E-mail inválido!");
    return;
  }

  if (senha.value !== confirmarSenha.value) {
    alert("As senhas não coincidem!");
    return;
  }

  if (tipo.value === "Universitário" && !universidade.value) {
    alert("Por favor, selecione sua universidade!");
    return;
  }

  const usuarios = await DBService.listar("usuarios");
  const existente = usuarios.find((u) => u.email === email.value);

  if (existente) {
    alert("E-mail já cadastrado!");
    return;
  }

  const novoUsuario = {
    nome: nome.value,
    email: email.value,
    senha: senha.value,
    tipo: tipo.value,
    universidade: tipo.value === "Universitário" ? universidade.value : null,
  };

  const sucesso = await DBService.adicionar("usuarios", novoUsuario);
  
  if (sucesso) {
    loginAuth(novoUsuario);
    alert("Usuário cadastrado com sucesso!");
    router.push("/");
  } else {
    alert("Erro ao cadastrar usuário!");
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
