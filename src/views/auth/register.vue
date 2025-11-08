<template>
  <div class="min-h-screen bg-base-200 flex items-center justify-center">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h1 class="card-title text-center mb-4 text-2xl font-bold">
          Criar Conta
        </h1>

        <label class="label">Nome completo</label>
        <input
          v-model="nome"
          type="text"
          class="input input-bordered w-full"
          placeholder="Digite seu nome"
        />

        <label class="label mt-2">E-mail</label>
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
          placeholder="Crie uma senha"
        />

        <label class="label mt-2">Confirme sua senha</label>
        <input
          v-model="confirmarSenha"
          type="password"
          class="input input-bordered w-full"
          placeholder="Confirme sua senha"
        />

        <label class="label mt-2">Tipo de usuário</label>
        <select v-model="tipo" class="select select-bordered w-full">
          <option disabled value="">Selecione...</option>
          <option value="universitario">Universitário</option>
          <option value="motorista">Motorista</option>
          <option value="administrador">Administrador</option>
        </select>

        <!-- Campo condicional: universitário -->
        <div v-if="tipo === 'universitario'" class="mt-2">
          <label class="label">Universidade</label>
          <select v-model="universidade" class="select select-bordered w-full">
            <option disabled value="">Selecione sua universidade...</option>
            <option value="UNINASSAU">
              Centro Universitário Maurício de Nassau (UNINASSAU)
            </option>
            <option value="UFDPar">
              Universidade Federal do Delta do Parnaíba (UFDPar)
            </option>
            <option value="UFPI">Universidade Federal do Piauí (UFPI)</option>
            <option value="UESPI">
              Universidade Estadual do Piauí (UESPI)
            </option>
            <option value="UNIP">Universidade Paulista (UNIP)</option>
            <option value="IESVAP">
              AFYA Faculdade de Ciências Médicas (IESVAP)
            </option>
          </select>
        </div>

        <div class="mt-4">
          <button class="btn btn-warning w-full font-bold" @click="registrar">
            Registrar
          </button>
        </div>

        <p class="text-sm text-center mt-4 text-gray-500">
          Já tem uma conta?
          <RouterLink to="/login" class="link link-hover text-black">
            Fazer login
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Localbase from "localbase";

let db = new Localbase("db"); // cria ou conecta ao banco de dados

const router = useRouter();

const nome = ref("");
const email = ref("");
const senha = ref("");
const confirmarSenha = ref("");
const tipo = ref("");
const universidade = ref("");

// Expressão regular para validar domínio de e-mail
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

  if (tipo.value === "universitario" && !universidade.value) {
    alert("Por favor, selecione sua universidade!");
    return;
  }

  const novoUsuario = {
    id: Date.now(),
    nome: nome.value,
    email: email.value,
    senha: senha.value,
    tipo: tipo.value,
    universidade: tipo.value === "universitario" ? universidade.value : null,
  };

  // Salvando no banco de dados ("usuarios")
  try {
    await db.collection("usuarios").add(novoUsuario);
    alert("Usuário cadastrado com sucesso!");
    router.push("/login");
  } catch (err) {
    console.error("Erro ao salvar no IndexedDB:", err);
    alert("Erro ao cadastrar usuário!");
  }
};
</script>

