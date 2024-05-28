<template>
  <div>
    <h1 class="display-2 mb-3 mt-5">Formulário de Recolha</h1>
    <div class="main-bg">
      <div class="container py-4">
        <div class="row">
          <div class="col-md-4 offset-md-4">
            <b-card class="card">
              <template>
                <img :src="initiativeImage" class="card-img-top" :alt="initiativeAltText">
                <h5 class="card-title">
                  <template v-if="selectedInitiative.tipo === 'Recolha de alimentos'">
                    <font-awesome-icon :icon="['fas', 'utensils']" />
                  </template>
                  <template v-else-if="selectedInitiative === 'clothes'">
                    <font-awesome-icon :icon="['fas', 'shirt']" />
                  </template>
                  <template v-else-if="selectedInitiative === 'schoolMaterial'">
                    <font-awesome-icon :icon="['fas', 'book']" />
                  </template>
                  <template v-else>
                    {{ selectedInitiative.charAt(0).toUpperCase() + selectedInitiative.slice(1) }}
                  </template>
                </h5>
                <div class="input-with-margin">
                  <b-form-input v-model="quantidade" :placeholder="placeholderText" size="20"></b-form-input>
                </div>
                <b-button id="submit-button" variant="success" @click="saveData()">Guardar Registo</b-button>
                <b-alert v-model="showAlert" variant="danger" dismissible fade>
                  O valor inserido não é um número.
                </b-alert>
              </template>
            </b-card>
          </div>
        </div>
      </div>
    </div>
    <!-- Popup de alerta -->
    <b-modal id="successModal" v-model="showSuccessModal" hide-footer centered>
      <template #modal-title>
        <div class="d-flex align-items-center">
          <font-awesome-icon :icon="['fas', 'check-circle']" class="me-2 text-success" />
          <span>Sucesso</span>
        </div>
      </template>
      <div class="text-center">
        <font-awesome-icon :icon="['fas', 'thumbs-up']" class="mb-3 text-primary" style="font-size: 3rem;" />
        <p class="my-4">{{ alertMessage }}</p>
        <b-button variant="success" @click="closeSuccessModal">OK</b-button>
      </div>
    </b-modal>

    <!-- Modal de erro -->
    <b-modal id="errorModal" v-model="showErrorModal" hide-footer centered>
      <template #modal-title>
        <div class="d-flex align-items-center">
          <font-awesome-icon :icon="['fas', 'exclamation-circle']" class="me-2 text-danger" />
          <span>Erro</span>
        </div>
      </template>
      <div class="text-center">
        <font-awesome-icon :icon="['fas', 'thumbs-down']" class="mb-3 text-danger" style="font-size: 3rem;" />
        <p class="my-4">{{ alertErrorMessage }}</p>
        <b-button variant="danger" @click="closeErrorModal">OK</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import cardFood from '@/assets/Alimentos_1.jpg';
import cardClothes from '@/assets/Roupa_1.jpg';
import cardSchoolMaterial from '@/assets/Mat.escolar_1.jpg';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(fas);

export default {
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      initiatives: [],
      selectedInitiative: '',
      quantidade: '',
      currentDate: new Date().toISOString().split('T')[0], // Get current date in YYYY-MM-DD format
      cardImages: {
        Recolha: cardFood,
        clothes: cardClothes,
        schoolMaterial: cardSchoolMaterial
      },
      showSuccessModal: false, // Flag para mostrar ou ocultar o modal de sucesso
      showErrorModal: false, // Flag para mostrar ou ocultar o modal de erro
      alertMessage: '' // Mensagem exibida no modal de sucesso
    };
  },
  mounted() {
    this.loadInitiative();
  },
  computed: {
    initiativeImage() {
      if (this.selectedInitiative === 'Recolha de Alimentos')
        return this.cardImages['Recolha'];
      else if (this.selectedInitiative === 'Recolha de Roupa')
        return this.cardImages['clothes'];
      else if (this.selectedInitiative === 'Recolha de Material Escolar')
        return this.cardImages['schoolMaterial'];
      return '';
    },
    initiativeAltText() {
      return this.selectedInitiative.charAt(0).toUpperCase() + this.selectedInitiative.slice(1) + ' Image'; // Generate alt text based on the selected initiative
    },
    placeholderText() {
      if (this.selectedInitiative === 'Recolha de Alimentos' || this.selectedInitiative === 'Recolha de Roupa') {
        return 'Quantidade (kg)';
      } else if (this.selectedInitiative === 'Recolha de Material Escolar') {
        return 'Peças';
      } else {
        return 'Quantidade';
      }
    }
  },
  methods: {
    saveData() {
      console.log('Data saved successfully!');
      const storedInitiatives = JSON.parse(localStorage.getItem('currentInitiative'));
      if (storedInitiatives && this.quantidade.trim() !== '') {
        // Verificar se a quantidade é um número
        if (isNaN(this.quantidade)) {
          this.alertErrorMessage = 'Introduza um valor numérico!';
          this.showErrorModal = true;
          return;
        }

        for (let i = 0; i < storedInitiatives.length; i++) {
          if (storedInitiatives[i].dia === this.currentDate) {
            storedInitiatives[i].materialRecolhido = this.quantidade;
            // Configurar o modal de sucesso
            this.alertMessage = 'Quantidade introduzida com sucesso!';
            this.showSuccessModal = true;
            break;
          }
        }
        console.log("quantidade" + this.quantidade)
        localStorage.setItem('currentInitiative', JSON.stringify(storedInitiatives));
        this.quantidade = ''; // Limpar o campo de entrada
      }
    },
    closeErrorModal() {
      this.showErrorModal = false;
    },
    closeSuccessModal() {
      this.showSuccessModal = false;
    },
    loadInitiative() {
      const storedInitiatives = JSON.parse(localStorage.getItem('currentInitiative'));
      if (storedInitiatives) {
        for (let i = 0; i < storedInitiatives.length; i++) {
          if (storedInitiatives[i].dia === this.currentDate) {
            this.selectedInitiative = storedInitiatives[i].designacao;
            console.log("Iniciativas a funcionar: ", this.selectedInitiative)
            break;
          }
        }
      }
    },
    isEqual(date1, date2) {
      return date1 === date2;
    },
  }
};
</script>

<style scoped>
.px-2 {
  padding-right: 0.5rem;
}

.input-with-margin {
  margin-top: 10px;
}

#submit-button {
  margin-top: 20px;
}

.card {
  border: 1px solid #e2e2e2;
  border-radius: 5px;
  align-self: center;
}

.card-title {
  text-align: center;
  margin-top: 5px;
}
</style>
