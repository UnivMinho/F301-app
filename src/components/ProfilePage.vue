<template>
  <div>
    <div class="main-bg">
      <!-- Page Header -->
    </div>
    <div class="profile">
      <div class="profile-pic">
        <label class="-label" for="file">
          <span class="glyphicon glyphicon-camera"></span>
          <span>Change Image</span>
        </label>
        <input id="file" type="file" @change="loadFile($event)" />
        <img :src="imageSrc" id="output" width="200" :key="imageSrc" />
      </div>
      <div class="userInfo">
        <div class="profile-field">
          <div class="input-with-icon">
            <i class="fa-solid fa-user-circle"></i> <!-- Icon for name -->
            <input v-if="!editMode" type="text" id="name" :value="name" disabled>
            <input v-else type="text" id="name" v-model="editedName">
          </div>
        </div>
        <div class="profile-field">
          <div class="input-with-icon">
            <i class="fa-solid fa-envelope"></i> <!-- Icon for email -->
            <input v-if="!editMode" type="email" id="email" :value="email" disabled>
            <input v-else type="email" id="email" v-model="editedEmail">
          </div>
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>
        <div class="profile-field">
          <div class="input-with-icon">
            <i class="fa-solid fa-lock"></i> <!-- Icon for password -->
            <input v-if="!editMode" type="password" id="password" :value="password" disabled>
            <input v-else type="password" id="password" v-model="editedPassword">
          </div>
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>
        <div class="profile-field">
          <button v-if="!editMode" @click="toggleEditMode" class="edit-button" type="submit">Editar Perfil</button>
          <button v-else @click="saveProfile" class="save-button" type="submit">Guardar</button>
          <button v-if="editMode" @click="cancelEdit" class="cancel-button" type="submit">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import profileDefault from '@/assets/fotoperfil2.jpg';
import { eventBus } from '@/eventBus.js';

export default {
  name: 'ProfilePage',
  mounted() {
    // Retrieve the image data from local storage when the component is mounted
    const savedImageData = localStorage.getItem('profileImageData');
    if (savedImageData) {
      this.imageSrc = savedImageData;
    }

    // Retrieve the profile data from local storage
    const savedName = localStorage.getItem('name');
    if (savedName) {
      this.name = savedName;
    }

    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      this.email = savedEmail;
    }

    const savedPassword = localStorage.getItem('password');
    if (savedPassword) {
      this.password = savedPassword;
    }

  },
  data() {
    return {
      imageSrc: profileDefault,
      editMode: false,
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '********',
      editedName: '',
      editedEmail: '',
      editedPassword: '',
      userName: 'Carlos Campos' // vamos ter que ir buscar aqui ao localstorage e mostrar com o mustache
    };
  },
  methods: {
    cancelEdit() {
      // Reset edited values e desativar o modo de edição
      this.editedName = this.name;
      this.editedEmail = this.email;
      this.editedPassword = this.password;
      this.editMode = false;
    },
    loadFile(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = e.target.result;
        // Save the image data to local storage
        localStorage.setItem('profileImageData', e.target.result);
        // Emit the event with the updated profile picture
        eventBus.$emit('profilePictureUpdated', e.target.result);
      };
      reader.readAsDataURL(file);
    },

    toggleEditMode() {
      this.editMode = !this.editMode;
      // Set edited values to current values when entering edit mode
      if (this.editMode) {
        this.editedName = this.name;
        this.editedEmail = this.email;
        this.editedPassword = this.password;
      }
    },
    saveProfile() {
      // Save edited values
      this.name = this.editedName;
      this.email = this.editedEmail;
      this.password = this.editedPassword;
      this.editMode = false;

      // Save edited values to local storage
      localStorage.setItem('name', this.name);
      localStorage.setItem('email', this.email);
      localStorage.setItem('password', this.password);
    },
    logout() {
      this.$router.push({ path: '/' });
    }
  }
}
</script>


<style scoped>
.main-bg {
  padding: 20px;
}

.profile {
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.profile-field .cancel-button {
  background-color: red;
  color: white;
}

.profile-pic {
  color: transparent;
  transition: all .3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 20px;
}

.profile-pic input {
  display: none;
}

.profile-pic img {
  position: absolute;
  width: 165px;
  height: 165px;
  box-shadow: 0 0 10px 0 rgba(255, 255, 255, .35);
  border: 2px solid #FF6F0F;
  /* Add border with color #FF6F0F and width 2px */
  border-radius: 50%;
  /* Make the image circular */
  z-index: 0;
}

.profile-pic .-label {
  cursor: pointer;
  height: 165px;
  /* Value of $circleSize */
  width: 165px;
  /* Value of $circleSize */
}

.profile-pic:hover .-label {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .8);
  z-index: 10000;
  color: rgb(250, 250, 250);
  /* Value of $fontColor */
  transition: background-color .2s ease-in-out;
  border-radius: 100px;
  /* Value of $radius */
  margin-bottom: 0;
}

.profile-pic span {
  display: inline-flex;
  padding: .2em;
  height: 2em;
}

.container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 0px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-field {
  margin-bottom: 20px;
  border: none;
  background: transparent;
  box-shadow: none;
  border-radius: 0;
}

.profile-field {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  background-color: transparent;
}

.profile-field input[type="text"],
.profile-field input[type="email"],
.profile-field input[type="password"] {
  width: 80%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 0;
}

.profile-field button[type="submit"] {
  background-color: #FF6F0F;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 10px 70px;
  cursor: pointer;
  margin-top: 10px;
}

.profile-field button.save-button {
  background-color: green;
  color: white;
  margin-right: 15px;
}

.profile-field input[type="submit"]:hover {
  background-color: #0056b3;
}

.profile-field button[type="logout"] {
  background-color: rgb(216, 0, 0);
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
}

.profile-field input[type="logout"]:hover {
  background-color: #a05d49;
}

.profile-field {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: transparent;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  background: transparent;
}

input[type="text"]:disabled,
input[type="email"]:disabled,
input[type="password"]:disabled {
  background: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 0;
}
</style>