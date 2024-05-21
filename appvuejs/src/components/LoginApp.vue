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
              <input type="password" class="form-control" id="password"
                v-model="password" required placeholder="Password">
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
    <div class="card login-card">
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
              <input type="password" class="form-control" id="password"
                v-model="password" required placeholder="Password">
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
  { username: "admin", password: "admin", email: "admin@admin.com" }
];

localStorage.setItem("users", JSON.stringify(users));

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
      isSmallScreen: false
    };
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
            break;
          }
        }
      }

      // Check authentication status
      if (isAuthenticated) {
        // Redirect to profile page with username and email as query parameters
        this.$router.push({ path: '/landing', query: { username: username, email: userEmail, password: password } });
        alert("Login successful");
      } else {
        alert("Login failed");
      }
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
  } // Add closing bracket here
};
</script>

<style scoped>
/* For small screens */
@media (max-width: 768px) {
  .app-container {
    display: block; /* Show the app container */
  }

  .login-card {
    width: 80%; /* Set a width for the card */
    max-width: 400px; /* Set a maximum width for responsiveness */
    padding-top: 150px; /* Add padding for spacing inside the card */
    padding-right: 10px;
    box-sizing: border-box; /* Include padding in the width calculation */
    border: none;
    position: fixed;
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
  outline: none; /* Remove the outline */
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