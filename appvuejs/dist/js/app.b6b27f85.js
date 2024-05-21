(function(){"use strict";var t={455:function(t,e,a){var i=a(5471),s=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[t.shouldShowSidebar?e("sidebar"):t._e(),e("router-view")],1)},r=[],o={computed:{shouldShowSidebar(){return"/"!==this.$route.path}}},n=o,l=a(1656),c=(0,l.A)(n,s,r,!1,null,null,null),d=c.exports,m=a(173),u=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"main-bg"}),e("div",{staticClass:"profile"},[e("div",{staticClass:"profile-pic"},[t._m(0),e("input",{attrs:{id:"file",type:"file"},on:{change:function(e){return t.loadFile(e)}}}),e("img",{key:t.imageSrc,attrs:{src:t.imageSrc,id:"output",width:"200"}})]),e("div",{staticClass:"userInfo"},[e("div",{staticClass:"profile-field"},[e("div",{staticClass:"input-with-icon"},[e("i",{staticClass:"fa-solid fa-user-circle"}),t._v(" "),t.editMode?e("input",{directives:[{name:"model",rawName:"v-model",value:t.editedName,expression:"editedName"}],attrs:{type:"text",id:"name"},domProps:{value:t.editedName},on:{input:function(e){e.target.composing||(t.editedName=e.target.value)}}}):e("input",{attrs:{type:"text",id:"name",disabled:""},domProps:{value:t.name}})])]),e("div",{staticClass:"profile-field"},[e("div",{staticClass:"input-with-icon"},[e("i",{staticClass:"fa-solid fa-envelope"}),t._v(" "),t.editMode?e("input",{directives:[{name:"model",rawName:"v-model",value:t.editedEmail,expression:"editedEmail"}],attrs:{type:"email",id:"email"},domProps:{value:t.editedEmail},on:{input:function(e){e.target.composing||(t.editedEmail=e.target.value)}}}):e("input",{attrs:{type:"email",id:"email",disabled:""},domProps:{value:t.email}})]),t.emailError?e("span",{staticClass:"error"},[t._v(t._s(t.emailError))]):t._e()]),e("div",{staticClass:"profile-field"},[e("div",{staticClass:"input-with-icon"},[e("i",{staticClass:"fa-solid fa-lock"}),t._v(" "),t.editMode?e("input",{directives:[{name:"model",rawName:"v-model",value:t.editedPassword,expression:"editedPassword"}],attrs:{type:"password",id:"password"},domProps:{value:t.editedPassword},on:{input:function(e){e.target.composing||(t.editedPassword=e.target.value)}}}):e("input",{attrs:{type:"password",id:"password",disabled:""},domProps:{value:t.password}})]),t.passwordError?e("span",{staticClass:"error"},[t._v(t._s(t.passwordError))]):t._e()]),e("div",{staticClass:"profile-field"},[t.editMode?e("button",{staticClass:"save-button",attrs:{type:"submit"},on:{click:t.saveProfile}},[t._v("Guardar")]):e("button",{staticClass:"edit-button",attrs:{type:"submit"},on:{click:t.toggleEditMode}},[t._v("Editar Perfil")]),t.editMode?e("button",{staticClass:"cancel-button",attrs:{type:"submit"},on:{click:t.cancelEdit}},[t._v("Cancelar")]):t._e()])])])])},p=[function(){var t=this,e=t._self._c;return e("label",{staticClass:"-label",attrs:{for:"file"}},[e("span",{staticClass:"glyphicon glyphicon-camera"}),e("span",[t._v("Change Image")])])}],v=(a(4114),a.p+"img/fotoperfil2.1ab4bae5.jpg");const h=new i["default"];var g={name:"ProfilePage",mounted(){const t=localStorage.getItem("profileImageData");t&&(this.imageSrc=t);const e=localStorage.getItem("name");e&&(this.name=e);const a=localStorage.getItem("email");a&&(this.email=a);const i=localStorage.getItem("password");i&&(this.password=i)},data(){return{imageSrc:v,editMode:!1,name:"John Doe",email:"johndoe@example.com",password:"********",editedName:"",editedEmail:"",editedPassword:"",userName:"Carlos Campos"}},methods:{cancelEdit(){this.editedName=this.name,this.editedEmail=this.email,this.editedPassword=this.password,this.editMode=!1},loadFile(t){const e=t.target.files[0],a=new FileReader;a.onload=t=>{this.imageSrc=t.target.result,localStorage.setItem("profileImageData",t.target.result),h.$emit("profilePictureUpdated",t.target.result)},a.readAsDataURL(e)},toggleEditMode(){this.editMode=!this.editMode,this.editMode&&(this.editedName=this.name,this.editedEmail=this.email,this.editedPassword=this.password)},saveProfile(){this.name=this.editedName,this.email=this.editedEmail,this.password=this.editedPassword,this.editMode=!1,localStorage.setItem("name",this.name),localStorage.setItem("email",this.email),localStorage.setItem("password",this.password)},logout(){this.$router.push({path:"/"})}}},f=g,w=(0,l.A)(f,u,p,!1,null,"52e6dcac",null),b=w.exports,C=function(){var t=this,e=t._self._c;return e("div",[t.isSmallScreen?e("div",{staticClass:"card login-card"},[e("div",{staticClass:"card-body p-5"},[e("h2",{staticClass:"text-center mb-4 custom-heading"},[t._v("Login")]),e("form",{on:{submit:function(e){return e.preventDefault(),t.login.apply(null,arguments)}}},[e("div",{staticClass:"mb-3"},[e("div",{staticClass:"input-with-icon"},[e("font-awesome-icon",{attrs:{icon:["fas","user"]}}),e("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"form-control",attrs:{type:"text",id:"username",required:"",placeholder:"Username"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}})],1),t.emailError?e("span",{staticClass:"error"},[t._v(t._s(t.emailError))]):t._e()]),e("div",{staticClass:"mb-3"},[e("div",{staticClass:"input-with-icon"},[e("font-awesome-icon",{attrs:{icon:["fas","lock"]}}),e("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-control",attrs:{type:"password",id:"password",required:"",placeholder:"Password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})],1),t.passwordError?e("span",{staticClass:"error"},[t._v(t._s(t.passwordError))]):t._e()]),e("button",{staticClass:"btn btn-custom-login w-100",attrs:{type:"submit"}},[t._v("Login")]),e("div",{staticClass:"alert alert-danger d-none",attrs:{id:"loginError"}},[t._v("Utilizador ou password inválidos.")]),e("div",{staticClass:"text-center mt-4"},[e("router-link",{staticClass:"btn btn-link",attrs:{to:"/forgotPassword"}},[t._v("Esqueceu a sua password?")])],1)]),e("div",{staticClass:"text-center mt-4"},[e("GoogleSigninButton",{attrs:{clientId:t.clientId},on:{onsuccess:t.onSuccess,onerror:t.onError}})],1)])]):e("div",{staticClass:"app-container"},[e("div",{staticClass:"card login-card"},[e("div",{staticClass:"card-body p-5"},[e("h2",{staticClass:"text-center mb-4 custom-heading"},[t._v("Login")]),e("form",{on:{submit:function(e){return e.preventDefault(),t.login.apply(null,arguments)}}},[e("div",{staticClass:"mb-3"},[e("div",{staticClass:"input-with-icon"},[e("font-awesome-icon",{attrs:{icon:["fas","user"]}}),e("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"form-control",attrs:{type:"text",id:"username",required:"",placeholder:"Username"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}})],1),t.emailError?e("span",{staticClass:"error"},[t._v(t._s(t.emailError))]):t._e()]),e("div",{staticClass:"mb-3"},[e("div",{staticClass:"input-with-icon"},[e("font-awesome-icon",{attrs:{icon:["fas","lock"]}}),e("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-control",attrs:{type:"password",id:"password",required:"",placeholder:"Password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})],1),t.passwordError?e("span",{staticClass:"error"},[t._v(t._s(t.passwordError))]):t._e()]),e("button",{staticClass:"btn btn-custom-login w-100",attrs:{type:"submit"}},[t._v("Login")]),e("div",{staticClass:"alert alert-danger d-none",attrs:{id:"loginError"}},[t._v("Utilizador ou password inválidos.")]),e("div",{staticClass:"text-center mt-4"},[e("router-link",{staticClass:"btn btn-link",attrs:{to:"/forgotPassword"}},[t._v("Esqueceu a sua password?")])],1)]),e("div",{staticClass:"text-center mt-4"},[e("GoogleSigninButton",{attrs:{clientId:t.clientId},on:{onsuccess:t.onSuccess,onerror:t.onError}})],1)])])])])},_=[],P=a(1726),y=a.p+"img/gh2.ef6202b2.png",I=a(1273),S=a(6188),k=a(7107);k.Yv.add(S.X7I);const x=[{username:"admin",password:"admin",email:"admin@admin.com"}];localStorage.setItem("users",JSON.stringify(x));var E={components:{GoogleSigninButton:P.GoogleSigninButton,FontAwesomeIcon:I.gc},data(){return{clientId:"522013438275-ck4u9vbd1hqgk1sb8ff29ui2clbikvlk.apps.googleusercontent.com",username:"",password:"",email:"",logoImg:y,isSmallScreen:!1}},mounted(){this.checkScreenWidth(),window.addEventListener("resize",this.checkScreenWidth)},beforeDestroy(){window.removeEventListener("resize",this.checkScreenWidth)},methods:{login(){const t=this.username,e=this.password,a=JSON.parse(localStorage.getItem("users"));let i=!1,s="";if(a)for(let r=0;r<a.length;r++)if(a[r].username===t&&a[r].password===e){i=!0,s=a[r].email;break}i?(this.$router.push({path:"/landing",query:{username:t,email:s,password:e}}),alert("Login successful")):alert("Login failed")},forgotPassword(){},handleInput(){const t=document.getElementById("username"),e=document.getElementById("password");t.value.trim().length>0?e.classList.add("hidden"):e.classList.remove("hidden")},onSuccess(t){console.log("Logged in as: "+t.getBasicProfile().getName())},onError(t){console.error("Google sign-in error:",t)},checkScreenWidth(){this.isSmallScreen=window.innerWidth<=768}}},F=E,A=(0,l.A)(F,C,_,!1,null,"2e861385",null),T=A.exports,M=function(){var t=this,e=t._self._c;return e("div",{staticClass:"app-container"},[t.isSmallScreen?t._e():e("div",{staticClass:"sidebar"},[e("router-link",{staticClass:"brand",attrs:{to:"/landing"},nativeOn:{click:function(e){return t.refreshData.apply(null,arguments)}}},[e("h1",{staticClass:"fw-bold text-primary mt-5"},[t._v(" Go"),e("span",{staticClass:"text-white"},[t._v("Help")])])]),e("b",{staticClass:"btn btn-link fw-bold mt-3",class:{selected:"profile"===t.currentPage},style:{color:"profile"===t.currentPage?"#FF6F0F":"inherit"},on:{click:function(e){return t.goToPage("profile")}}},[e("img",{staticClass:"profile-picture",attrs:{src:t.profilePictureSrc,alt:"Profile Picture"}})]),e("b",{staticClass:"btn btn-link fw-bold mt-5",class:{selected:"manageInititives"===t.currentPage},style:{color:"manageInititives"===t.currentPage?"#FF6F0F":"inherit"},on:{click:function(e){return t.goToPage("manageInititives")}}},[t._v("Equipa")]),e("b",{staticClass:"btn btn-link fw-bold mt-3",class:{selected:"registerMoments"===t.currentPage},style:{color:"registerMoments"===t.currentPage?"#FF6F0F":"inherit"},on:{click:function(e){return t.goToPage("registerMoments")}}},[t._v("Registar momentos")]),e("b",{staticClass:"btn btn-link fw-bold mt-3",class:{selected:"dashboard"===t.currentPage},style:{color:"dashboard"===t.currentPage?"#FF6F0F":"inherit"},on:{click:function(e){return t.goToPage("dashboard")}}},[t._v("Formulário recolhas")]),e("b",{staticClass:"btn btn-link fw-bold mt-3",class:{selected:"historyPage"===t.currentPage},style:{color:"historyPage"===t.currentPage?"#FF6F0F":"inherit"},on:{click:function(e){return t.goToPage("historyPage")}}},[t._v("Histórico Iniciativas")]),e("b",{staticClass:"btn btn-link fw-bold mt-auto",on:{click:t.logout}},[e("i",{staticClass:"fa fa-sign-out-alt"})])],1),e("div",{staticClass:"content",style:{marginLeft:t.isSmallScreen?"0":"200px"}},[e("router-view"),t.isOnLandingPage()?t._e():e("div",{staticClass:"card initiative-card"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-6"},[e("div",{staticClass:"weather-card text-center mb-4",attrs:{id:"weather-info"}},[e("h2",[t._v(t._s(t.weatherData.name))]),e("img",{staticClass:"weather-icon",attrs:{src:t.weatherIcon,alt:t.weatherData.weather[0].description}}),e("div",{staticClass:"weather-detail"},[e("p",[t._v(t._s(t.weatherData.main.temp)+"°C")]),e("div",{staticClass:"humidity-wind"},[e("div",{staticClass:"container"},[e("img",{attrs:{src:"/humidity.png",alt:"Humidity Icon"}}),e("p",[t._v(t._s(t.weatherData.main.humidity)+"% Humidade")])]),e("div",{staticClass:"container"},[e("img",{attrs:{src:"/wind.png",alt:"Wind Icon"}}),e("p",[t._v("Vento: "+t._s(t.weatherData.wind.speed)+" km/h")])])])])])]),e("div",{staticClass:"col-md-6"},[e("div",{staticClass:"card-body"},[e("h2",{staticClass:"card-title"},[t._v(t._s(t.initiative.designacao))]),e("h5",{staticClass:"card-text fs-3"},[t._v("Data: "+t._s(t.initiative.data))]),e("h5",{staticClass:"card-text fs-3"},[t._v("Responsável: "+t._s(t.initiative.nomeResponsavel))]),e("h5",{staticClass:"card-text fs-3 bold mt-3 mb-3"},[t._v("Tipo de iniciativa:")]),e("h5",{staticClass:"card-text fs-3 mt-3 mb-3"},[t._v(t._s(t.initiative.tipo))]),e("h5",{staticClass:"card-text fs- mt-5 mb-5 highlighted"},[t._v("Quantidade recolhida: "+t._s(t.initiative.materialRecolhido))]),e("b-button",{attrs:{variant:"primary"},on:{click:t.toggleParticipantsList}},[t._v("Ver Participantes")]),t.isParticipantsListOpen?e("div",{staticClass:"participants-container mt-3"},t._l(t.initiative.listaParticipantes,(function(a,i){return e("div",{key:i,staticClass:"participant-card card p-2 mb-2"},[e("div",{staticClass:"d-flex align-items-center"},[e("img",{staticClass:"rounded-circle",attrs:{src:a.foto||"/fotoperfil1.jpg",alt:"Profile image",width:"50",height:"50"}}),e("div",{staticClass:"participant-details ms-3"},[e("h5",{staticClass:"name"},[t._v(t._s(a.nome))]),e("p",{staticClass:"email"},[t._v(t._s(a.email))]),a.present?e("i",{staticClass:"fas fa-check-circle text-success"}):e("i",{staticClass:"fas fa-times-circle text-danger"})])])])})),0):t._e()],1)])])])],1),t.isSmallScreen?e("nav",{staticClass:"bottom-navbar"},[e("div",{staticClass:"navigation-links mt-2"},[e("b",{staticClass:"btn btn-link fw-bold",class:{selected:"profile"===t.currentPage},style:{color:"profile"===t.currentPage?"#FF6F0F":"inherit"},on:{click:function(e){return t.goToPage("profile")}}},[e("img",{staticClass:"profile-pictureBottom",attrs:{src:t.profilePictureSrc,alt:"Profile Picture"}})]),e("b",{staticClass:"btn btn-link fw-bold",on:{click:function(e){return t.goToPage("manageInititives")}}},[e("i",{staticClass:"fas fa-users"})]),e("b",{staticClass:"btn btn-link fw-bold",on:{click:function(e){return t.goToPage("registerMoments")}}},[e("i",{staticClass:"fa-solid fa-camera"})]),e("b",{staticClass:"btn btn-link fw-bold",on:{click:function(e){return t.goToPage("dashboard")}}},[e("i",{staticClass:"fa-brands fa-wpforms"})]),e("b",{staticClass:"btn btn-link fw-bold",on:{click:function(e){return t.goToPage("historyPage")}}},[e("i",{staticClass:"fa-solid fa-clock-rotate-left"})]),e("b",{staticClass:"btn btn-link fw-bold",on:{click:t.logout}},[e("i",{staticClass:"fa fa-sign-out-alt"})])])]):t._e()])},N=[],D=a(5532),O={components:{BButton:D.P},data(){return{isSmallScreen:!1,currentPage:"",initiative:null,weatherData:null,weatherIcon:"",isParticipantsListOpen:!1,imageSrc:null,profilePictureSrc:localStorage.getItem("profileImageData")||v,apiKey:"94a5314165f79d79b15389ec7c0254ed"}},created(){h.$on("profilePictureUpdated",this.updateProfilePicture)},beforeDestroy(){h.$off("profilePictureUpdated",this.updateProfilePicture),window.removeEventListener("resize",this.checkScreenWidth)},mounted(){this.checkScreenWidth(),window.addEventListener("resize",this.checkScreenWidth),"landing"!==this.$route.name&&this.loadInitiative()},methods:{goToPage(t){this.$router.push({name:t}).catch((t=>{if("NavigationDuplicated"!==t.name)throw t})),this.currentPage=t},isOnLandingPage(){return"historyPage"===this.$route.name||"manageInititives"===this.$route.name||"registerMoments"===this.$route.name||"dashboard"===this.$route.name||"profile"===this.$route.name},checkScreenWidth(){this.isSmallScreen=window.innerWidth<=768},logout(){this.$router.push("/")},loadInitiative(){const t=localStorage.getItem("currentInitiative");t?(this.initiative=JSON.parse(t),this.fetchWeather()):(this.initiative=this.createSampleInitiative(),localStorage.setItem("currentInitiative",JSON.stringify(this.initiative)),this.fetchWeather())},handleStorageChange(t){"currentInitiative"===t.key&&this.loadInitiative()},refreshData(){location.reload()},createSampleInitiative(){return{nomeResponsavel:"Tiago Castro",email:"tiago.castro@example.com",tipo:"Recolha de alimentos",designacao:"Campanha de Alimentos 2024",local:"Centro Comunitário da Boa Vontade",cidade:"Guimarães",numeroParticipantes:"10",data:"2024-05-01",numeroVagas:"5",materialUtilizado:"Mesas e cadeiras",materialRecolhido:"0",listaParticipantes:[{nome:"Tiago Castro",email:"tiago@example.com",foto:"/fotoperfil1.jpg"},{nome:"Chega-me isto",email:"carlos@example.com",foto:"/fotoperfil2.jpg"},{nome:"Chega-me isto",email:"carlos@example.com",foto:"/fotoperfil1.jpg"},{nome:"Chega-me isto",email:"carlos@example.com",foto:"/fotoperfil2.jpg"}],mediaUrl:"/about-1.jpg"}},fetchWeather(){const t=this.initiative.cidade,e=`https://api.openweathermap.org/data/2.5/weather?q=${t}&appid=${this.apiKey}&units=metric`;fetch(e).then((t=>{if(!t.ok)throw new Error("City not found");return t.json()})).then((t=>{this.weatherData=t,this.setWeatherIcon()})).catch((t=>{console.error("Error:",t),alert(t.message)}))},setWeatherIcon(){const t=this.weatherData.weather[0].description.toLowerCase();t.includes("clear")?this.weatherIcon="clear.png":t.includes("clouds")?this.weatherIcon="clouds.png":t.includes("drizzle")?this.weatherIcon="drizzle.png":t.includes("rain")?this.weatherIcon="rain.png":t.includes("snow")?this.weatherIcon="snow.png":t.includes("mist")||t.includes("fog")?this.weatherIcon="mist.png":t.includes("wind")?this.weatherIcon="wind.png":this.weatherIcon="default.png"},toggleParticipantsList(){this.isParticipantsListOpen=!this.isParticipantsListOpen},loadFile(t){const e=t.target.files[0];if(e){const t=new FileReader;t.onload=t=>{this.imageSrc=t.target.result,localStorage.setItem("profileImageData",t.target.result)},t.readAsDataURL(e)}},updateProfilePicture(t){this.profilePictureSrc=t}}},R=O,L=(0,l.A)(R,M,N,!1,null,"5c90fe58",null),j=L.exports,q=function(){var t=this,e=t._self._c;return e("div",[e("h1",{staticClass:"display-2 mb-3 mt-5"},[t._v("Regista os Momentos")]),e("div",{staticClass:"main-bg mt-5"},[e("div",{staticClass:"container py-4"},[e("div",{staticClass:"row"},t._l(t.multimedia,(function(a,i){return e("div",{key:i,staticClass:"col-md-4 mb-4"},[e("div",{staticClass:"our-team"},[e("div",{staticClass:"picture"},[e("img",{staticClass:"img-fluid",attrs:{src:a.image}})]),e("div",{staticClass:"button-container"},[e("button",{staticClass:"button",on:{click:function(e){return t.removeMedia(i)}}},[e("span",[t._v("Eliminar")]),e("div",{staticClass:"icon"},[e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M3 6v18h18V6H3zm16 16H5V8h14v14zm-3-10v8h-2v-8h2zm-4 0v8h-2v-8h2zm-4 0v8H6v-8h2zm1-6h4v2h-4V6z"}})])])])])])])})),0),e("div",{staticClass:"photo-upload-card",on:{click:t.triggerFileUpload}},[e("input",{ref:"fileInput",attrs:{type:"file",hidden:""},on:{change:t.handlePhotoUpload}}),t._m(0)])])])])},z=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"upload-icon"},[e("i",{staticClass:"fas fa-camera"}),e("p",[t._v("Clique para adicionar uma foto")])])}],$={data(){return{multimedia:[]}},mounted(){this.loadFromLocalStorage()},methods:{triggerFileUpload(){this.$refs.fileInput.click()},handlePhotoUpload(t){const e=t.target.files[0],a=new FileReader;a.onload=t=>{const a={image:t.target.result,name:e.name,type:e.type.startsWith("image")?"Imagem":"Vídeo"};this.multimedia.push(a),this.saveToLocalStorage()},a.readAsDataURL(e)},saveToLocalStorage(){localStorage.setItem("multimedia",JSON.stringify(this.multimedia))},loadFromLocalStorage(){const t=localStorage.getItem("multimedia");t&&(this.multimedia=JSON.parse(t))},removeMedia(t){this.multimedia.splice(t,1),this.saveToLocalStorage()}}},U=$,W=(0,l.A)(U,q,z,!1,null,"2ef929b2",null),B=W.exports,J=function(){var t=this,e=t._self._c;return e("div",[t._m(0),e("div",{staticClass:"container d-flex justify-content-center",staticStyle:{"margin-top":"80px"}},[e("div",{staticClass:"card text-center",staticStyle:{width:"350px"}},[e("div",{staticClass:"card-header h5 text-white bg-primary"},[t._v("Password Reset")]),e("div",{staticClass:"card-body px-5"},[e("p",{staticClass:"card-text py-2"},[t._v(" Introduza o seu email para receber um link de reset da password. ")]),e("div",{staticClass:"form-outline form-group"},[e("form",{on:{submit:function(e){return e.preventDefault(),t.sendResetEmail.apply(null,arguments)}}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-control",attrs:{type:"email",placeholder:"Enter your email",required:""},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),e("button",{staticClass:"btn btn-primary w-100 mt-3",attrs:{id:"resetBtn",type:"submit"}},[t._v("Reset password")])])])])])])])},G=[function(){var t=this,e=t._self._c;return e("nav",{staticClass:"navbar navbar-expand-lg navbar-dark fixed-top bg-navbar"},[e("div",{staticClass:"container-fluid"},[e("h1",{staticClass:"fw-bold text-primary m-0"},[t._v("Go"),e("span",{staticClass:"text-white"},[t._v("Help")])])])])}],V=a(1879),H={data(){return{email:""}},methods:{sendResetEmail(){const t="B6v_dgycMt9reIwv9",e="service_fpsolkc",a="template_svck3ws",i=Math.random().toString(36).substring(7);V.Ay.send(e,a,{email:this.email,resetToken:i},t).then((t=>{console.log("Reset email sent!",t),alert("Reset email sent! Check your inbox."),localStorage.setItem("resetToken",i),localStorage.setItem("resetEmail",this.email),this.$router.push("/resetPassword")})).catch((t=>{console.error("Error sending reset email:",t),alert("Failed to send reset email. Please try again later.")}))}}},Q=H,Y=(0,l.A)(Q,J,G,!1,null,"38c886cf",null),K=Y.exports,X=function(){var t=this,e=t._self._c;return e("div",[t._m(0),e("div",{staticClass:"container d-flex justify-content-center",staticStyle:{"margin-top":"80px"}},[e("div",{staticClass:"card text-center",staticStyle:{"max-width":"350px"}},[e("div",{staticClass:"card-header h5 text-white bg-primary"},[t._v("Password Reset")]),e("div",{staticClass:"card-body px-5"},[e("p",{staticClass:"card-text py-2"},[t._v(" Introduza o seu email para receber um link de reset da password. ")]),e("div",{staticClass:"form-outline"},[e("form",{on:{submit:function(e){return e.preventDefault(),t.resetPassword.apply(null,arguments)}}},[e("div",{staticClass:"mb-3"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-control w-100",attrs:{type:"email",placeholder:"Enter your email",required:""},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})]),e("div",{staticClass:"mb-3"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.resetToken,expression:"resetToken"}],staticClass:"form-control w-100",attrs:{type:"text",placeholder:"Enter reset token",required:""},domProps:{value:t.resetToken},on:{input:function(e){e.target.composing||(t.resetToken=e.target.value)}}})]),e("div",{staticClass:"mb-3"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.newPassword,expression:"newPassword"}],staticClass:"form-control w-100",attrs:{type:"password",placeholder:"Enter new password",required:""},domProps:{value:t.newPassword},on:{input:function(e){e.target.composing||(t.newPassword=e.target.value)}}})]),e("button",{staticClass:"btn btn-primary w-100",attrs:{id:"resetBtn",type:"submit"}},[t._v("Reset password")])])])])])])])},Z=[function(){var t=this,e=t._self._c;return e("nav",{staticClass:"navbar navbar-expand-lg navbar-dark fixed-top bg-navbar"},[e("div",{staticClass:"container-fluid"},[e("h1",{staticClass:"fw-bold text-primary m-0"},[t._v("Go"),e("span",{staticClass:"text-white"},[t._v("Help")])])])])}],tt={data(){return{email:localStorage.getItem("resetEmail")||"",resetToken:"",newPassword:""}},methods:{resetPassword(){const t=localStorage.getItem("resetToken");console.log("Stored reset token:",t),this.resetToken===t?(alert("Password reset successfully!"),localStorage.removeItem("resetToken"),localStorage.removeItem("resetEmail"),this.$router.push("/")):alert("Invalid reset token")}}},et=tt,at=(0,l.A)(et,X,Z,!1,null,"059c93ba",null),it=at.exports,st=function(){var t=this,e=t._self._c;return e("div",[e("h1",{staticClass:"display-2 mb-3 mt-5"},[t._v("Gestor de presenças")]),e("div",{staticClass:"main-bg mt-5"},[e("div",{staticClass:"container py-4"},[e("div",{staticClass:"row"},t._l(t.profissionais,(function(a,i){return e("div",{key:i,staticClass:"col-md-3 mb-4"},[e("div",{staticClass:"our-team"},[e("div",{staticClass:"picture"},[e("img",{staticClass:"img-fluid",attrs:{src:a.foto||"/perfil.jpg"}})]),e("div",{staticClass:"team-content"},[e("h3",{staticClass:"name"},[t._v(t._s(a.nome))]),e("h4",{staticClass:"title"},[t._v(t._s(a.area))])]),e("b-button",{class:{"active-button":a.present,"inactive-button":!a.present},attrs:{variant:"success"},on:{click:function(e){return t.markPresent(a,i)}}},[t._v("Presente")]),e("b-button",{class:{"active-button":!a.present,"inactive-button":a.present},attrs:{variant:"danger"},on:{click:function(e){return t.markAbsent(a,i)}}},[t._v("Ausente")])],1)])})),0)])])])},rt=[],ot={data(){return{profissionais:[],currentDate:(new Date).toISOString().split("T")[0]}},mounted(){this.loadProfissionais()},methods:{loadProfissionais(){const t=JSON.parse(localStorage.getItem("currentInitiative"));t&&Array.isArray(t.listaParticipantes)&&(this.profissionais=t.listaParticipantes.map((t=>({...t,present:void 0!==t.present&&t.present})))),console.log("PROFISSIONAIS: ",this.profissionais)},saveData(){const t=JSON.parse(localStorage.getItem("currentInitiative"));t.listaParticipantes=this.profissionais,localStorage.setItem("currentInitiative",JSON.stringify(t))},markPresent(t,e){this.profissionais[e].present=!0,this.saveData()},markAbsent(t,e){this.profissionais[e].present=!1,this.saveData()}}},nt=ot,lt=(0,l.A)(nt,st,rt,!1,null,"0a35ece5",null),ct=lt.exports,dt=function(){var t=this,e=t._self._c;return e("div",[e("h1",{staticClass:"display-2 mb-3 mt-5"},[t._v("Formulário de Recolha")]),e("div",{staticClass:"main-bg"},[e("div",{staticClass:"container py-4"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-4 offset-md-4"},[e("b-card",{staticClass:"card"},[[e("img",{staticClass:"card-img-top",attrs:{src:t.initiativeImage,alt:t.initiativeAltText}}),e("h5",{staticClass:"card-title"},["Recolha de alimentos"===t.initiative.tipo?[e("font-awesome-icon",{attrs:{icon:["fas","utensils"]}})]:"clothes"===t.selectedInitiative?[e("font-awesome-icon",{attrs:{icon:["fas","shirt"]}})]:"schoolMaterial"===t.selectedInitiative?[e("font-awesome-icon",{attrs:{icon:["fas","book"]}})]:[t._v(" "+t._s(t.selectedInitiative.charAt(0).toUpperCase()+t.selectedInitiative.slice(1))+" ")]],2),e("div",{staticClass:"input-with-margin"},[e("b-form-input",{attrs:{placeholder:t.placeholderText,size:"20"},model:{value:t.quantidade,callback:function(e){t.quantidade=e},expression:"quantidade"}})],1),e("b-button",{attrs:{id:"submit-button",variant:"success"},on:{click:t.saveData}},[t._v("Guardar Registo")])]],2)],1)])])]),e("b-alert",{attrs:{variant:t.alertVariant,dismissible:"",fade:""},model:{value:t.showAlert,callback:function(e){t.showAlert=e},expression:"showAlert"}},[t._v(" "+t._s(t.alertMessage)+" ")])],1)},mt=[],ut=a.p+"img/Alimentos_1.0691bce8.jpg",pt=a.p+"img/Roupa_1.68f6aadb.jpg",vt=a.p+"img/Mat.escolar_1.5059d705.jpg";k.Yv.add(S.X7I);var ht={components:{FontAwesomeIcon:I.gc},data(){return{selectedInitiative:"",quantidade:"",cardImages:{Recolha:ut,clothes:pt,schoolMaterial:vt},showAlert:!1,alertVariant:"",alertMessage:""}},mounted(){this.loadInitiative()},computed:{initiativeImage(){return"Recolha de alimentos"===this.selectedInitiative?this.cardImages["Recolha"]:"Recolha de roupas"===this.selectedInitiative?this.cardImages["clothes"]:"Recolha de material escolar"===this.selectedInitiative?this.cardImages["schoolMaterial"]:""},initiativeAltText(){return this.selectedInitiative.charAt(0).toUpperCase()+this.selectedInitiative.slice(1)+" Image"},placeholderText(){return"Recolha de alimentos"===this.selectedInitiative||"Recolha de roupas"===this.selectedInitiative?"Quantidade (kg)":"Recolha de material escolar"===this.selectedInitiative?"Peças":"Quantidade"}},methods:{saveData(){console.log("Data saved successfully!");let t=JSON.parse(localStorage.getItem("currentInitiative"));t&&""!==this.quantidade.trim()&&(t.materialRecolhido=this.quantidade,localStorage.setItem("currentInitiative",JSON.stringify(t)),this.quantidade="",this.alertVariant="success",this.alertMessage="Quantidade introduzida com sucesso!",this.showAlert=!0,setTimeout((()=>{this.showAlert=!1}),3e3))},loadInitiative(){const t=localStorage.getItem("currentInitiative");t?(this.initiative=JSON.parse(t),console.log("Current Initiative:",this.initiative),console.log(this.initiative.tipo),this.selectedInitiative=this.initiative.tipo):console.log("No stored initiative found.")}}},gt=ht,ft=(0,l.A)(gt,dt,mt,!1,null,"45141022",null),wt=ft.exports,bt=function(){var t=this,e=t._self._c;return e("div",[e("h1",{staticClass:"display-2 mb-3 mt-5"},[t._v("Histórico de Iniciativas")]),e("div",{staticClass:"main-bg"},[e("div",{staticClass:"row"},t._l(t.initiatives,(function(a,i){return e("div",{key:i,staticClass:"col-md-4 offset-md-4 card-voluntario",class:{"green-border":t.isEqual(a.data,t.currentDate)}},[e("div",{staticClass:"icon-wrapper"},[e("i",{staticClass:"fa-solid fa-user"}),e("p",[t._v(t._s(a.nomeResponsavel))])]),e("div",{staticClass:"icon-wrapper"},[e("i",{staticClass:"fa-solid fa-file-lines"}),e("p",[t._v(t._s(a.designacao))])]),e("div",{staticClass:"icon-wrapper"},[e("i",{staticClass:"fa-solid fa-location-dot"}),e("p",[t._v(t._s(a.local))])]),e("div",{staticClass:"icon-wrapper"},[e("i",{staticClass:"fa-solid fa-calendar-days"}),e("p",[t._v(t._s(a.data))])])])})),0)]),e("b-alert",{attrs:{variant:t.alertVariant,dismissible:"",fade:""},model:{value:t.showAlert,callback:function(e){t.showAlert=e},expression:"showAlert"}},[t._v(" "+t._s(t.alertMessage)+" ")])],1)},Ct=[],_t={data(){return{initiatives:[],showAlert:!1,alertVariant:"",alertMessage:"",selectedInitiative:"",quantidade:"",currentDate:(new Date).toISOString().split("T")[0]}},mounted(){this.loadInitiative()},methods:{loadInitiative(){const t=localStorage.getItem("currentInitiative");t?(this.initiatives=JSON.parse(t),console.log(this.initiative.tipo)):console.log("No stored initiative found.")},isEqual(t,e){return t===e}}},Pt=_t,yt=(0,l.A)(Pt,bt,Ct,!1,null,"418ceb26",null),It=yt.exports;i["default"].use(m.Ay);const St=[{path:"/",component:T},{path:"/landing",component:j,children:[{path:"/profile",name:"profile",component:b},{path:"/registerMoments",name:"registerMoments",component:B},{path:"/forgotPassword",component:K},{path:"/resetPassword",component:it},{path:"/manageInitiatives",name:"manageInititives",component:ct},{path:"/dashboard",name:"dashboard",component:wt},{path:"/historyPage",name:"historyPage",component:It}]}],kt=new m.Ay({routes:St,mode:"history"});var xt=kt,Et=a(4332),Ft=a(2625);a(9313);i["default"].use(Et.vGs),i["default"].use(Ft.YS),i["default"].config.productionTip=!1,new i["default"]({router:xt,render:t=>t(d)}).$mount("#app")}},e={};function a(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={exports:{}};return t[i].call(r.exports,r,r.exports,a),r.exports}a.m=t,function(){var t=[];a.O=function(e,i,s,r){if(!i){var o=1/0;for(d=0;d<t.length;d++){i=t[d][0],s=t[d][1],r=t[d][2];for(var n=!0,l=0;l<i.length;l++)(!1&r||o>=r)&&Object.keys(a.O).every((function(t){return a.O[t](i[l])}))?i.splice(l--,1):(n=!1,r<o&&(o=r));if(n){t.splice(d--,1);var c=s();void 0!==c&&(e=c)}}return e}r=r||0;for(var d=t.length;d>0&&t[d-1][2]>r;d--)t[d]=t[d-1];t[d]=[i,s,r]}}(),function(){a.d=function(t,e){for(var i in e)a.o(e,i)&&!a.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){a.p="/f301.app/"}(),function(){var t={524:0};a.O.j=function(e){return 0===t[e]};var e=function(e,i){var s,r,o=i[0],n=i[1],l=i[2],c=0;if(o.some((function(e){return 0!==t[e]}))){for(s in n)a.o(n,s)&&(a.m[s]=n[s]);if(l)var d=l(a)}for(e&&e(i);c<o.length;c++)r=o[c],a.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return a.O(d)},i=self["webpackChunkappvuejs"]=self["webpackChunkappvuejs"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=a.O(void 0,[504],(function(){return a(455)}));i=a.O(i)})();
//# sourceMappingURL=app.b6b27f85.js.map