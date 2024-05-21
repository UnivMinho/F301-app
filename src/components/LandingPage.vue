<template>
  <div class="app-container">
    <!-- Sidebar for desktop -->
    <div class="sidebar" v-if="!isSmallScreen">
      <!-- Sidebar content -->
      <router-link to="/landing" class="brand" @click.native="refreshData">
        <h1 class="fw-bold text-primary mt-5">
          Go<span class="text-white">Help</span>
        </h1>
      </router-link>

      <!-- Display the profile picture -->
      <b class="btn btn-link fw-bold mt-3" :class="{ 'selected': currentPage === 'profile' }"
        :style="{ color: currentPage === 'profile' ? '#FF6F0F' : 'inherit' }" @click="goToPage('profile')">
        <!-- Display the profile picture inside a circle -->
        <img :src="profilePictureSrc" alt="Profile Picture" class="profile-picture" />
      </b>

      <b class="btn btn-link fw-bold mt-5" :class="{ 'selected': currentPage === 'manageInititives' }"
        :style="{ color: currentPage === 'manageInititives' ? '#FF6F0F' : 'inherit' }"
        @click="goToPage('manageInititives')">Equipa</b>

      <b class="btn btn-link fw-bold mt-3" :class="{ 'selected': currentPage === 'registerMoments' }"
        :style="{ color: currentPage === 'registerMoments' ? '#FF6F0F' : 'inherit' }"
        @click="goToPage('registerMoments')">Registar momentos</b>

      <b class="btn btn-link fw-bold mt-3" :class="{ 'selected': currentPage === 'dashboard' }"
        :style="{ color: currentPage === 'dashboard' ? '#FF6F0F' : 'inherit' }"
        @click="goToPage('dashboard')">Formulário recolhas</b>

      <b class="btn btn-link fw-bold mt-3" :class="{ 'selected': currentPage === 'historyPage' }"
        :style="{ color: currentPage === 'historyPage' ? '#FF6F0F' : 'inherit' }"
        @click="goToPage('historyPage')">Histórico Iniciativas</b>

      <b class="btn btn-link fw-bold mt-auto" @click="logout">
        <i class="fa fa-sign-out-alt"></i>
      </b>
    </div>

    <!-- Content -->
    <div class="content" :style="{ marginLeft: isSmallScreen ? '0' : '200px' }">
      <router-view></router-view>
      <!-- Initiative card appears only if there's an initiative and on the landing page -->
      <div v-if="!isOnLandingPage()" class="card initiative-card">
        <div class="row">
          <div class="col-md-6">
            <div id="weather-info" class="weather-card text-center mb-4">
              <h2>{{ weatherData.name }}</h2>
              <img :src="weatherIcon" :alt="weatherData.weather[0].description" class="weather-icon">
              <div class="weather-detail">
                <p>{{ weatherData.main.temp }}°C</p>
                <div class="humidity-wind">
                  <div class="container">
                    <img src="/humidity.png" alt="Humidity Icon">
                    <p>{{ weatherData.main.humidity }}% Humidade</p>
                  </div>
                  <div class="container">
                    <img src="/wind.png" alt="Wind Icon">
                    <p>Vento: {{ weatherData.wind.speed }} km/h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card-body">
              <h2 class="card-title">{{ initiative.designacao }}</h2>
              <h5 class="card-text fs-3">Data: {{ initiative.data }}</h5>
              <h5 class="card-text fs-3">Responsável: {{ initiative.nomeResponsavel }}</h5>
              <h5 class="card-text fs-3 bold mt-3 mb-3">Tipo de iniciativa:</h5>
              <h5 class="card-text fs-3 mt-3 mb-3">{{ initiative.tipo }}</h5>
              <h5 class="card-text fs- mt-5 mb-5 highlighted">Quantidade recolhida: {{ initiative.materialRecolhido }}</h5>
              <b-button @click="toggleParticipantsList" variant="primary">Ver Participantes</b-button>
              <div v-if="isParticipantsListOpen" class="participants-container mt-3">
                <div v-for="(participant, index) in initiative.listaParticipantes" :key="index" class="participant-card card p-2 mb-2">
                  <div class="d-flex align-items-center">
                    <img :src="participant.foto || '/fotoperfil1.jpg'" alt="Profile image" class="rounded-circle" width="50" height="50">
                    <div class="participant-details ms-3">
                      <h5 class="name">{{ participant.nome }}</h5>
                      <p class="email">{{ participant.email }}</p>
                      <i v-if="participant.present" class="fas fa-check-circle text-success"></i>
                      <i v-else class="fas fa-times-circle text-danger"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Bottom navigation bar for mobile -->
    <nav class="bottom-navbar" v-if="isSmallScreen">
      <!-- Navigation links container -->
      <div class="navigation-links mt-2">
        <b class="btn btn-link fw-bold" :class="{ 'selected': currentPage === 'profile' }"
          :style="{ color: currentPage === 'profile' ? '#FF6F0F' : 'inherit' }" @click="goToPage('profile')">
          <!-- Display the profile picture inside a circle -->
          <img :src="profilePictureSrc" alt="Profile Picture" class="profile-pictureBottom" />
        </b>
        <b class="btn btn-link fw-bold" @click="goToPage('manageInititives')">
          <i class="fas fa-users"></i>
        </b>
        <b class="btn btn-link fw-bold" @click="goToPage('registerMoments')">
          <i class="fa-solid fa-camera"></i>
        </b>
        <b class="btn btn-link fw-bold" @click="goToPage('dashboard')">
          <i class="fa-brands fa-wpforms"></i>
        </b>
        <b class="btn btn-link fw-bold" @click="goToPage('historyPage')">
          <i class="fa-solid fa-clock-rotate-left"></i>
        </b>
        <b class="btn btn-link fw-bold" @click="logout">
          <i class="fa fa-sign-out-alt"></i>
        </b>
      </div>
    </nav>
  </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css';
