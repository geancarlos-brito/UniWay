import Localbase from "localbase";

class DBService {
  constructor(dbName = "uniway-db") {
    this.db = new Localbase(dbName);
  }

  // MÉTODOS DO USUÁRIO

  // Adiciona novo novo usuário
  async adicionar(colecao, dados) {
    try {
      const id = Date.now(); // ID único baseado no timestamp
      await this.db.collection(colecao).add({ id, ...dados });
      console.log(`Item adicionado em ${colecao}:`, dados);
      return true;
    } catch (error) {
      console.error("Erro ao adicionar:", error);
      return false;
    }
  }

  // Lista todos os usuários registrados
  async listar(colecao) {
    try {
      return await this.db.collection(colecao).get();
    } catch (error) {
      console.error("Erro ao listar:", error);
      return [];
    }
  }

  // Busca um um usuário com base em um campo e valor
  async buscar(colecao, campo, valor) {
    try {
      const resultados = await this.db.collection(colecao).get();
      const encontrado = resultados.find(item => item[campo] === valor);
      return encontrado || null;
    } catch (error) {
      console.error("Erro ao buscar:", error);
      return null;
    }
  }

  // Atualiza usuário específico
  async atualizar(colecao, campo, valor, novosDados) {
    try {
      const resultados = await this.db.collection(colecao).get();
      const registro = resultados.find(item => item[campo] === valor);

      if (!registro) {
        console.warn("Registro não encontrado para atualização");
        return false;
      }

      await this.db
        .collection(colecao)
        .doc({ id: registro.id })
        .update(novosDados);

      console.log(`Registro atualizado em ${colecao}:`, novosDados);
      return true;
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      return false;
    }
  }

  // Remove usuário
  async remover(colecao, campo, valor) {
    try {
      const resultados = await this.db.collection(colecao).get();
      const registro = resultados.find(item => item[campo] === valor);

      if (!registro) {
        console.warn("Registro não encontrado para exclusão");
        return false;
      }

      await this.db.collection(colecao).doc({ id: registro.id }).delete();

      console.log(`Registro removido de ${colecao}: ${campo}=${valor}`);
      return true;
    } catch (error) {
      console.error("Erro ao remover:", error);
      return false;
    }
  }

  // Limpa toda a coleção
  async limparColecao(colecao) {
    try {
      await this.db.collection(colecao).delete();
      console.log(`Coleção ${colecao} limpa com sucesso`);
      return true;
    } catch (error) {
      console.error("Erro ao limpar a coleção:", error);
      return false;
    }
  }

  // MÉTODOS PARA ROTAS

  async adicionarRota(rota) {
    try {
      const id = Date.now();
      await this.db.collection("rotas").add({ id, ...rota });
      console.log("Rota adicionada:", rota);

      window.dispatchEvent(new Event("rota-adicionada"));

      return true;
    } catch (error) {
      console.error("Erro ao adicionar rota:", error);
      return false;
    }
  }

  async atualizarRota(campo, valor, novosDados) {
  try {
    const resultados = await this.db.collection("rotas").get();
    const rota = resultados.find(item => item[campo] === valor);
    if (!rota) {
      console.warn("Rota não encontrada para atualização");
      return false;
    }
    await this.db.collection("rotas").doc({ id: rota.id }).update(novosDados);
    console.log("Rota atualizada:", novosDados);
    window.dispatchEvent(new Event("rota-atualizada"));
    return true;
  } catch (error) {
    console.error("Erro ao atualizar rota:", error);
    return false;
  }
}


  async listarRotas() {
    try {
      return await this.db.collection("rotas").get();
    } catch (error) {
      console.error("Erro ao listar rotas:", error);
      return [];
    }
  }

  async excluirTodasRotas() {
    try {
      await this.db.collection("rotas").delete();
      console.log("Todas as rotas foram removidas com sucesso.");

      window.dispatchEvent(new Event("rota-removida"));
      
      return true;
    } catch (error) {
      console.error("Erro ao excluir todas as rotas:", error);
      return false;
    }
  }
}

export default new DBService("uniway-db");
