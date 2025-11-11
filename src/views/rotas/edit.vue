<template>
  <div>
    <breadcrumbs>
      <template v-slot:model> Rotas </template>
      <template v-slot:action> Editar Rota </template>
    </breadcrumbs>

    <div class="w-full mt-4">
      <fieldset
        class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4"
      >
        <legend class="fieldset-legend flex-1 mb-5 text-2xl">
          Editando Rota #{{ form.id }}
        </legend>

        <label class="label">Motorista</label>
        <input
          type="text"
          class="input w-full"
          v-model="form.motorista"
          placeholder="Nome do motorista"
        />

        <label class="label">Universidade (Sigla)</label>
        <input
          type="text"
          class="input w-full"
          v-model="form.universidade"
          placeholder="Ex: Nassau, UFDPar, UESPI"
        />

        <label class="label">Ônibus</label>
        <input
          type="text"
          class="input w-full"
          v-model="form.onibus"
          placeholder="Número ou identificação do ônibus"
        />

        <label class="label">Vagas</label>
        <input
          type="number"
          class="input w-full"
          v-model="form.vagas"
          placeholder="Quantidade de vagas"
        />

        <div class="mt-4 flex gap-2">
          <button class="btn btn-neutral" @click="salvarAlteracoes">Salvar Alterações</button>
          <button class="btn" @click="voltar">Cancelar</button>
        </div>
      </fieldset>

      <div class="toast" v-if="toastVisible">
        <div class="alert alert-success">
          <span>Rota atualizada com sucesso!</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import breadcrumbs from "@/components/breadcrumbs.vue";
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import DBService from "@/services/DBService";

const router = useRouter();
const route = useRoute();

const toastVisible = ref(false);
const form = reactive({
  id: "",
  motorista: "",
  universidade: "",
  onibus: "",
  vagas: "",
});

const rotaId = Number(route.params.id);

// Carrega os dados da rota selecionada
const carregarRota = async () => {
  const rotas = await DBService.listar("rotas");
  const rota = rotas.find((r) => r.id === rotaId);

  if (!rota) {
    alert("Rota não encontrada!");
    router.push("/rotas");
    return;
  }

  Object.assign(form, rota);
};

// Salva as alterações no banco
const salvarAlteracoes = async () => {
  try {
    const atualizado = await DBService.atualizarRota("id", rotaId, {
      motorista: form.motorista,
      universidade: form.universidade,
      onibus: form.onibus,
      vagas: form.vagas,
    });


    if (atualizado) {
      toastVisible.value = true;
      setTimeout(() => router.push("/rotas"), 1000);
    }
  } catch (error) {
    console.error("Erro ao salvar alterações:", error);
    alert("Erro ao salvar as alterações!");
  }
};

const voltar = () => {
  router.push("/rotas");
};

onMounted(() => {
  carregarRota();
});
</script>

<style lang="scss" scoped></style>
