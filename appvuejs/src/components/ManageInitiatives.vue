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
      currentDate: new Date().toISOString().split('T')[0], // Get current date in YYYY-MM-DD format
    };
  },
  mounted() {
    this.loadProfissionais();
  },
  methods: {
    loadProfissionais() {
      const storedInitiatives = JSON.parse(localStorage.getItem('currentInitiative'));
      if (storedInitiatives && Array.isArray(storedInitiatives.listaParticipantes)) {
        this.profissionais = storedInitiatives.listaParticipantes.map(p => ({
          ...p,
          present: p.present !== undefined ? p.present : false  // Ensure the 'present' field exists
        }));
      }
      console.log("PROFISSIONAIS: ", this.profissionais);
    },
    saveData() {
      // Retrieve the entire initiative from localStorage
      const storedInitiatives = JSON.parse(localStorage.getItem('currentInitiative'));

      // Update the listaParticipantes array within the initiative with the modified participants
      storedInitiatives.listaParticipantes = this.profissionais;

      // Store the updated initiatives back into localStorage
      localStorage.setItem('currentInitiative', JSON.stringify(storedInitiatives));
    },
    markPresent(profissional, index) {
      this.profissionais[index].present = true;
      this.saveData();
    },
    markAbsent(profissional, index) {
      this.profissionais[index].present = false;
      this.saveData();
    }
  }
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
  padding: 10px 0 10px;
  background-color: #596a6d;
  text-align: center;
  overflow: hidden;
  position: relative;
  border-radius: 30px;
  transition: transform 0.3s ease-in-out;
  background-color: #001D23;
}

.our-team h3{
  color:aliceblue;
}

.our-team .picture {
  display: inline-block;
  height: 130px;
  width: 120px;
  margin-bottom: 50px;
  z-index: 1;
  position: relative;
  
}

.our-team .picture img {
  width: 125px;
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