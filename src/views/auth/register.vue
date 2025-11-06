<template>
  <div class="min-h-screen bg-base-200 flex items-center justify-center">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-center mb-4 text-2xl font-bold">
          Criar Conta
        </h2>

        <label class="label">Nome completo</label>
        <input
          v-model="nome"
          type="text"
          class="input input-bordered w-full"
          placeholder="Digite seu nome"
        />

        <label class="label mt-2">Email</label>
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
            <option value="UFPI">
              Universidade Federal do Piauí (UFPI)
            </option>
            <option value="UESPI">
              Universidade Estadual do Piauí (UESPI)
            </option>
            <option value="UNIP">
              Universidade Paulista (UNIP)
            </option>
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

const router = useRouter();

const nome = ref("");
const email = ref("");
const senha = ref("");
const tipo = ref("");
const universidade = ref("");

const registrar = async () => {
  if (!nome.value || !email.value || !senha.value || !tipo.value) {
    alert("Preencha todos os campos obrigatórios!");
    return;
  }

  // Se for universitário, verifica se escolheu universidade
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

  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  usuarios.push(novoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Usuário cadastrado com sucesso!");
  router.push("/login");
};
</script>
