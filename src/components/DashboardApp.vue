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
                  <template v-if="initiative.tipo === 'Recolha de alimentos'">
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
                <b-button id="submit-button" variant="success" @click="saveData">Guardar Registo</b-button>
              </template>
            </b-card>
          </div>
        </div>
      </div>
    </div>
    <!-- Popup de alerta -->
    <b-alert v-model="showAlert" :variant="alertVariant" dismissible fade>
      {{ alertMessage }}
    </b-alert>
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
      selectedInitiative: '',
      quantidade: '',
      cardImages: {
        Recolha: cardFood,
        clothes: cardClothes,
        schoolMaterial: cardSchoolMaterial
      },
      showAlert: false, // Flag para mostrar ou ocultar o alerta
      alertVariant: '', // Variante do alerta (success, warning, etc.)
      alertMessage: '' // Mensagem exibida no alerta
    };
  },
  mounted() {
    this.loadInitiative();
  },
  computed: {
    initiativeImage() {
      if(this.selectedInitiative === 'Recolha de alimentos')
        return this.cardImages['Recolha'];
      else if (this.selectedInitiative === 'Recolha de roupas')
        return this.cardImages['clothes'];
      else if (this.selectedInitiative === 'Recolha de material escolar')
        return this.cardImages['schoolMaterial']; 
        return ''; 
    },
    initiativeAltText() {
      return this.selectedInitiative.charAt(0).toUpperCase() + this.selectedInitiative.slice(1) + ' Image'; // Generate alt text based on the selected initiative
    },
    placeholderText() {
      if (this.selectedInitiative === 'Recolha de alimentos' || this.selectedInitiative === 'Recolha de roupas') {
        return 'Quantidade (kg)';
      } else if (this.selectedInitiative === 'Recolha de material escolar') {
        return 'Peças';
      } else {
        return 'Quantidade';
      }
    }
  },
  methods: {
    saveData() {
      console.log('Data saved successfully!');
      let initiative = JSON.parse(localStorage.getItem('currentInitiative'));
      if (initiative && this.quantidade.trim() !== '') {
        initiative.materialRecolhido = this.quantidade;
        localStorage.setItem('currentInitiative', JSON.stringify(initiative));
        this.quantidade = '';
        // Configurar o alerta
        this.alertVariant = 'success';
        this.alertMessage = 'Quantidade introduzida com sucesso!';
        this.showAlert = true;
        // Ocultar o alerta após alguns segundos
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
      }
    },
  loadInitiative() {
    const storedInitiative = localStorage.getItem('currentInitiative');
    if (storedInitiative) {
      this.initiative = JSON.parse(storedInitiative);
      console.log('Current Initiative:', this.initiative);
      console.log(this.initiative.tipo);
      this.selectedInitiative = this.initiative.tipo;
    } else {
      // Handle the case when there's no stored initiative
      console.log('No stored initiative found.');
    }
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