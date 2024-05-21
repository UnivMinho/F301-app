<template>
    <div>
        <h1 class="display-2 mb-3 mt-5">Histórico de Iniciativas</h1>
        <div class="main-bg">
            <div class="row">
                <div v-for="(initiative, index) in initiatives" :key="index"
                    class="col-md-4 offset-md-4 card-voluntario"
                    :class="{ 'green-border': isEqual(initiative.data, currentDate) }">
                    <div class="icon-wrapper">
                        <i class="fa-solid fa-user"></i>
                        <p>{{ initiative.nomeResponsavel }}</p>
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
                        <i class="fa-solid fa-calendar-days"></i>
                        <p>{{ initiative.data }}</p>
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
export default {
    data() {
        return {
            initiatives: [],
            showAlert: false,
            alertVariant: '',
            alertMessage: '',
            selectedInitiative: '',
            quantidade: '',
            currentDate: new Date().toISOString().split('T')[0] // Get current date in YYYY-MM-DD format
        };
    },
    mounted() {
        this.loadInitiative();
    },
    methods: {
        loadInitiative() {
            const storedInitiatives = localStorage.getItem('currentInitiative');
            if (storedInitiatives) {
                this.initiatives = JSON.parse(storedInitiatives);
                console.log(this.initiative.tipo);
                // Push the loaded initiative to the initiatives array
            } else {
                // Handle the case when there's no stored initiative
                console.log('No stored initiative found.');
            }
        },
        isEqual(date1, date2) {
            // Compare two dates by converting them to the same format
            return date1 === date2;
        },
    }
};
</script>


<style scoped>
.card-voluntario {
    margin-left: 5rem;
    margin-bottom: 3rem;
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