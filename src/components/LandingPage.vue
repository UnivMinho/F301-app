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
        @click="goToPage('manageInititives')" v-if="this.initiative">
        Equipa
      </b>

      <b class="btn btn-link fw-bold mt-3" :class="{ 'selected': currentPage === 'registerMoments' }"
        :style="{ color: currentPage === 'registerMoments' ? '#FF6F0F' : 'inherit' }"
        @click="goToPage('registerMoments')" v-if="this.initiative">
        Registar momentos
      </b>

      <b class="btn btn-link fw-bold mt-3" :class="{ 'selected': currentPage === 'dashboard' }"
        :style="{ color: currentPage === 'dashboard' ? '#FF6F0F' : 'inherit' }" @click="goToPage('dashboard')"
        v-if="this.initiative">
        Formulário recolhas
      </b>

      <b class="btn btn-link fw-bold mt-3" :class="{ 'selected': currentPage === 'historyPage' }"
        :style="{ color: currentPage === 'historyPage' ? '#FF6F0F' : 'inherit' }"
        @click="goToPage('historyPage')">Histórico Iniciativas</b>

      <b class="btn btn-link fw-bold mt-auto" @click="logout">
        <i class="fa fa-sign-out-alt"></i>
      </b>
    </div>

    <div class="content" :style="{ marginLeft: isSmallScreen ? '0' : '200px' }">
      <router-view></router-view>
      <!-- Initiative card -->
      <div v-if="!isOnLandingPage()" class="initiative-card">
        <div class="row">
          <div class="col-md-6">
            <div id="weather-info" class="weather-card text-center mb-4" @click="showWeatherForecast">
              <h2>{{ weatherData.name }}</h2>
              <h2>{{ currentDate }}</h2>
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
            <div v-if="initiative" class="card-body">
              <h1 class="card-title">{{ initiative.designacao }}</h1>
              <img :src="getInitiativeImage()" alt="Initiative Image" class="initiative-image">
              <h5 class="card-text fs-3">Responsável: {{ initiative.profissional }}</h5>
              <h5 class="card-text fs- mt-5 mb-4 highlighted">Quantidade recolhida: {{ initiative.materialRecolhido }}</h5>

              <!-- Participants and Material Status - only for mobile -->
              <div class="d-md-none">
                <div class="btnsMaterial mt-3">
                  <h2>Estado do Material:</h2>
                  <b-button id="levantado"
                    :class="{ 'active-button': this.initiative.estadoMaterial === 'Levantado', 'inactive-button': this.initiative.estadoMaterial !== 'Levantado' }"
                    variant="success" @click="manageMaterial('Levantado')">Levantado</b-button>

                  <b-button
                    :class="{ 'active-button': this.initiative.estadoMaterial === 'Devolvido', 'inactive-button': this.initiative.estadoMaterial !== 'Devolvido' }"
                    variant="danger" @click="manageMaterial('Devolvido')">Devolvido</b-button>
                </div>
              </div>
            </div>
            <div v-else class="card-body">
              <h2 class="card-title">Não tem iniciativas hoje.</h2>
            </div>
          </div>

          <!-- Participants and Material Status - only for desktop -->
          <div v-if="initiative" class="col-md-6 d-none d-md-block">
            <div class="btnsMaterial mt-1">
              <h2>Estado do Material:</h2>
              <b-button id="levantado"
                :class="{ 'active-button': this.initiative.estadoMaterial === 'Levantado', 'inactive-button': this.initiative.estadoMaterial !== 'Levantado' }"
                variant="success" @click="manageMaterial('Levantado')">Levantado</b-button>

              <b-button
                :class="{ 'active-button': this.initiative.estadoMaterial === 'Devolvido', 'inactive-button': this.initiative.estadoMaterial !== 'Devolvido' }"
                variant="danger" @click="manageMaterial('Devolvido')">Devolvido</b-button>
            </div>
          </div>

          <div v-if="initiative" class="col-md-6">
            <b-button @click="toggleParticipantsList" variant="primary" class="mt-3 img-fluid btnParticipantes">Ver
              Participantes</b-button>
            <div v-if="isParticipantsListOpen" class="participants-container mt-3">
              <div v-for="(voluntario, index) in this.voluntarios" :key="index" class="participant-card card p-3 mb-3">
                <div class="d-flex align-items-center">
                  <img :src="voluntario.foto || '/fotoperfil1.jpg'" alt="Profile image" class="rounded-circle"
                    width="50" height="50">
                  <div class="participant-details ms-3">
                    <h5 class="name">{{ voluntario.nome }}</h5>
                    <p class="email">{{ voluntario.email }}</p>
                    <i v-if="voluntario.present" class="fas fa-check-circle text-success"></i>
                    <i v-else class="fas fa-times-circle text-danger"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <b-button id="finishInitiative" v-if="initiative" @click="confirmEndInitiative" variant="primary"
          class="mt-4 mx-auto d-block btn-lm">
          Finalizar Iniciativa</b-button>
      </div>

    </div>

    <!-- Bottom navigation bar for mobile -->
    <nav class="bottom-navbar" v-if="isSmallScreen">
      <div class="navigation-links mt-2">
        <b class="btn btn-link fw-bold" :class="{ 'selected': currentPage === 'profile' }"
          :style="{ color: currentPage === 'profile' ? '#FF6F0F' : 'inherit' }" @click="goToPage('profile')">
          <img :src="profilePictureSrc" alt="Profile Picture" class="profile-pictureBottom" />
        </b>
        <router-link v-if="this.initiative" :to="{ name: 'manageInititives' }" class="btn btn-link fw-bold">
          <i class="fas fa-users"></i>
        </router-link>
        <router-link v-if="this.initiative" :to="{ name: 'registerMoments' }" class="btn btn-link fw-bold">
          <i class="fa-solid fa-camera"></i>
        </router-link>
        <router-link to="/landing" class="btn btn-link fw-bold" @click.native="refreshData">
          <i class="fa-solid fa-house"></i>
        </router-link>
        <router-link v-if="this.initiative" :to="{ name: 'dashboard' }" class="btn btn-link fw-bold">
          <i class="fa-brands fa-wpforms"></i>
        </router-link>
        <router-link :to="{ name: 'historyPage' }" class="btn btn-link fw-bold">
          <i class="fa-solid fa-clock-rotate-left"></i>
        </router-link>
        <b class="btn btn-link fw-bold" @click="logout">
          <i class="fa fa-sign-out-alt"></i>
        </b>
      </div>
    </nav>

    <!-- Modal de Aviso -->
    <b-modal id="warningModal" v-model="showWarningModal" hide-footer centered>
      <template #modal-title>
        <div class="d-flex align-items-center">
          <font-awesome-icon :icon="['fas', 'exclamation-triangle']" class="me-2 text-warning" />
          <span>Aviso</span>
        </div>
      </template>
      <div class="text-center">
        <font-awesome-icon :icon="['fas', 'exclamation-circle']" class="mb-3 text-warning" style="font-size: 3rem;" />
        <p class="my-4">{{ alertMessage }}</p>
        <b-button variant="warning" @click="closeWarningModal">OK</b-button>
      </div>
    </b-modal>

    <!-- Modal de Confirmação -->
    <b-modal id="endInitiativeModal" v-model="showEndInitiativeModal" title="Confirmar Finalização">
      <p class="my-4">Tem a certeza que quer terminar esta iniciativa?</p>

      <!-- Caixa de entrada de texto -->
      <b-form-group label-for="comment">
        <b-form-input id="comment" v-model="comment"
          placeholder="Introduza algumas anotações referentes à iniciativa."></b-form-input>
      </b-form-group>

      <template v-slot:modal-footer="{ cancel }">
        <b-button variant="danger" @click="endInitiative">Sim</b-button>
        <b-button variant="secondary" @click="cancel">Não</b-button>
      </template>
    </b-modal>

    <!-- Modal de Previsão do Tempo -->
    <b-modal id="weatherForecastModal" v-model="showWeatherForecastModal" title="Previsão do tempo nos próximos 5 dias">
      <div v-if="weatherForecastData">
        <div v-for="(forecast, index) in weatherForecastData.list" :key="index" class="forecast-item">
          <p>{{ formatDate(forecast.dt_txt) }}: {{ forecast.main.temp }}°C</p>
          <img :src="getWeatherIcon(forecast.weather[0].description)" class="forecast-icon" :alt="forecast.weather[0].description">
        </div>
      </div>
      <div v-else>
        <p>A carregar...</p>
      </div>
    </b-modal>
  </div>

