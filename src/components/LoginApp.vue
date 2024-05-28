<template>
  <div>
    <div class="card login-card" v-if="isSmallScreen">
      <div class="card-body p-5">
        <h2 class="text-center mb-4 custom-heading">Login</h2>
        <form @submit.prevent="login">
          <div class="mb-3">
            <div class="input-with-icon">
              <font-awesome-icon :icon="['fas', 'user']" />
              <input type="text" class="form-control" id="username" v-model="username" required placeholder="Username">
            </div>
            <span v-if="emailError" class="error">{{ emailError }}</span>
          </div>
          <div class="mb-3">
            <div class="input-with-icon">
              <font-awesome-icon :icon="['fas', 'lock']" />
              <input type="password" class="form-control" id="password" v-model="password" required
                placeholder="Password">
            </div>
            <span v-if="passwordError" class="error">{{ passwordError }}</span>
          </div>
          <button type="submit" class="btn btn-custom-login w-100">Login</button>
          <div class="alert alert-danger d-none" id="loginError">Utilizador ou password inválidos.</div>
          <div class="text-center mt-4">
            <!--<a href="createaccount.html" class="btn btn-link">Criar conta</a>-->
            <router-link to="/forgotPassword" class="btn btn-link">Esqueceu a sua password?</router-link>
          </div>
        </form>
        <div class="text-center mt-4">
          <GoogleSigninButton :clientId="clientId" @onsuccess="onSuccess" @onerror="onError" />
        </div>
      </div>
    </div>
    <div class="app-container" v-else>
      <h1 class="fw-bold text-primary m-0" style="position: absolute; top: 6%; left: 2.6%; margin: 10px;">Go<span
          class="text-white">Help</span></h1>
      <div class="card login-card">
        <div class="card-body p-5">
          <h2 class="text-center mb-4 custom-heading">Login</h2>
          <form @submit.prevent="login">
            <div class="mb-3">
              <div class="input-with-icon">
                <font-awesome-icon :icon="['fas', 'user']" />
                <input type="text" class="form-control" id="username" v-model="username" required
                  placeholder="Username">
              </div>
              <span v-if="emailError" class="error">{{ emailError }}</span>
            </div>
            <div class="mb-3">
              <div class="input-with-icon">
                <font-awesome-icon :icon="['fas', 'lock']" />
                <input type="password" class="form-control" id="password" v-model="password" required
                  placeholder="Password">
              </div>
              <span v-if="passwordError" class="error">{{ passwordError }}</span>
            </div>
            <button type="submit" class="btn btn-custom-login w-100">Login</button>
            <div class="alert alert-danger d-none" id="loginError">Utilizador ou password inválidos.</div>
            <div class="text-center mt-4">
              <!--<a href="createaccount.html" class="btn btn-link">Criar conta</a>-->
              <router-link to="/forgotPassword" class="btn btn-link">Esqueceu a sua password?</router-link>
            </div>
          </form>
          <div class="text-center mt-4">
            <GoogleSigninButton :clientId="clientId" @onsuccess="onSuccess" @onerror="onError" />
          </div>
        </div>
      </div>
    </div>
    <!-- Modal de sucesso -->
    <b-modal id="loginSuccessModal" v-model="showSuccessModal" hide-footer centered>
      <template #modal-title>
        <div class="d-flex align-items-center">
          <font-awesome-icon :icon="['fas', 'check-circle']" class="me-2 text-success" />
          <span>Login</span>
        </div>
      </template>
      <div class="text-center">
        <font-awesome-icon :icon="['fas', 'thumbs-up']" class="mb-3 text-primary" style="font-size: 3rem;" />
        <p class="my-4">Login efetuado com sucesso!</p>
        <b-button variant="success" @click="closeSuccessModal">OK</b-button>
      </div>
    </b-modal>

    <!-- Modal de falha -->
    <b-modal id="loginFailedModal" v-model="showFailedModal" hide-footer centered>
      <template #modal-title>
        <div class="d-flex align-items-center">
          <font-awesome-icon :icon="['fas', 'times-circle']" class="me-2 text-danger" />
          <span>Login</span>
        </div>
      </template>
      <div class="text-center">
        <font-awesome-icon :icon="['fas', 'exclamation-triangle']" class="mb-3 text-danger" style="font-size: 3rem;" />
        <p class="my-4">Utilizador ou password inválidos.</p>
        <b-button variant="danger" @click="closeFailedModal">OK</b-button>
      </div>
    </b-modal>

  </div>
