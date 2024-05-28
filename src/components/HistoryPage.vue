<template>
    <div>
        <h1 class="display-2 mb-3 mt-5">Histórico de Iniciativas</h1>
        <div class="main-bg">
            <div class="row">
                <div v-for="(initiative, index) in initiatives" :key="index"
                    class="col-md-4 offset-md-4 card-voluntario"
                    :class="{ 'green-border': isEqual(initiative.dia, currentDate) }"
                    @click="selectInitiative(initiative)">
                    <div class="icon-wrapper">
                        <i class="fa-solid fa-user"></i>
                        <p>{{ initiative.profissional }}</p>
                    </div>
                    <div class="icon-wrapper">
                        <i class="fa-solid fa-file-lines"></i>
                        <p>{{ initiative.designacao }}</p>
                    </div>
                    <div class="icon-wrapper">
                        <i class="fa-solid fa-location-dot"></i>
                        <p>{{ initiative.local }}</p>
                    </div>
                    <div class="icon-wrapper">
                        <i class="fa-solid fa-hand-holding-dollar"></i>
                        <p>{{ initiative.materialRecolhido }}</p>
                    </div>
                    <div class="icon-wrapper">
                        <i class="fa-solid fa-calendar-days"></i>
                        <p>{{ initiative.dia }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal para exibir detalhes da iniciativa e carrossel de imagens -->
        <b-modal v-model="showModal" title="Detalhes da Iniciativa" size="lg">
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6">
                        <h4>{{ selectedInitiative.profissional }}</h4>
                        <p><strong>Designação:</strong> {{ selectedInitiative.designacao }}</p>
                        <p><strong>Local:</strong> {{ selectedInitiative.local }}</p>
                        <p><strong>Material Recolhido:</strong> {{ selectedInitiative.materialRecolhido }}</p>
                        <p><strong>Data:</strong> {{ selectedInitiative.dia }}</p>
                        <p><strong>Participantes:</strong> {{ selectedInitiative.numParticipantes }}</p>
                    </div>
                    <div class="col-md-6">
                        <b-carousel v-if="multimedia.length" controls indicators>
                            <b-carousel-slide v-for="(media, idx) in multimedia" :key="idx"
                                :img-src="media.image"></b-carousel-slide>
                        </b-carousel>
                        <p v-else>Sem imagens disponíveis.</p>
                    </div>
                </div>
            </div>
        </b-modal>

        <!-- Popup de alerta -->
        <b-alert v-model="showAlert" :variant="alertVariant" dismissible fade>
            {{ alertMessage }}
        </b-alert>
    </div>
</template>

<script>
export default {
    data() {
        return {
            initiatives: [],
            showAlert: false,
            alertVariant: '',
            alertMessage: '',
            selectedInitiative: '',
            showModal: false,
            quantidade: '',
            total: 0,
            currentDate: new Date().toISOString().split('T')[0], 
            multimedia: []
        };
    },
    created() {
        document.title = 'GoHelp App';
    },
    computed: {
        loggedInUser() {
            return this.$root.loggedInUser;
        }
    },
    mounted() {
        this.loadInitiative();
    },
    methods: {
        loadInitiative() {
            const storedInitiatives = localStorage.getItem('currentInitiative');
            const loggedInUsername = this.formatName(this.loggedInUser.username);

            console.log("logged in user: ", this.loggedInUser);
            console.log("formatted username: ", loggedInUsername);

            if (storedInitiatives) {
                this.initiatives = JSON.parse(storedInitiatives).filter(initiative => {
                    return initiative.profissional === loggedInUsername;
                });

                console.log(this.initiatives);

                this.initiatives.forEach(initiative => {
                    if (!initiative.materialRecolhido) {
                        initiative.materialRecolhido = 'Informação não disponível';
                    } else {
                        initiative.materialRecolhido += ' kg';
                    }
                });
            } else {
                console.log('No stored initiative found.');
            }
        },
        loadMultimedia() {
            if (this.selectedInitiative && this.selectedInitiative.imagensIds) {
                this.multimedia = JSON.parse(localStorage.getItem('multimedia')).filter(media => {
                    return this.selectedInitiative.imagensIds.includes(media.id);
                }) || [];
            } else {
                this.multimedia = [];
            }
        },
        selectInitiative(initiative) {
            this.selectedInitiative = initiative;
            console.log("selected initiative img: ", this.selectedInitiative.imagens);
            this.loadMultimedia();
            this.showModal = true;
        },
        formatName(name) {
            return name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        },
        isEqual(date1, date2) {
            return date1 === date2;
        }
    }
};
</script>

<style scoped>
.card-voluntario {
    margin-left: 5rem;
    margin-bottom: 5rem;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 20rem;
    position: relative;

}

.green-border {
    border: 4px solid green;
}

.icon-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 1px;
}

.icon-wrapper i {
    margin-right: 5px;
}

i {
    margin-right: 20px;
}

p {
    margin-top: 20px;
    margin-left: 0.4rem;
}
</style>