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

          <tbody>
            <tr v-for="rota in rotas" :key="rota.id">
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>

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

              <td class="font-bold">{{ rota.motorista }}</td>
              <td>{{ rota.universidade }}</td>
              <td>{{ rota.onibus }}</td>
              <td>{{ rota.vagas }}</td>

              <!-- 🟡 Botão de Editar -->
              <td>
                <button
                  class="btn btn-sm btn-neutral" @click="editarRota(rota.id)">Editar</button>
              </td>
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
import DBService from "@/services/DBService";

const router = useRouter(); // ✅ adiciona o roteador
const rotas = ref([]);

const capturarRotas = async () => {
  rotas.value = await DBService.listar("rotas");
};

const excluirTodas = async () => {
  if (confirm("Tem certeza que deseja excluir todas as rotas?")) {
    await DBService.limparColecao("rotas");
    rotas.value = [];
    console.log("✅ Todas as rotas foram removidas.");
  }
};

const editarRota = (id) => {
  router.push(`/rotas/${id}/edit`);
};

onMounted(() => {
  capturarRotas();
});

</script>

<style scoped></style>
