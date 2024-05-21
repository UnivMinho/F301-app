<template>
  <div>
    <nav>
      <font-awesome-icon icon="arrow-left" />    
    </nav>
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
        <label for="name"></label>
        <input v-if="!editMode" type="text" id="name" :value="name" disabled>
        <input v-else type="text" id="name" v-model="editedName">
      </div>
      <div class="profile-field">
        <label for="email"></label>
        <input v-if="!editMode" type="email" id="email" :value="email" disabled>
        <input v-else type="email" id="email" v-model="editedEmail">
      </div>
      <div class="profile-field">
        <label for="password"></label>
        <input v-if="!editMode" type="password" id="password" :value="password" disabled>
        <input v-else type="password" id="password" v-model="editedPassword">
      </div>
      <div class="profile-field">
        <button v-if="!editMode" @click="toggleEditMode" type="submit">Edit Profile</button>
        <button v-else @click="saveProfile" type="submit">Save Profile</button>
        <button @click="logout" type="logout" id="logoutBtn">Logout</button> <!-- Logout button outside edit mode -->
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'ProfilePage',
  components: {
    FontAwesomeIcon
  },
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
      imageSrc: '/user-solid.svg', // Default image source,
      editMode: false,
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '********',
      editedName: '',
      editedEmail: '',
      editedPassword: ''
    };
  },
  methods: {
    loadFile(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = e.target.result;
        // Save the image data to local storage
        localStorage.setItem('profileImageData', e.target.result);
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
.profile-pic {
  color: transparent;
  transition: all .3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all .3s ease;
  margin-bottom: 20px;
}

.profile-pic input {
  display: none;
}

.profile-pic img {
  position: absolute;
  width: 165px;
  /* Value of $circleSize */
  height: 165px;
  /* Value of $circleSize */
  box-shadow: 0 0 10px 0 rgba(255, 255, 255, .35);
  /* Value of $shadow */
  border-radius: 100px;
  /* Value of $radius */
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
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-field {
  margin-bottom: 20px;
}

.profile-field {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.profile-field input[type="text"],
.profile-field input[type="email"],
.profile-field input[type="password"] {
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.profile-field button[type="submit"] {
  background-color: rgb(216, 140, 0);
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
}

.profile-field input[type="submit"]:hover {
  background-color: #0056b3;
  margin-top: 10px;
}

.profile-field button[type="logout"] {
  background-color: rgb(255, 255, 255);
  color: #a05d49;
  border-color: black;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
}

.profile-field input[type="logout"]:hover {
  background-color: #a05d49;
}

</style>