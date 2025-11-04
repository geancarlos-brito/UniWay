<template>
  <div class="w-full">
    <fieldset
      class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4"
    >
      <legend class="fieldset-legend flex-1 mb-5 text-2xl">
        Adicionando nova rota
      </legend>

      <label class="label">Motorista</label>
      <input
        type="text"
        class="input w-full"
        placeholder="Nome do motorista"
        v-model="form.motorista"
      />

      <label class="label">Universidade (Sigla)</label>
      <input
        type="text"
        class="input w-full"
        placeholder="Ex: Nassau, UFDPar, UESPI"
        v-model="form.universidade"
      />

      <label class="label">Ônibus</label>
      <input
        type="text"
        class="input w-full"
        placeholder="Número ou identificação do ônibus"
        v-model="form.onibus"
      />

      <label class="label">Vagas</label>
      <input
        type="number"
        class="input w-full"
        placeholder="Quantidade de vagas"
        v-model="form.vagas"
      />

      <button class="btn btn-neutral mt-4" @click="adicionarRota">
        Adicionar
      </button>
    </fieldset>

    <!-- Toast -->
    <div class="toast" v-if="toastVisible">
      <div class="alert alert-info">
        <span>Rota adicionada com sucesso!</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import Localbase from "localbase";

const router = useRouter();
let db = new Localbase("db");

const toastVisible = ref(false);

const form = reactive({
  motorista: "",
  universidade: "",
  onibus: "",
  vagas: "",
});

const adicionarRota = async () => {
  try {
    await db.collection("rotas").add({
      motorista: form.motorista,
      universidade: form.universidade,
      onibus: form.onibus,
      vagas: form.vagas,
    });

    toastVisible.value = true;
    console.log("✅ Rota adicionada com sucesso!");

    // Redireciona pra lista de rotas após salvar
    setTimeout(() => {
      router.push("/rotas");
    }, 1000);

    // Limpa o formulário
    Object.keys(form).forEach((key) => (form[key] = ""));
  } catch (error) {
    console.error("❌ Erro ao adicionar rota:", error);
  }
};
</script>

<style lang="scss" scoped></style>
