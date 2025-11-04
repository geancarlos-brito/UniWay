<template>
  <div class="mx-3">
    <ul class="menu bg-base-200 rounded-box w-56">
      <li><router-link :to="{ name: 'rotas.index'}">Lista de Rotas</router-link></li>
      <li><router-link to="rotas/add">Adicionar Rota</router-link></li>
    </ul>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