</template>

<script>
import { GoogleSigninButton } from 'vue-google-signin-button';
import logo from '@/assets/gh2.png';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(fas);

// users to test login
const users = [
  { username: "admin", password: "admin", email: "admin@admin.com" },
  { username: "tiago_castro", password: "tiago1234", email: "tiago@gohelp.com" },
  { username: "carlos_campos", password: "carlos1234", email: "carlos@gohelp.com" },
  { username: "joao_marques", password: "joao1234", email: "joao@gohelp.com" },
  { username: "vitor_fernandes", password: "vitor1234", email: "vitor@gohelp.com" },
  { username: "liliana_abreu", password: "liliana1234", email: "liliana@gohelp.com" }
];

localStorage.setItem("users", JSON.stringify(users));

const materiais = [
  { mesas: 30 },
  { sacos: 100 }
];

localStorage.setItem("materiais", JSON.stringify(materiais));

/* eslint-disable */
export default {
  components: {
    GoogleSigninButton,
    FontAwesomeIcon
  },
  data() {
    return {
      clientId: '522013438275-ck4u9vbd1hqgk1sb8ff29ui2clbikvlk.apps.googleusercontent.com',
      username: "",
      password: "",
      email: "",
      logoImg: logo,
      isSmallScreen: false,
      showSuccessModal: false, // Controla a exibição do modal de sucesso
      showFailedModal: false   // Controla a exibição do modal de falha
    };
  },
  created() {
    document.title = 'GoHelp App';
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.href = './img/icons/favicon-backoffice.png';
    document.head.appendChild(link);
  },
  mounted() {
    this.checkScreenWidth();
    window.addEventListener('resize', this.checkScreenWidth);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenWidth);
  },
  methods: {
    login() {
      // Get username and password from the data properties
      const username = this.username;
      const password = this.password;

      // Retrieve users from local storage
      const users = JSON.parse(localStorage.getItem("users"));

      // Initialize variables
      let isAuthenticated = false;
      let userEmail = '';

      // Check if users exist
      if (users) {
        // Iterate through users
        for (let i = 0; i < users.length; i++) {
          // Check if username and password match
          if (users[i].username === username && users[i].password === password) {
            // Set authentication status to true and get user's email
            isAuthenticated = true;
            userEmail = users[i].email;
            const loggedInUser = { username: this.username };
            this.$root.loggedInUser = loggedInUser;
            sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

            break;
          }
        }

        // Check authentication status
        if (isAuthenticated) {
          // Show success modal
          this.showSuccessModal = true;
        } else {
          // Show failed modal
          this.showFailedModal = true;
        }
      }
    },
    closeSuccessModal() {
      this.showSuccessModal = false;
      this.$router.push({ path: '/landing', query: { username: this.username, email: this.email, password: this.password } });
    },
    closeFailedModal() {
      this.showFailedModal = false;
    },
    forgotPassword() {
      // Handle forgot password logic here
    },
    handleInput() {
      // Handle input logic to show/hide password field
      const usernameInput = document.getElementById("username");
      const passwordInput = document.getElementById("password");

      if (usernameInput.value.trim().length > 0) {
        passwordInput.classList.add("hidden");
      } else {
        passwordInput.classList.remove("hidden");
      }
    },
    onSuccess(googleUser) {
      // Handle successful login
      console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    },
    onError(error) {
      // Handle error
      console.error('Google sign-in error:', error);
    },
    checkScreenWidth() {
      this.isSmallScreen = window.innerWidth <= 768;
    },
  }
};
</script>


