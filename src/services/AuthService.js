import { ref } from "vue";

export const usuarioLogado = ref(JSON.parse(localStorage.getItem("usuarioLogado")) || null);

export function login(usuario) {
  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
  usuarioLogado.value = usuario;
}

export function logout() {
  localStorage.removeItem("usuarioLogado");
  usuarioLogado.value = null;
}
