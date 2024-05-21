<template>
  <div>
    <div class="title-alt mt-5">Registar Momentos</div>
    <div class="bg-white">
      <!-- Page Content -->
      <div class="container py-4">
        <!-- Bootstrap Table for Initiatives -->
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Nome da Iniciativa</th>
              <th scope="col">Ações</th>
              <th scope="col">Fotografia</th> <!-- Add this table header -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(initiative, index) in initiatives" :key="index">
              <td>{{ initiative.name }}</td>
              <td>
                <div class="input--file">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="3.2" />
                      <path
                        d="M9 2l-1.83 2h-3.17c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2h-3.17l-1.83-2h-6zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                      <path d="M0 0h24v24h-24z" fill="none" />
                    </svg>
                  </span>
                  <input name="Select File" type="file" @change="handlePhotoUpload(index, $event)" />
                  <!-- Pass index and event to the method -->
                </div>
              </td>
              <td> <!-- Add this table cell for displaying the photo -->
                <img :src="initiative.photo" v-if="initiative.photo" alt="Initiative Photo" class="img-fluid">
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer -->
      <div class="container-fluid pt-4">
        <p class="mb-0 text-center text-white-50">© <a class="text-white-50" href="#">GoHelp</a>, Todos os direitos
          reservados.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      initiatives: [
        { name: 'Initiative 1', photo: null }, // Add 'photo' property to each initiative
        { name: 'Initiative 2', photo: null },
        { name: 'Initiative 3', photo: null },
        // Add more initiatives as needed
      ],
    };
  },
  methods: {
    handlePhotoUpload(index, event) {
      const file = event.target.files[0]; // Get the uploaded file
      const reader = new FileReader();
      reader.onload = (e) => {
        this.initiatives[index].photo = e.target.result; // Update the 'photo' property with the uploaded photo data
      };
      reader.readAsDataURL(file);
    },
    goToPage(pageName) {
      this.$router.push({ name: pageName });
    },
    logout() {
      this.$router.push({ path: '/' });
      console.log('Logging out...');
    },
  },
};
</script>

<style scoped>
.input--file {
  position: relative;
  color: #7f7f7f;
}

.input--file input[type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
</style>
