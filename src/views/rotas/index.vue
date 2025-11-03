<template>
  <div class="mb-2">
    <breadcrumbs>
      <template v-slot:model> Rotas </template>
      <template v-slot:action> Lista de Rotas </template>
    </breadcrumbs>
  </div>
  

  <div class="card w-full bg-base-100 shadow-sm card-border">
    <div class="card-body">
      <div class="overflow-x-auto">
        <div class="flex justify-between items-center mb-5">
          <div class="text-2xl font-semibold">Rotas Universitárias</div>

          <div class="flex gap-2">
            <button
            class="btn btn-sm bg-red-600 hover:bg-gray-700 text-white border-none"
            @click="excluirTodas"
          >
            Excluir Rotas
          </button>

          </div>
        </div>

        <table class="table">
          <!-- Cabeçalho -->
          <thead>
            <tr>
              <th></th>
              <th>Foto</th>
              <th>Motorista</th>
              <th>Universidade</th>
              <th>Ônibus</th>
              <th>Vagas</th>
            </tr>
          </thead>

          <!-- Linhas -->
          <tbody>
            <tr v-for="rota in rotas" :key="rota.id">
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>

              <!-- Foto (avatar) -->
              <td>
                <div class="avatar">
                  <div class="mask mask-squircle h-12 w-12">
                    <img
                      src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                      alt="Foto do motorista"
                    />
                  </div>
                </div>
              </td>

              <!-- Dados -->
              <td class="font-bold">{{ rota.motorista }}</td>
              <td>{{ rota.universidade }}</td>
              <td>{{ rota.onibus }}</td>
              <td>{{ rota.vagas }}</td>
            </tr>

            <tr v-if="rotas.length === 0">
              <td colspan="6" class="text-center text-gray-500 py-4">
                Nenhuma rota cadastrada ainda
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  </div>
</template>

<script setup>
import breadcrumbs from "@/components/breadcrumbs.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Localbase from "localbase";

const router = useRouter();
const rotas = ref([]);
let db = new Localbase("db");

onMounted(async () => {
  await capturarRotas();
});

const capturarRotas = async () => {
  rotas.value = await db.collection("rotas").get();
};
const excluirTodas = async () => {
  if (confirm("Tem certeza que deseja excluir todas as rotas?")) {
    await db.collection("rotas").delete();
    rotas.value = [];
    console.log("✅ Todas as rotas foram removidas.");
  }
};
</script>

<style lang="scss" scoped></style>
