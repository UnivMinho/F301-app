<template>
  <div>
    <h1 class="display-2 mb-3 mt-5">Regista os Momentos</h1>
    <div class="main-bg mt-5">
      <div class="container py-4">
        <!-- Cards de mídia -->
        <div class="row">
          <div v-for="(media, index) in multimedia" :key="index" class="col-md-4 mb-4">
            <div class="our-team">
              <div class="picture">
                <img class="img-fluid" :src="media.image">
              </div>
              <div class="button-container">
                <button class="button" @click="removeMedia(index)">
                  <span>Eliminar</span>
                  <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M3 6v18h18V6H3zm16 16H5V8h14v14zm-3-10v8h-2v-8h2zm-4 0v8h-2v-8h2zm-4 0v8H6v-8h2zm1-6h4v2h-4V6z" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Botão para upload de fotos -->
        <div class="photo-upload-card" @click="triggerFileUpload">
          <input type="file" ref="fileInput" @change="handlePhotoUpload" hidden>
          <div class="upload-icon">
            <i class="fas fa-camera"></i>
            <p>Clique para adicionar uma foto</p>
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
      multimedia: [],
      loggedInUser: this.$root.loggedInUser,
      currentDate: new Date().toISOString().split('T')[0], 
    };
  },
  mounted() {
    this.loadFromLocalStorage();
  },
  methods: {
    triggerFileUpload() {
      this.$refs.fileInput.click();
    },
    handlePhotoUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const newMedia = {
          id: this.generateUniqueId(),
          image: e.target.result,
          name: file.name,
          type: file.type.startsWith('image') ? 'Imagem' : 'Vídeo'
        };

        const storedInitiatives = JSON.parse(localStorage.getItem('currentInitiative'));
        const loggedInUsername = this.formatName(this.loggedInUser.username);

        if (storedInitiatives) {
          const initiative = storedInitiatives.find(initiative => {
            return initiative.profissional === loggedInUsername && initiative.dia === this.currentDate;
          });

          if (initiative) {
            initiative.imagensIds.push(newMedia.id);

            localStorage.setItem('currentInitiative', JSON.stringify(storedInitiatives));
          }
        }

        this.multimedia.push(newMedia);
        this.saveToLocalStorage();
      };
      reader.readAsDataURL(file);
    },
    generateUniqueId() {
      return Math.random().toString(36).substr(2, 9); 
    },
    saveToLocalStorage() {
      localStorage.setItem('multimedia', JSON.stringify(this.multimedia));
    },
    loadFromLocalStorage() {
      const storedMedia = localStorage.getItem('multimedia');
      if (storedMedia) {
        this.multimedia = JSON.parse(storedMedia);
      }
    },
    removeMedia(index) {
      this.multimedia.splice(index, 1); // Remove o item do array
      this.saveToLocalStorage();
    },
    formatName(name) {
      return name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
  }
};
</script>


<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.our-team {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 100px 8px rgba(0, 0, 0, 0.1);
  padding-bottom: 0px;
}

.our-team .picture img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
}

.main-container {
  text-align: center;
  padding: 20px;
}

.main-bg {

  min-height: 100vh;
  padding-top: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.photo-upload-card {
  cursor: pointer;
  border: 2px dashed #ccc;
  padding: 20px;
  margin: 20px auto;
  margin-bottom: 3rem;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.photo-upload-card:hover {
  border-color: #000;
}

.upload-icon {
  text-align: center;
}

.upload-icon i {
  font-size: 48px;
  color: #666;
}

.upload-icon p {
  margin-top: 10px;
}

.our-team {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.our-team .picture img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
}

.remove-icon-container {
  text-align: center;
  margin-top: -20px;
}

.remove-icon {
  color: #ff4d4d;
  cursor: pointer;
  font-size: 24px;
}

.remove-icon:hover {
  color: #ff0000;
}

.button {
  --background: #001D23;
  --background-hover: #291f6e;
  --text: #fff;
  --icon: #fff;
  display: -webkit-box;
  display: flex;
  outline: none;
  cursor: pointer;
  border: 0;
  min-width: 113px;
  padding: 9px 10px 9px 15px;
  border-radius: 11px;
  line-height: 24px;
  font-family: inherit;
  font-weight: 600;
  font-size: 14px;
  overflow: hidden;
  color: var(--text);
  background: var(--b, var(--background));
  -webkit-transition: background 0.4s, -webkit-transform 0.3s;
  transition: background 0.4s, -webkit-transform 0.3s;
  transition: transform 0.3s, background 0.4s;
  transition: transform 0.3s, background 0.4s, -webkit-transform 0.3s;
  -webkit-transform: scale(var(--scale, 1)) translateZ(0);
  transform: scale(var(--scale, 1)) translateZ(0);
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
}

.button:active {
  --scale: 0.95;
}

.button:hover {
  --b: var(--background-hover);
}

.button .icon,
.button span {
  display: inline-block;
  vertical-align: top;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}

.button .icon {
  width: 24px;
  height: 24px;
  position: relative;
  z-index: 1;
  margin-right: 8px;
  color: var(--text);
}

.button .icon svg {
  width: 96px;
  height: 96px;
  display: block;
  position: absolute;
  left: -28px;
  top: -36px;
  will-change: transform;
  fill: var(--icon);
  -webkit-transform: scale(0.254) translateZ(0);
  transform: scale(0.254) translateZ(0);
  -webkit-animation: var(--name, var(--name-top, none)) 2200ms ease forwards;
  animation: var(--name, var(--name-top, none)) 2200ms ease forwards;
}
</style>
