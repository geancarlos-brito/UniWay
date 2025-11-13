<template>
  <!-- Layout principal -->
  <div class="flex min-h-screen">
    <!-- Sidebar (Menu Lateral) -->
    <div class="w-64" v-show="sidebarAberto">
      <logo />
      <menu-lateral />
    </div>

    <!-- Conteúdo Principal -->
    <div class="flex flex-col flex-1">
      <!-- Navbar Superior -->
      <nav-bar v-model:estaAberto="sidebarAberto" />

      <!-- Área de Conteúdo (Rotas) -->
      <main class="flex-grow overflow-y-auto p-6">
        <router-view />
      </main>

      <!-- Rodapé -->
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import menuLateral from "@/components/menuLateral.vue";
import logo from "@/components/logo.vue";
import navBar from "@/components/navBar.vue";
import Footer from "@/components/footer.vue";
import { onMounted, ref } from "vue";

const sidebarAberto = ref(true);

onMounted(() => {});
</script>

<style lang="scss" scoped></style>
