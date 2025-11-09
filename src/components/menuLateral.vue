<template>
  <div class="mx-3">
    <ul class="menu bg-base-200 rounded-box w-56">
      <!-- Se não estiver logado -->
      <template v-if="!usuario">
        <li><router-link :to="{ name: 'register'}">Criar conta</router-link></li>
        <li><router-link :to="{ name: 'login'}">Fazer Login</router-link></li>
      </template>

      <!-- Se estiver logado -->
      <template v-else>
        <li><router-link :to="{ name: 'rotas.index'}">Lista de Rotas</router-link></li>
        <!-- Adicionar rota apenas para Administrador -->
        <li v-if="usuario.tipo === 'Administrador'">
          <router-link :to="{ name: 'rotas.add'}">Adicionar Rota</router-link>
        </li>
      </template>
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

<style lang="scss" scoped></style>
