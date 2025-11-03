<template>
  <div>
    <breadcrumbs>
      <template v-slot:model> Rotas </template>
      <template v-slot:action> Routes </template>
    </breadcrumbs>
    <pre>
      {{ $route.params.id }}
    </pre>
  </div>
</template>

<script setup>
import breadcrumbs from "@/components/breadcrumbs.vue";
</script>

<style lang="scss" scoped></style>
