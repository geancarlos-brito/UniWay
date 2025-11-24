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
              <th>Universidade</th>
              <th>Horário de Inscrição</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in participantes" :key="p.id" class="hover:bg-base-100">
              <td class="font-medium">{{ p.nome }}</td>
              <td class="text-sm text-gray-600">{{ p.universidade || "Não informada" }}</td>
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
const rotaId = Number(route.params.id);

const participantes = ref([]);
const loading = ref(true);

onMounted(async () => {
  loading.value = true;
  try {
    // Busca a rota
    const rotas = await DBService.listar("rotas");
    const rota = rotas.find(r => r.id === rotaId);

    if (!rota?.inscritos?.length) {
      participantes.value = [];
    } else {
      const todosUsuarios = await DBService.listar("usuarios"); // ou "universitarios"

      // Cria um mapa para acesso rápido por ID
      const usuarioPorId = {};
      todosUsuarios.forEach(u => {
        usuarioPorId[u.id] = u;
      });

      participantes.value = rota.inscritos
        .map(idUsuario => {
          const usuario = usuarioPorId[idUsuario];
          if (!usuario) return null;

          return {
            id: usuario.id,
            nome: usuario.nome || "Nome não informado",
            universidade: usuario.universidade,
            horario_registro: usuario.data_criacao || new Date().toISOString()
          };
        })
        .filter(Boolean);
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
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return timestamp;
  }
}
</script>

<style scoped></style>