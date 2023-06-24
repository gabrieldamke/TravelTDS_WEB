import { Usuario } from "../Api/ApiProvider";
import { GetUsuarioByEmailAsync } from "../store/Usuario.store";
import { RootState } from "../store/store";
enum getUsuarioStatus {
  Sucesso,
  Erro,
}

class getUsuario {
  usuario: Usuario | undefined;
  status: getUsuarioStatus;

  /**
   *
   */
  constructor(usuario: Usuario | undefined, status: getUsuarioStatus) {
    this.usuario = usuario;
    this.status = status;
  }
}
export function getLoggedUser() {
  const userJson = localStorage.getItem("user");
  if (
    localStorage.getItem("user") === undefined ||
    localStorage.getItem("user") === null
  ) {
    {
      if (/*getUser === null*/ 1==1) {
        console.error("Forneça um dispatch");
        return new getUsuario(undefined, getUsuarioStatus.Erro);
      } else {
        let auth = localStorage.getItem("auth");
        if (auth !== undefined && auth !== null) {
          /*getUser();*/
          if (userJson) {
            return new getUsuario(
              JSON.parse(userJson) as Usuario,
              getUsuarioStatus.Sucesso
            );
          } else {
            console.error("Ocorreu um erro ao retornar o usuario");
            return new getUsuario(undefined, getUsuarioStatus.Erro);
          }
        } else {
          console.error("Nenhum usuário autenticado");
          return new getUsuario(undefined, getUsuarioStatus.Erro);
        }
      }
    }
  } else {
    console.log("deu b");
    if (userJson) {
      return new getUsuario(
        JSON.parse(userJson) as Usuario,
        getUsuarioStatus.Sucesso
      );
    }
  }
}
