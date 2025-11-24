<template>
  <div class="flex min-h-screen">
    <div class="w-64" v-show="sidebarAberto">
      <logo />
      <menu-lateral />
    </div>

    <div class="flex flex-col flex-1">
      <nav-bar v-model:estaAberto="sidebarAberto" />

      <main class="flex-grow overflow-y-auto p-6">
        <router-view />
      </main>

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
