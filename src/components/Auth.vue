<template>
  <div class="auth">
    <div v-if="showReset" class="auth-modal">
      <h1>Escolha uma nova Senha</h1>
      <p>Enviamos um TOKEN para seu email. Informe-o abaixo.</p>
      <hr />
      <input v-model="user.email" id="email" type="text" placeholder="Email" />

      <input v-model="user.token" type="text" placeholder="Token" />

      <input v-model="user.password" type="password" placeholder="Nova Senha" />

      <button @click="resetPass">Enviar</button>

      <p>Preencha os dados e solicite uma nova senha.</p>
      <hr />
    </div>

    <div v-else-if="showForgot" class="auth-modal">
      <h1>Redefinir senha.</h1>

      <hr />
      <input v-model="user.email" id="email" type="text" placeholder="Email" />
      <button @click.prevent="forgotPass">Enviar</button>

      <hr />
    </div>
    <div v-else class="auth-modal">
      <h1 v-if="showSignup">Registrar</h1>
      <h1 v-else>Login</h1>

      <hr />
      <input v-if="showSignup" v-model="user.name" id="name" type="text" placeholder="Nome" />

      <input v-model="user.email" id="email" type="email" placeholder="Email" />

      <input v-model="user.password" id="password" type="password" placeholder="Senha" />

      <input
        v-model="user.confirmPassword"
        id="confirmPassword"
        v-if="showSignup"
        type="password"
        placeholder="Confirmar Senha"
      />

      <button v-if="showSignup" @click="signup">Registrar</button>
      <button v-else @click.prevent="signin">Entrar</button>

      <a @click.prevent="showSignup = !showSignup">
        <p v-if="showSignup">Já é cadastrado? Faça o login</p>
        <p v-else>Ainda não é cadastrado? Registre-se agora.</p>
      </a>
      <hr />
      <a @click="showForgot = true">
        <p>Esqueci minha senha.</p>
      </a>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";

export default {
  name: "Auth",
  data: function() {
    return {
      showSignup: false,
      showForgot: false,
      showReset: false,
      user: {}
    };
  },
  methods: {
    signin() {
      axios
        .post(`${baseApiUrl}/signin`, this.user)
        .then(res => {
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          this.$router.push({ path: "/" });
        })
        .catch(showError);
    },
    signup() {
      axios
        .post(`${baseApiUrl}/signup`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.user = {};
          this.showSignup = false;
        })
        .catch(showError);
    },

    forgotPass() {
      axios
        .post(`${baseApiUrl}/forgot_password`, this.user)
        .then(() => {
          this.showReset = true;
        })
        .catch(showError);
    },

    resetPass() {
      axios
        .post(`${baseApiUrl}/reset_password`, this.user)
        .then(() => {
          this.showReset = false;
          this.showForgot = false;
          this.showSignup = false;
        })
        .catch(showError);
    }
  }
};
</script>

<style lang="scss" scoped>
.auth {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .auth-modal {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px;
    min-width: 350px;

    h1 {
      color: #f57e68;
      margin-bottom: 25px;
    }

    input {
      border: 1px solid #f57e68;
      border-radius: 5px;
      width: 100%;
      margin-bottom: 15px;
      outline: none;
      color: #f57e68;
      font-weight: 600;
      height: 40px;
      padding-left: 5px;
      font-size: 1em;
    }

    button {
      border: none;
      padding: 10px;
      font-size: 1.2em;
      width: 100%;
      background-color: #f57e68;
      color: #fff;
      text-transform: uppercase;
      font-weight: 800;
      border-radius: 5px;
      margin-bottom: 15px;

      &:hover{
          cursor: pointer;
          opacity: .9;
      }
    }

    a{  
        color: #555;
        font-weight: 600;

        &:hover{
            color: #f57e68;
            cursor: pointer;
        }
    }

    p{
        margin-bottom: 15px;
    }
  }
}
</style>