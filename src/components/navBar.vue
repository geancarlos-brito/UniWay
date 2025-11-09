<template>
  <div class="navbar bg-base-300 shadow">
    <div class="flex-none">
      <button class="btn btn-square btn-ghost" @click="toggleSidebar">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-5 w-5 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>

    <div class="flex-1">
      <a class="mx-4 text-xl font-light">UniWay - Chaval-CE</a>
    </div>

    <div class="flex-none flex gap-2 items-center">
      <!-- Mostrar login/criar conta se não estiver logado -->
      <template v-if="!usuario">
        <router-link to="/login" class="btn btn-sm btn-outline">Login</router-link>
        <router-link to="/register" class="btn btn-sm btn-outline">Criar Conta</router-link>
      </template>

      <!-- Mostrar botão sair se estiver logado -->
      <template v-else>
        <span class="mr-2 font-medium">{{ usuario.nome }}</span>
        <button class="btn btn-sm btn-error" @click="sair">Sair</button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { usuarioLogado, logout } from "@/services/AuthService.js";

const props = defineProps({ estaAberto: Boolean });
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

<style lang="scss" scoped></style>