<style scoped>
/* For small screens */
@media (max-width: 768px) {
  .app-container {
    display: flex;
    align-content: center;

  }

  .login-card {
    width: 80%;
    max-width: 400px;
    padding-top: 150px;
    box-sizing: border-box;
    border: none;
  }
}



.custom-heading {
  font-family: "Saira", sans-serif;
  font-weight: bold;
}

.app-container {
  background-image: linear-gradient(rgba(0, 29, 35, 0.8), rgba(0, 29, 35, 0.8)), url('~@/assets/walpaper.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  min-height: 100vh;
  /* Ensure at least the height of the viewport */
  display: flex;
  justify-content: center;
  align-items: center;
}

.input-with-icon {
  display: flex;
  align-items: center;
  /* Center the items vertically */
  justify-content: center;
  /* Center the items horizontally */
  position: relative;
}

.custom-text {
  font-weight: bold;
  color: #fff;
  margin: 0;
  -webkit-text-stroke: 1px #000;
  font-family: "Saira", sans-serif;
}

#username,
#password {
  border-radius: 5px;
  border: none;
  border-bottom: 1px solid #8d8d8d;
  border-radius: 0;
  background: transparent;
  width: 80%;
  margin-left: 10px;
  outline: none;
}

#username:focus,
#password:focus {
  outline: none;
  /* Remove the outline */
  border: none;
}

.card.login-card {
  background-color: rgba(255, 255, 255, 0.7);
  /* Adjust opacity here */
  border-radius: 0.5rem;
  width: 500px;
  margin: auto;
}

/* Remove hover effect from login card */
.login-card:hover {
  transform: none;
  /* Reset the transformation on hover */
}

.login-title {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  -webkit-text-stroke: 1px #000;
  font-family: Mitr, sans-serif;
  align-self: center;
  margin-top: 47px;
}

.input-group {
  margin-top: 60px;
  align-self: center;
}

.input-field {
  width: 100%;
  padding: 8px;
  border: none;
  background-color: transparent;
  margin-top: 0px;
  font-size: 16px;
  color: #333;
  outline: none;
}

.input-underline {
  border: 1px solid rgba(97, 97, 97, 1);
  background-color: #616161;
  margin-top: 2px;
  height: 1px;
}

.forgot-password {
  color: rgba(56, 56, 56, 0.74);
  letter-spacing: 0.4px;
  margin: 6px 0 0 18px;
  font: italic 400 8px Arimo Hebrew Subset Italic, -apple-system, Roboto,
    Helvetica, sans-serif;
  background: none;
  cursor: pointer;
  border: none;
}

.btn-custom-login {
  background-color: #f97316;
  /* Cor laranja; ajuste para a cor exata que você precisa */
  border: none;
  /* Sem borda */
  border-radius: 50px;
  /* Cantos arredondados */
  padding: 10px 24px;
  /* Espaçamento interno para tamanho do botão */
  color: white;
  /* Cor do texto */
  font-size: 20px;
  /* Tamanho do texto */
  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);
  /* Sombra suave (opcional) */
  transition: background-color 0.2s;
  /* Transição suave para o hover (opcional) */
}

.btn-custom-login:hover {
  background-color: #fff;
  /* Cor laranja mais clara no hover; ajuste conforme necessário */
}

.btn-custom-login:active {
  background-color: #ea580c;
  /* Cor laranja mais escura ao clicar; ajuste conforme necessário */
}

.decorative-icon {
  aspect-ratio: 1.09;
  object-fit: auto;
  object-position: center;
  width: 25px;
  align-self: center;
  margin-top: 6px;
}
</style>
