<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl font-bold">Alunos da rota</h2>
      <router-link to="/rotas/" class="btn btn-sm">Voltar</router-link>
    </div>

    <div v-if="loading" class="text-gray-500">Carregando participantes...</div>

    <div v-else>
      <div v-if="participantes.length === 0" class="text-gray-500">
        Nenhum participante registrado nesta rota.
      </div>

      <div v-else class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr class="bg-base-200 text-sm">
              <th>Nome</th>
              <th>Tipo</th>
              <th>Horário de Registro</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in participantes" :key="p.id" class="hover:bg-base-100">
              <td class="font-medium">{{ p.nome }}</td>
              <td class="text-sm text-gray-600">{{ p.tipo }}</td>
              <td class="text-sm">{{ formatTimestamp(p.horario_registro) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import DBService from "@/services/DBService";

const route = useRoute();
const rotaId = route.params.id;

const participantes = ref([]);
const loading = ref(true);

onMounted(async () => {
  loading.value = true;

  try {
    const rotas = await DBService.listar("rotas");
    const rota = rotas.find(r => r.id === Number(rotaId));

    if (rota?.inscritos?.length > 0) {
      participantes.value = rota.inscritos.map((id, index) => ({
        id: index + 1,
        nome: `Participante #${id}`,
        tipo: "Universitário",
        horario_registro: new Date().toISOString()
      }));
    } else {
      participantes.value = [];
    }
  } catch (e) {
    console.error("Erro ao buscar participantes:", e);
    participantes.value = [];
  } finally {
    loading.value = false;
  }
});

function formatTimestamp(timestamp) {
  if (!timestamp) return "-";
  try {
    const d = new Date(timestamp);
    return d.toLocaleString("pt-BR", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  } catch {
    return timestamp;
  }
}
</script>

<style scoped></style>