</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css';
import profileDefault from '@/assets/fotoperfil2.jpg';
import { eventBus } from '@/eventBus.js';
import { BButton, BModal } from 'bootstrap-vue';

export default {
  components: {
    BButton,
    BModal
  },
  data() {
    return {
      isSmallScreen: false,
      currentPage: '',
      initiatives: [],
      initiative: '',
      voluntarios: [],
      weatherData: null,
      weatherForecastData: null,
      materiais: [],
      materialStatus: '',
      weatherIcon: '',
      currentDate: new Date().toISOString().split('T')[0],
      isParticipantsListOpen: false,
      imageSrc: null,
      profilePictureSrc: localStorage.getItem('profileImageData') || profileDefault,
      apiKey: '94a5314165f79d79b15389ec7c0254ed',
      showEndInitiativeModal: false,
      showWeatherForecastModal: false
    };
  },
  created() {
    // Listen for the profilePictureUpdated event
    eventBus.$on('profilePictureUpdated', this.updateProfilePicture);
    document.title = 'GoHelp App';
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.href = './img/icons/favicon-backoffice.png';
    document.head.appendChild(link);
  },
  computed: {
    loggedInUser() {
      return this.$root.loggedInUser;
    }
  },
  mounted() {
    this.checkScreenWidth();
    window.addEventListener('resize', this.checkScreenWidth);
    if (this.$route.name !== 'landing') {
      this.loadInitiative();
    }
  }, beforeDestroy() {
    // Ensure to remove the event listener when the component is destroyed
    eventBus.$off('profilePictureUpdated', this.updateProfilePicture);
    window.removeEventListener('resize', this.checkScreenWidth);
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
    formatName(name) {
      return name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    },
    checkScreenWidth() {
      this.isSmallScreen = window.innerWidth <= 768;
    },
    logout() {
      this.$router.push('/');
    },
    loadInitiative() {
      const storedInitiatives = JSON.parse(localStorage.getItem('currentInitiative'));
      console.log("Iniciativas", storedInitiatives);
      if (storedInitiatives) {
        this.initiatives = storedInitiatives;
        this.fetchWeather(); // Fetch weather after loading the initiative
        for (let i = 0; i < this.initiatives.length; i++) {
          if (this.initiatives[i].dia === this.currentDate && this.formatName(this.loggedInUser.username) === this.initiatives[i].profissional) {
            this.initiative = this.initiatives[i];
            this.voluntarios = this.initiatives[i].voluntarios;
            break;
          }
        }
        console.log('Current Initiative:', this.initiative);
      } else {
        this.createSampleInitiatives();
        console.log('Current Initiatives:', this.initiatives);
        localStorage.setItem('currentInitiative', JSON.stringify(this.initiatives));
        this.fetchWeather(); // Fetch weather after loading the initiative
      }
    },
    manageMaterial(status) {
      let materiais = JSON.parse(localStorage.getItem('materiais'));
      const nMesas = parseInt(this.initiative.numMesas, 10);
      const nSacos = parseInt(this.initiative.numSacos, 10);

      if (this.initiative.estadoMaterial !== null && this.initiative.estadoMaterial === status) {
        this.showWarningModal = true;
        this.alertMessage = "Você já realizou esta ação. Por favor, selecione outra opção.";
        return;
      }

      let mesas = parseInt(materiais[0].mesas, 10);
      let sacos = parseInt(materiais[1].sacos, 10);

      if (status === 'Levantado') {
        mesas -= nMesas;
        sacos -= nSacos;
      } else if (status === 'Devolvido') {
        mesas += nMesas;
        sacos += nSacos;
      }

      materiais[0].mesas = mesas;
      materiais[1].sacos = sacos;

      localStorage.setItem('materiais', JSON.stringify(materiais));

      this.initiative.estadoMaterial = status;

      localStorage.setItem('currentInitiative', JSON.stringify(this.initiatives));
    },
    handleStorageChange(event) {
      if (event.key === 'currentInitiative') {
        this.loadInitiative(); // Reload initiative data if it's changed in localStorage
      }
    },
    refreshData() {
      location.reload(); // Atualiza a página
    },
    createSampleInitiatives() {
      const initiative1 = {
        nome: "Carlos Campos",
        email: "carlos.campos@example.com",
        atividadeEscolhida: "Recolha de Alimentos",
        designacao: "Recolha de Alimentos",
        local: "Porto",
        numParticipantes: "30",
        dia: "2024-05-26",
        voluntarios: [
          { nome: "Ana", email: "ana.silva@example.com", foto: "/fotoperfil1.jpg", present: false },
          { nome: "Bruno", email: "bruno.martins@example.com", foto: "/fotoperfil1.jpg", present: false },
        ],
        profissional: "Carlos Campos",
        numMesas: "2",
        numSacos: "50",
        numVagas: "10",
        risco: "Baixo",
        estadoMaterial: "",
        materialRecolhido: '',
        estado: "Aceite",
        custoTotal: "200€",
        quantidade: '',
        mediaUrl: "/about-1.jpg",
        imagensIds: []
      };

      const initiative2 = {
        nome: "Carlos Campos",
        email: "carlos.campos@example.com",
        atividadeEscolhida: "Recolha de Roupa",
        designacao: "Recolha de Roupa",
        local: "Braga",
        numParticipantes: "20",
        dia: "2024-08-15",
        voluntarios: [
          { nome: "Eva Lima", email: "eva.lima@example.com", foto: "/fotoperfil1.jpg", present: false },
          { nome: "Fábio Neves", email: "fabio.neves@example.com", foto: "/fotoperfil2.jpg", present: false }
        ],
        profissional: "Carlos Campos",
        numMesas: "5",
        numSacos: "100",
        numVagas: "10",
        risco: "Médio",
        estadoMaterial: "",
        materialRecolhido: '',
        estado: "Aceite",
        custoTotal: "500€",
        quantidade: '',
        mediaUrl: "/about-1.jpg",
        imagensIds: []
      };

      const initiative3 = {
        nome: "Tiago Castro",
        email: "tiago.castro@example.com",
        atividadeEscolhida: "Recolha de Material Escolar",
        designacao: "Recolha de Material Escolar",
        local: "Guimarães",
        numParticipantes: "20",
        dia: "2024-05-26",
        voluntarios: [
          { nome: "António Santos", email: "antonio.santos@example.com", foto: "/fotoperfil1.jpg", present: false },
          { nome: "João Almeida", email: "joao.almeida@example.com", foto: "/fotoperfil2.jpg", present: false }
        ],
        profissional: "Tiago Castro",
        numMesas: "3",
        numSacos: "200",
        numVagas: "5",
        risco: "2",
        estadoMaterial: "",
        materialRecolhido: '',
        estado: "Aceite",
        custoTotal: "300€",
        quantidade: '',
        mediaUrl: "/about-1.jpg",
        imagensIds: []
      };

      const initiative4 = {
        nome: "Tiago Castro",
        email: "tiago.castro@example.com",
        atividadeEscolhida: "Campanha de Doação de Roupas",
        designacao: "Recolha de Roupas",
        local: "Porto",
        numParticipantes: "25",
        dia: "2024-05-15",
        voluntarios: [
          { nome: "Nuno Costa", email: "nuno.costa@example.com", foto: "/fotoperfil1.jpg", present: false },
          { nome: "Olga Ribeiro", email: "olga.ribeiro@example.com", foto: "/fotoperfil2.jpg", present: false }
        ],
        profissional: "Tiago Castro",
        numMesas: "4",
        numSacos: "150",
        numVagas: "5",
        risco: "Médio",
        estadoMaterial: "",
        materialRecolhido: '',
        estado: "Aceite",
        custoTotal: "250€",
        quantidade: '',
        mediaUrl: "/about-1.jpg",
        imagensIds: []
      };
      this.initiatives.push(initiative1, initiative2, initiative3, initiative4);
      localStorage.setItem('currentInitiative', JSON.stringify(this.initiatives));
    },
    fetchWeather() {
      // Verifica se há iniciativas e se há pelo menos uma iniciativa
      if (this.initiatives && this.initiatives.length > 0) {
        // Pega a primeira iniciativa para obter a cidade
        const city = this.initiatives[0].local;
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
      }
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
    getWeatherIcon(description) {
    const lowerDesc = description.toLowerCase();
    if (lowerDesc.includes('clear')) {
      return 'clear.png';
    } else if (lowerDesc.includes('clouds')) {
      return 'clouds.png';
    } else if (lowerDesc.includes('drizzle')) {
      return 'drizzle.png';
    } else if (lowerDesc.includes('rain')) {
      return 'rain.png';
    } else if (lowerDesc.includes('snow')) {
      return 'snow.png';
    } else if (lowerDesc.includes('mist') || lowerDesc.includes('fog')) {
      return 'mist.png';
    } else if (lowerDesc.includes('wind')) {
      return 'wind.png';
    } else {
      return 'default.png'; // Uma imagem padrão para outras condições
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
    },
    confirmEndInitiative() {
      this.showEndInitiativeModal = true;
    },
    endInitiative() {
      if (this.initiative && this.initiative.estado === "Aceite") {
        this.initiative.estado = "Finalizada";
        // Salvar a iniciativa atualizada no localStorage
        const storedInitiatives = JSON.parse(localStorage.getItem('currentInitiative'));
        const index = storedInitiatives.findIndex(initiative => initiative.data === this.initiative.data);
        if (index !== -1) {
          storedInitiatives[index] = this.initiative;
          localStorage.setItem('currentInitiative', JSON.stringify(storedInitiatives));
        }
        // Atualizar a exibição da iniciativa
        this.initiative = null; // Resetar a iniciativa atual
      }
      this.showEndInitiativeModal = false;
    },
    showWeatherForecast() {
      this.fetchWeatherForecast();
      this.showWeatherForecastModal = true;
    },
    fetchWeatherForecast() {
      if (this.weatherData) {
        const city = this.weatherData.name;
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}&units=metric`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            this.weatherForecastData = data;
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    },
    formatDate(datetime) {
      const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return new Date(datetime).toLocaleDateString('pt-PT', options);
    },
    getInitiativeImage() {
      switch (this.initiative.designacao) {
        case 'Recolha de Alimentos':
          return '/RecolhaAlimentos.png';
        case 'Recolha de Roupa':
          return '/recolhaRoupas';
        case 'Recolha de Material Escolar':
          return '/recolhaMaterialEscolar.png';
        default:
          return '/images/default_initiative.jpg';
      }
    }
  }
};
</script>

<style scoped>
/* Styles for weather forecast modal */
.forecast-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  padding: auto;
}

.forecast-icon {
  width: 35px;
  height: 35px;
  margin-right: 10px;
}

.btnParticipantes {
  border-radius: 8px;
  background: #FF6F0F;
  box-shadow: 2px 4px 4px 4px #001D23;
}

.btn-lm {
  box-shadow: 6px 8px 8px 8px #001D23;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 5rem;
}

/* Existing styles */
.initiative-card {
  margin-left: 3rem;
  padding: 100px;
  background-color: #adadad;
  color: white;
  border-radius: 8px;
  box-shadow: 5px 8px 8px 8px #001D23;
  cursor: pointer;
}

.initiative-image {
  width: 100%;
  height: auto;
  margin-top: 10px;
  border-radius: 20px;
  box-shadow: 5px 8px 8px 8px #001D23;
  margin-bottom: 30px;
}

.participant-card {
  display: flex;
  align-items: center;
  background-color: #334257;
  /* Cor de fundo do card */
  border-radius: 15px;
  margin: 10px 0;
  /* Espaçamento vertical entre os cards */
  padding: 10px;
  box-shadow: 0 10px 8px rgba(0, 0, 0, 0.1);
  /* Sombra sutil para o card */
  background: #001D23;
}

.participant-image img {
  width: 70px;
  /* Tamanho reduzido da imagem */
  height: 70px;
  border-radius: 50%;
  /* Imagem circular */
  margin-right: 10px;
  /* Espaço entre a imagem e os detalhes do texto */
}

.participant-details {
  flex-grow: 1;
  /* Faz com que ocupe o espaço restante */
  display: flex;
  justify-content: space-between;
  /* Alinha os detalhes e o ícone de status nas extremidades opostas */
  align-items: center;
  /* Centraliza verticalmente os detalhes e o ícone */
  margin-left: 20px;
  /* Space between the image and text details */
}


.highlighted {
  font-size: 2rem;
  /* Larger font size for key details */
  color: white;
  /* Green color for positive impact */
  font-weight: bold;
  /* Bold to highlight importance */
  padding: 10px;
  /* Added padding for visual emphasis */
  background: linear-gradient(to right, #001D23, #FF6F0F);
  /* Light background to stand out */
  border-radius: 8px;
  /* Rounded corners for aesthetic */
  margin-bottom: 20px;
  /* More space below for separation */
  box-shadow: 5px 8px 8px 8px #001D23;
}

.participant-details .name,
.participant-details .email {
  font-size: 1.1rem;
  /* Adjusted font size for readability */
}

.fas.fa-check-circle {
  color: #32CD32;
  /* Bright green for "present" icon */
}

.fas.fa-times-circle {
  color: #FF6347;
  /* Tomato red for "absent" icon */
}

.name,
.email {
  margin: 10px;
  /* Remove margens padrão */
  color: #fffbfb;
  /* Cor do texto para melhor leitura */
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

.sidebar .btn:hover {
  color: #FF6F0F;
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
  box-shadow: 5px 8px 8px 8px #001D23;
  cursor: pointer;
}

.weather-card h2 {
  color: white;
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

.btnsMaterial {
  margin-bottom: 15px;
}

.active-button {
  opacity: 1;
  font-weight: bold;
}

.inactive-button {
  opacity: 0.2;
}

#levantado {
  margin-right: 10px;
}

#finishInitiative {
  width: 200px;
}

/* Media queries */
@media (max-width: 1200px) {
  .initiative-card {
    padding: 80px;
  }

  .card-title {
    font-size: 2rem;
  }

  .highlighted {
    font-size: 1.5rem;
  }
}

@media (max-width: 992px) {
  .initiative-card {
    padding: 60px;
  }

  .card-title {
    font-size: 1.8rem;
  }

  .highlighted {
    font-size: 1.3rem;
  }

  .content {
    margin-left: 0;
    padding: 10px;
  }

  .humidity-wind {
    flex-direction: column;
  }

  .card-title {
    font-size: 1.5rem;
  }

  .highlighted {
    font-size: 1.2rem;
  }

  .participant-card {
    padding: 5px;
  }

  .participant-image img {
    width: 50px;
    height: 50px;
  }
}

@media (max-width: 768px) {
  .initiative-card {
    padding: 40px;
    margin-left: 0;
  }

  .content {
    margin-left: 0;
    padding: 10px;
  }

  .humidity-wind {
    flex-direction: column;
  }

  .card-title {
    font-size: 1.5rem;
  }

  .highlighted {
    font-size: 1.2rem;
  }

  .participant-card {
    padding: 5px;
  }

  .participant-image img {
    width: 50px;
    height: 50px;
  }
}

@media (max-width: 576px) {
  .initiative-card {
    padding: 20px;
  }

  .content {
    padding: 5px;
  }

  .card-title {
    font-size: 1.8rem;
    /* Maior que h5 */
  }

  .card-text.fs-3 {
    font-size: 1.2rem;
    /* Tamanho de h5 */
  }

  .highlighted {
    font-size: 1rem;
  }

  .participant-card {
    padding: 5px;
    flex-direction: column;
    /* Stack elements vertically */
    align-items: flex-start;
    /* Align items to the start */
  }

  .participant-image img {
    width: 40px;
    height: 40px;
    margin-right: 5px;
  }

  .participant-details {
    margin-left: 0;
    /* Reset margin */
    align-items: flex-start;
    /* Align text to the start */
    justify-content: flex-start;
    /* Align items to the start */
  }

  .participant-details .name,
  .participant-details .email {
    font-size: 0.9rem;
    /* Smaller font size */
  }

  .weather-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    background: linear-gradient(to right, #001D23, #FF6F0F);
    box-shadow: 5px 8px 8px 8px #001D23;
    color: white;
    border-radius: 10px;
    width: 100%;
    /* Make it full width for mobile */
  }

  .weather-icon {
    width: 50px;
    height: 50px;
    margin-top: 10px;
  }

  .weather-detail {
    margin-top: 10px;
  }

  .weather-detail p {
    font-size: 1em;
    margin: 5px 0;
  }

  .humidity-wind {
    margin-top: 10px;
    flex-direction: row;
    /* Keep row direction */
    justify-content: space-between;
    width: 100%;
  }

  .humidity-wind .container {
    display: flex;
    align-items: center;
    margin: 5px 0;
  }

  .humidity-wind img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }

  /* Move initiative details to the top */
  .card-body {
    order: 1;
  }

  /* Move buttons to the bottom */
  .btnsMaterial,
  #levantado,
  .participants-container,
  .btn-lm {
    order: 2;
  }
}
</style>
