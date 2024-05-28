<template>
  <div>
    <h1 class="display-2 mb-3 mt-5">Gestor de presenças</h1>
    <div class="main-bg mt-5">
      <div class="container py-4">
        <div class="row">
          <div v-for="(profissional, index) in profissionais" :key="index" class="col-md-3 mb-4">
            <div class="our-team">
              <div class="picture">
                <img class="img-fluid" :src="profissional.foto || '/perfil.jpg'">
              </div>
              <div class="team-content">
                <h3 class="name">{{ profissional.nome }}</h3>
                <h4 class="title">{{ profissional.area }}</h4>
              </div>
              <b-button :class="{ 'active-button': profissional.present, 'inactive-button': !profissional.present }"
                variant="success" @click="markPresent(profissional, index)">Presente</b-button>
              <b-button :class="{ 'active-button': !profissional.present, 'inactive-button': profissional.present }"
                variant="danger" @click="markAbsent(profissional, index)">Ausente</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profissionais: [],
      initiatives: [],
      currentDate: new Date().toISOString().split('T')[0],
    };
  },
  computed: {
    loggedInUser() {
      return this.$root.loggedInUser;
    }
  },
  mounted() {
    this.loadProfissionais();
  },
  methods: {
    loadProfissionais() {
      const storedInitiatives = JSON.parse(localStorage.getItem('currentInitiative'));
      const loggedInUsername = this.formatName(this.loggedInUser.username);
      console.log("formatado: ", loggedInUsername);
      if (storedInitiatives) {
        const filteredInitiatives = storedInitiatives.filter(initiative => {
          return initiative.profissional === loggedInUsername && initiative.dia === this.currentDate;
        });

        if (filteredInitiatives.length > 0) {
          this.profissionais = filteredInitiatives[0].voluntarios.map(p => ({
            ...p,
            present: p.present !== undefined ? p.present : false // Ensure the 'present' field exists
          }));
        }
      }
      console.log("PROFISSIONAIS: ", this.profissionais);
    },
    formatName(name) {
      return name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    },
    saveData() {
      const storedInitiatives = JSON.parse(localStorage.getItem('currentInitiative'));
      const initiative = storedInitiatives.find(initiative => initiative.dia === this.currentDate);
      initiative.voluntarios = this.profissionais;
      localStorage.setItem('currentInitiative', JSON.stringify(storedInitiatives));
    },
    markPresent(profissional, index) {
      this.profissionais[index].present = true;
      this.saveData();
    },
    markAbsent(profissional, index) {
      this.profissionais[index].present = false;
      this.saveData();
    },
  },

};
</script>


<style scoped>
.active-button {
  opacity: 1;
  font-weight: bold;
}

.inactive-button {
  opacity: 0.2;
}

.our-team {
  padding: 15px 0 10px;
  background-color: #596a6d;
  text-align: center;
  overflow: hidden;
  position: relative;
  border-radius: 30px;
  transition: transform 0.3s ease-in-out;
  background-color: #001D23;
  margin-bottom: 2rem;
}

.our-team h3 {
  color: aliceblue;
}

.our-team .picture {
  display: inline-block;
  height: 160px;
  width: 140px; /* Ajuste para tornar a imagem mais arredondada */
  margin-bottom: 20px;
  z-index: 1;
  position: relative;
}

.our-team .picture img {
  width: 100%; /* Ajuste a largura para ocupar 100% do contêiner pai */
  height: 100%; /* Ajuste a altura para ocupar 100% do contêiner pai */
  border-radius: 50%;
  transform: scale(1);
  transition: all 0.9s ease 0s;
}

.our-team:hover .picture img {
  box-shadow: 0 0 0 3px #FF6F0F;
  transform: scale(0.8);
}

.our-team:hover {
  box-shadow: 0 0 0 3px #FF6F0F;
}

.our-team .team-content h2 {
  font-size: 20px;
  font-weight: bold;
  margin-top: 25px;
  margin-bottom: 10px;
}

.row {
  justify-content: center;
}

.container {
  padding-top: 20px;

}
</style>