import profileDefault from '@/assets/fotoperfil2.jpg';
import { eventBus } from '@/eventBus.js';
import { BButton } from 'bootstrap-vue';

export default {
  components: {
    BButton
  },
  data() {
    return {
      isSmallScreen: false,
      currentPage: '',
      initiative: null,
      weatherData: null,
      weatherIcon: '',
      isParticipantsListOpen: false,
      imageSrc: null, // Initialize imageSrc property
      profilePictureSrc: localStorage.getItem('profileImageData') || profileDefault,
      apiKey: '94a5314165f79d79b15389ec7c0254ed' // Use a sua API key aqui
    };
  },
  created() {
    // Listen for the profilePictureUpdated event
    eventBus.$on('profilePictureUpdated', this.updateProfilePicture);
  },
  beforeDestroy() {
    // Ensure to remove the event listener when the component is destroyed
    eventBus.$off('profilePictureUpdated', this.updateProfilePicture);
    window.removeEventListener('resize', this.checkScreenWidth);
  },
  mounted() {
    this.checkScreenWidth();
    window.addEventListener('resize', this.checkScreenWidth);
    // Load initiative only if on the landing page
    if (this.$route.name !== 'landing') {
      this.loadInitiative();
    }
  },
  methods: {
    goToPage(pageName) {
      this.$router.push({ name: pageName })
        .catch(err => {
          if (err.name !== 'NavigationDuplicated') {
            throw err;
          }
        });
      this.currentPage = pageName;
    },
    isOnLandingPage() {
      return this.$route.name === 'historyPage' || this.$route.name === 'manageInititives' || this.$route.name === 'registerMoments' || this.$route.name === 'dashboard' || this.$route.name === 'profile';
    },
    checkScreenWidth() {
      this.isSmallScreen = window.innerWidth <= 768;
    },
    logout() {
      this.$router.push('/');
    },
    loadInitiative() {
      const storedInitiative = localStorage.getItem('currentInitiative');
      if (storedInitiative) {
        this.initiative = JSON.parse(storedInitiative);
        this.fetchWeather(); // Fetch weather after loading the initiative
      } else {
        this.initiative = this.createSampleInitiative();
        localStorage.setItem('currentInitiative', JSON.stringify(this.initiative));
        this.fetchWeather(); // Fetch weather after loading the initiative
      }
      
    },
    handleStorageChange(event) {
      if (event.key === 'currentInitiative') {
        this.loadInitiative(); // Reload initiative data if it's changed in localStorage
      }
    },
    refreshData() {
      location.reload(); // Atualiza a página
    },
    createSampleInitiative() {
      return {
        nomeResponsavel: "Tiago Castro",
        email: "tiago.castro@example.com",
        tipo: "Recolha de alimentos",
        designacao: "Campanha de Alimentos 2024",
        local: "Centro Comunitário da Boa Vontade",
        cidade: "Guimarães",
        numeroParticipantes: "10",
        data: "2024-05-01",
        numeroVagas: "5",
        materialUtilizado: "Mesas e cadeiras",
        materialRecolhido: "0",
        listaParticipantes: [
          { nome: "Tiago Castro", email: "tiago@example.com", foto: "/fotoperfil1.jpg" },
          { nome: "Chega-me isto", email: "carlos@example.com", foto: "/fotoperfil2.jpg" },
          { nome: "Chega-me isto", email: "carlos@example.com", foto: "/fotoperfil1.jpg" },
          { nome: "Chega-me isto", email: "carlos@example.com", foto: "/fotoperfil2.jpg" }
        ],
        mediaUrl: "/about-1.jpg"
      };
    },
    fetchWeather() {
      const city = this.initiative.cidade;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`;
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('City not found');
          }
          return response.json();
        })
        .then(data => {
          this.weatherData = data;
          this.setWeatherIcon();
        })
        .catch(error => {
          console.error('Error:', error);
          alert(error.message);
        });
    },
    setWeatherIcon() {
      const weatherDescription = this.weatherData.weather[0].description.toLowerCase();
      if (weatherDescription.includes('clear')) {
        this.weatherIcon = 'clear.png';
      } else if (weatherDescription.includes('clouds')) {
        this.weatherIcon = 'clouds.png';
      } else if (weatherDescription.includes('drizzle')) {
        this.weatherIcon = 'drizzle.png';
      } else if (weatherDescription.includes('rain')) {
        this.weatherIcon = 'rain.png';
      } else if (weatherDescription.includes('snow')) {
        this.weatherIcon = 'snow.png';
      } else if (weatherDescription.includes('mist') || weatherDescription.includes('fog')) {
        this.weatherIcon = 'mist.png';
      } else if (weatherDescription.includes('wind')) {
        this.weatherIcon = 'wind.png';
      } else {
        this.weatherIcon = 'default.png'; // Uma imagem padrão para outras condições
      }
    },
    toggleParticipantsList() {
      this.isParticipantsListOpen = !this.isParticipantsListOpen;
    },
    loadFile(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageSrc = e.target.result;
          // Save the image data to local storage if needed
          localStorage.setItem('profileImageData', e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    updateProfilePicture(updatedProfilePicture) {
      // Update the profile picture source
      this.profilePictureSrc = updatedProfilePicture;
    }
  }
};
</script>

<style scoped>
/* Existing styles */
.initiative-card {
  margin-left: 3rem;
  padding: 100px;
  background-color: #adadad;
  color: white;
  border-radius: 8px;
  box-shadow: 4px 8px rgba(0, 0, 0, 0.1);
}
.participant-card {
  display: flex;
  align-items: center;
  background-color: #334257; /* Cor de fundo do card */
  border-radius: 8px;
  margin: 10px 0; /* Espaçamento vertical entre os cards */
  padding: 10px;
  box-shadow: 0 10px 8px rgba(0, 0, 0, 0.1); /* Sombra sutil para o card */
  background: #001D23;
}

.participant-image img {
  width: 70px; /* Tamanho reduzido da imagem */
  height: 70px;
  border-radius: 50%; /* Imagem circular */
  margin-right: 10px; /* Espaço entre a imagem e os detalhes do texto */
}

.participant-details {
  flex-grow: 1; /* Faz com que ocupe o espaço restante */
  display: flex;
  justify-content: space-between; /* Alinha os detalhes e o ícone de status nas extremidades opostas */
  align-items: center; /* Centraliza verticalmente os detalhes e o ícone */

}
.card-title {
  font-size: 2.5rem; /* Increase the size to give more emphasis */
  color: #001D23; /* Orange color to make the title pop */
  font-weight: bold; /* Bold font weight to add emphasis */
}

.highlighted {
  font-size: 2rem; /* Larger font size for key details */
  color: #4CAF50; /* Green color for positive impact */
  font-weight: bold; /* Bold to highlight importance */
  padding: 10px; /* Added padding for visual emphasis */
  background-color: #f0f0f0; /* Light background to stand out */
  border-radius: 8px; /* Rounded corners for aesthetic */
  margin-bottom: 20px; /* More space below for separation */
}

.participant-details {
  margin-left: 20px; /* Space between the image and text details */
  flex-grow: 1; /* Allow details to fill available space */
}



.participant-details .name, .participant-details .email {
  font-size: 1.1rem; /* Adjusted font size for readability */
}

.fas.fa-check-circle {
  color: #32CD32; /* Bright green for "present" icon */
}

.fas.fa-times-circle {
  color: #FF6347; /* Tomato red for "absent" icon */
}
.name, .email {
  margin: 10px; /* Remove margens padrão */
  color: #fffbfb; /* Cor do texto para melhor leitura */
}

.sidebar {
  top: 0;
  margin: auto;
  width: 250px;
  height: 100vh;
  overflow-y: auto;
  position: fixed;
  left: 0;
  background-color: #001D23;
  color: white;
  display: flex;
  flex-direction: column;
  z-index: 1000;
}
.mobile-bottom {
  width: 100%;
  height: 60px;
  bottom: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: space-around;
}
.content {
  flex: 1;
  margin-left: 200px;
  padding: 20px;
}
.bottom-navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #001D23;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  z-index: 1000;
}
.bottom-navbar .nav-link {
  color: white;
  text-decoration: none;
  padding: 5px 10px;
}
.bottom-navbar .nav-link:hover {
  color: #FF6F0F;
}
.navigation-links {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 10px;
}
.btn {
  color: white;
  text-decoration: none;
  padding: 5px 10px;
}
.profile-picture {
  width: 7rem;
  height: 7rem;
  object-fit: cover;
  box-shadow: 0 0 10px 0 rgba(255, 255, 255, .35);
  border: 0.2rem solid #FF6F0F;
  border-radius: 50%;
}
.profile-pictureBottom {
  width: 25px;
  height: 25px;
  object-fit: cover;
  box-shadow: 0 0 10px 0 rgba(255, 255, 255, .35);
  border: 2px solid #FF6F0F;
  border-radius: 50%;
}
.brand {
  text-align: center;
  margin-top: 20px;
}
/* New styles for weather card */
.weather-card {
  background: linear-gradient(to right, #001D23, #FF6F0F);
  color: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.2);
}
.weather-icon {
  width: 100px;
  height: 100px;
  margin-top: 20px;
}
.weather-detail {
  margin-top: 20px;
}
.weather-detail p {
  font-size: 1.5em;
  margin: 10px 0;
}
.humidity-wind {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.humidity-wind .container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.humidity-wind img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
</style>