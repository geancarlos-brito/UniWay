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

          <div class="flex gap-2" v-if="tipoUsuario === 'Administrador'">
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
              <th v-if="tipoUsuario === 'Universitário'"></th>
              <th>Foto</th>
              <th>Motorista</th>
              <th>Universidade</th>
              <th>Ônibus</th>
              <th>Vagas</th>
              <th v-if="tipoUsuario === 'Administrador'" class="text-center w-36">Ações</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="rota in rotas" :key="rota.id">
              <th v-if="tipoUsuario === 'Universitário'">
                <label>
                  <input 
                    type="checkbox" 
                    class="checkbox" 
                    :checked="rota.inscritos?.includes(usuarioId)"
                    @change="(e) => selecionarRota(rota, e.target.checked)"
                    :disabled="rota.vagas === 0 && !rota.inscritos?.includes(usuarioId)"
                    :title="rota.vagas === 0 ? 'Vagas esgotadas' : ''"
                  />
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
              <td>
                <span :class="rota.vagas === 0 ? 'text-red-600 font-bold' : ''">
                  {{ rota.vagas === 0 ? 'Esgotado' : rota.vagas }}
                </span>
              </td>
              <td class="flex items-center gap-2">
                <template v-if="tipoUsuario === 'Administrador'">
                  <button class="btn btn-sm" @click="editarRota(rota.id)">Editar</button>
                  <button class="btn btn-sm bg-red-600 hover:bg-red-700 text-white border-none" @click="excluirRota(rota.id)">Excluir</button>
                </template>
                <button 
                  class="btn btn-sm btn-info" 
                  @click="router.push({ name: 'rotas.show', params: { id: rota.id } })"
                >
                  Ver Alunos
                </button>
              </td>
            </tr>
            <tr v-if="rotas.length === 0">
              <td :colspan="tipoUsuario === 'Administrador' ? 7 : 6" class="text-center text-gray-500 py-4">
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

const router = useRouter();
const rotas = ref([]);

const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
const usuarioId = usuarioLogado?.id;
const tipoUsuario = usuarioLogado?.tipo;

const capturarRotas = async () => {
  rotas.value = await DBService.listar("rotas");
};

const excluirTodas = async () => {
  if (confirm("Tem certeza que deseja excluir todas as rotas?")) {
    await DBService.limparColecao("rotas");
    rotas.value = [];
    console.log("Todas as rotas foram removidas.");
  }
};

const editarRota = (id) => {
  router.push(`/rotas/${id}/edit`);
};

const excluirRota = async (id) => {
  if (confirm("Tem certeza que deseja excluir esta rota?")) {
    try {
      await DBService.remover("rotas", "id", id);
      rotas.value = rotas.value.filter((rota) => rota.id !== id);
      console.log(`Rota #${id} excluída com sucesso.`);
    } catch (error) {
      console.error("Erro ao excluir rota:", error);
      alert("Erro ao excluir rota!");
    }
  }
};

const selecionarRota = async (rota, checked) => {
  if (tipoUsuario !== 'Universitário') return;

  if (checked) {
    const sucesso = await DBService.adicionarNaRota(rota.id, usuarioId);
    if (sucesso) {
      const rotaRef = rotas.value.find(r => r.id === rota.id);
      if (rotaRef) {
        rotaRef.vagas -= 1;
        if (!rotaRef.inscritos) rotaRef.inscritos = [];
        rotaRef.inscritos.push(usuarioId);
      }
    } else {
      alert("Não foi possível se inscrever nesta rota (vagas esgotadas ou já inscrito).");
    }
  } else {
    const sucesso = await DBService.removerDaRota(rota.id, usuarioId);
    if (sucesso) {
      const rotaRef = rotas.value.find(r => r.id === rota.id);
      if (rotaRef) {
        rotaRef.vagas += 1;
        rotaRef.inscritos = rotaRef.inscritos?.filter(id => id !== usuarioId) || [];
      }
    } else {
      alert("Não foi possível cancelar sua inscrição.");
    }
  }
};

onMounted(() => {
  capturarRotas();
});
</script>

<style scoped></style>