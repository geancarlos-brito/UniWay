<template>
  <div class="mx-3" v-if="usuario">
    <ul class="menu bg-base-100 shadow-md rounded-xl w-60 p-3 gap-1">

      <li class="menu-title text-base">
        <span>Menu</span>
      </li>

      <li>
        <router-link 
          :to="{ name: 'rotas.index' }"
          class="hover:bg-base-200 rounded-lg"
        >
          <i class="bi bi-map mr-2"></i>
          Lista de Rotas
        </router-link>
      </li>

      <li v-if="usuario.tipo === 'Administrador'">
        <router-link 
          :to="{ name: 'rotas.add' }"
          class="hover:bg-base-200 rounded-lg"
        >
          <i class="bi bi-plus-lg mr-2"></i>
          Adicionar Rota
        </router-link>
      </li>

      <div class="divider my-2"></div>

      <!-- Logout -->
      <li>
        <button 
          @click="sair" 
          class="hover:bg-red-200 text-red-600 rounded-lg"
        >
          <i class="bi bi-box-arrow-left mr-2"></i>
          Sair
        </button>
      </li>

    </ul>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { usuarioLogado, logout } from "@/services/AuthService.js";

const router = useRouter();
const usuario = usuarioLogado;

function sair() {
  logout();
  router.push("/login");
}
</script>

<style scoped></style>
