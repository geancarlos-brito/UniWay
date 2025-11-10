<template>
  <div class="min-h-screen bg-base-200 flex items-center justify-center">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h1 class="card-title text-center mb-4 text-2xl font-bold">
          Criar Conta
        </h1>

        <label class="label">Nome completo</label>
        <input v-model="nome" type="text" class="input input-bordered w-full" placeholder="Digite seu nome" />

        <label class="label mt-2">E-mail</label>
        <input v-model="email" type="email" class="input input-bordered w-full" placeholder="Digite seu email" />

        <label class="label mt-2">Senha</label>
        <input v-model="senha" type="password" class="input input-bordered w-full" placeholder="Crie uma senha" />

        <label class="label mt-2">Confirme sua senha</label>
        <input v-model="confirmarSenha" type="password" class="input input-bordered w-full" placeholder="Confirme sua senha" />

        <label class="label mt-2">Tipo de usuário</label>
        <select v-model="tipo" class="select select-bordered w-full">
          <option disabled value="">Selecione...</option>
          <option value="Universitário">Universitário</option>
          <option value="Motorista">Motorista</option>
          <option value="Administrador">Administrador</option>
        </select>

        <div v-if="tipo === 'Universitário'" class="mt-2">
          <label class="label">Universidade</label>
          <select v-model="universidade" class="select select-bordered w-full">
            <option disabled value="">Selecione sua universidade...</option>
            <option value="UNINASSAU">Centro Universitario Mauricio de Nassau (UNINASSAU)</option>
            <option value="UFDPar">Universidade Federal do Delta do Parnaíba (UFDPar)</option>
            <option value="UESPI">Universidade do Estado do Piauí (UESPI)</option>
            <option value="UNIP">Universidade Paulista (UNIP)</option>
            <option value="IESVAP">AFYA Faculdade de Ciências Médicas (IESVAP)</option>
          </select>
        </div>

        <div class="mt-4">
          <button class="btn btn-warning w-full font-bold" @click="registrar">Registrar</button>
        </div>

        <p class="text-sm text-center mt-4 text-gray-500">
          Já tem uma conta?
          <RouterLink to="/login" class="link link-hover text-black">Fazer login</RouterLink>
        </p>
      </div>
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

const emailValido = (email) => {
  const dominiosPermitidos = ["@gmail.com", "@hotmail.com", "@outlook.com", "@yahoo.com"];
  return dominiosPermitidos.some((dominio) => email.endsWith(dominio));
};

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

  // Evita duplicação
  const usuarios = await DBService.listar("usuarios");
  const emailExistente = usuarios.find((u) => u.email === email.value);
  if (emailExistente) {
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
