<template>
  <div class="navbar bg-base-200 shadow-md px-4">

    <!-- Botão do menu lateral -->
    <div class="flex-none">
      <button 
        class="btn btn-ghost btn-square hover:bg-base-300 transition"
        @click="toggleSidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- NOME DO SISTEMA -->
    <div class="flex-1">
      <a class="text-xl font-semibold tracking-wide ml-3">
        UniWay • Chaval-CE
      </a>
    </div>

    <!-- AÇÕES (Login / Registrar / Usuário / Logout) -->
    <div class="flex-none flex items-center gap-3">

      <!-- Se NÃO estiver logado -->
      <template v-if="!usuario">
        <router-link to="/login" class="btn btn-sm btn-outline">
          Login
        </router-link>
        <router-link to="/register" class="btn btn-sm btn-warning">
          Criar Conta
        </router-link>
      </template>

      <!-- Se ESTIVER logado -->
      <template v-else>

        <!-- Avatar + Nome -->
        <div class="flex items-center gap-2 px-3 py-1 bg-base-300 rounded-lg shadow-inner">
          <div class="avatar placeholder">
            <div class="bg-primary text-primary-content rounded-full w-10">
              <span class="text-lg font-bold">
                {{ usuario.nome.charAt(0).toUpperCase() }}
              </span>
            </div>
          </div>

          <span class="font-medium text-base">
            {{ usuario.nome }}
          </span>
        </div>

        <!-- Botão Sair -->
        <button class="btn btn-sm bg-red-600" @click="sair">
          Sair
        </button>

      </template>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { usuarioLogado, logout } from "@/services/AuthService.js";

const props = defineProps({
  estaAberto: Boolean
});
const emit = defineEmits(["update:estaAberto"]);

const router = useRouter();
const usuario = usuarioLogado;

function toggleSidebar() {
  emit("update:estaAberto", !props.estaAberto);
}

function sair() {
  logout();
  router.push("/login");
}
</script>

<style scoped></style>
