<template>
  <div id="app">
    <!-- Your existing content -->
    <div v-if="isMobileDevice">
      <div v-if="checkerToken">
        <Button v-if="!isAuthRoute" class="transparent-button" @click="visible = true">
          <i class="pi pi-bars"></i>
        </Button>
        <Button v-if="!isAuthRoute" class="user">
          <i class="pi pi-search"></i>
        </Button>
        <Button v-if="!isAuthRoute" class="search">
          <i class="pi pi-user"></i>
        </Button>
        <div class="card flex justify-content-center">
          <Sidebar v-model:visible="visible" class="custom-sidebar">
            <div>
            <Button class="cross-button" @click="visible = false">
              <i class="pi pi-times-circle"></i>
            </Button>
            <div class="user-icon">
              <i class="pi pi-user" style="font-size: 1.5rem; color: black;"></i>
            </div>
            <div class="mail-label">
              {{ email }}
            </div>
            <div class="status-icon">
              <i class="pi pi-verified" style="font-size: 1.5rem; color: black;"></i>
            </div>
            <div>
               Статус:
            </div>
            <div>
              <Button class="personal-cabinet" @click="redirectToClientAuthPage">
                Перейти в особистий кабінет
              </Button>
            </div>
            <div>
              <Button class="chosen" @click="redirectToClientAuthPage">
                Улюблені страви
              </Button>
            </div>
           
           
            <div class="divider-line1"></div>
            <div class="contact">Контактні дані</div>
            <div class="map-icon">
              <i class="pi pi-map-marker" style="font-size: 1.5rem"></i>
            </div>
            <div class="adress">
              Україна, Чернігівська область, м.Чернігів, вул. Гонча 6
            </div>
            <div class="divider-line2"></div>
            <div class="phone-icon">
              <i class="pi pi-phone" style="font-size: 1.5rem"></i>
            </div>
            <div class="phone">0 800 500 300</div>
            <div class="divider-line3"></div>
            <div class="social-label">Наші сторінки в соціальних мережах</div>
            <div class="instagram-icon">
              <i class="pi pi-instagram" style="font-size: 1.5rem"></i>
            </div>
            <div class="instagram-label">Instagram</div>
            <Button class="instgramm-link-button" @click="redirrectToInstagram">
              <i class="pi pi-external-link" style="font-size: 1rem"></i>
            </Button>
            <div class="facebook-icon">
              <i class="pi pi-facebook" style="font-size: 1.5rem"></i>
            </div>
            <div class="facebook-label">Facebook</div>
            <Button class="facebook-link-button" @click="redirrectToFacebook">
              <i class="pi pi-external-link" style="font-size: 1rem"></i>
            </Button>
            </div>
          </Sidebar>
          <router-view></router-view>
        </div>
      </div>       
      <div v-else>
        <Button v-if="!isAuthRoute" class="transparent-button" @click="visible = true">
          <i class="pi pi-bars"></i>
        </Button>
        <Button v-if="!isAuthRoute" class="user">
          <i class="pi pi-search"></i>
        </Button>
        <Button v-if="!isAuthRoute" class="search">
          <i class="pi pi-user"></i>
        </Button>
        <div class="card flex justify-content-center">
          <Sidebar v-model:visible="visible" class="custom-sidebar">
            <div>
            <Button class="cross-button" @click="visible = false">
              <i class="pi pi-times-circle"></i>
            </Button>
            <div>
              <Button class="client-auth-button" @click="redirectToClientAuthPage">
                Авторизуватися як клієнт
              </Button>
            </div>
            <div class="client-auth-button-text">
              Авторизація як клієнта надасть вам додаткові переваги, доступ до
              додаткових функцій та спростить процес замовлення та оплати
            </div>
            <div style="margin-top: 10px">
              <Button class="staff-auth-button">
                Авторизуватися як робітник
              </Button>
            </div>
            <div class="staff-auth-button-text">
              Авторизуючись як робітник ви автоматично подаєта заяву на
              співбесіду за нашим керівництвом та створювєте собі тимчасовий
              кабінет працівника
            </div>
            <div class="divider-line1"></div>
            <div class="contact">Контактні дані</div>
            <div class="map-icon">
              <i class="pi pi-map-marker" style="font-size: 1.5rem"></i>
            </div>
            <div class="adress">
              Україна, Чернігівська область, м.Чернігів, вул. Гонча 6
            </div>
            <div class="divider-line2"></div>
            <div class="phone-icon">
              <i class="pi pi-phone" style="font-size: 1.5rem"></i>
            </div>
            <div class="phone">0 800 500 300</div>
            <div class="divider-line3"></div>
            <div class="social-label">Наші сторінки в соціальних мережах</div>
            <div class="instagram-icon">
              <i class="pi pi-instagram" style="font-size: 1.5rem"></i>
            </div>
            <div class="instagram-label">Instagram</div>
            <Button class="instgramm-link-button" @click="redirrectToInstagram">
              <i class="pi pi-external-link" style="font-size: 1rem"></i>
            </Button>
            <div class="facebook-icon">
              <i class="pi pi-facebook" style="font-size: 1.5rem"></i>
            </div>
            <div class="facebook-label">Facebook</div>
            <Button class="facebook-link-button" @click="redirrectToFacebook">
              <i class="pi pi-external-link" style="font-size: 1rem"></i>
            </Button>
            </div>
          </Sidebar>
          <router-view></router-view>
        </div>
      </div>
    
    </div>
    <div v-else>
      <!-- Content for non-mobile devices -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
    name: "App",
    mounted() {  
    
  },
    data() {
        return {
            isMobileDevice: false,
            visible: true,
            token: null,
            checkerToken: false,
            email: "sdemchenko70@gmail.com",
            user: null,
        };
    },
    
    computed: {
    isAuthRoute() {
      return this.$route.path === "/auth";
    },
  },
    created() {
        this.checkDevice();
        this.checkToken();
        if (this.checkerToken) {
            this.getUser();
        }
    },
    methods: {
        getUser() {
            axios
                .get("https://diploma-lya6.onrender.com/get/user/data", {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                    body:{
                        email: this.email,
                    }
                })
                .then((response) => {
                    this.user = response.data;
                    console.log(this.user);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        checkToken() {
            if (localStorage.getItem("token") != null) {
                this.token = localStorage.getItem("token");
                this.checkerToken = true;
            }
            else {
                this.checkerToken = false;
            }
        },
        checkDevice() {
            this.isMobileDevice =
                /Mobi/i.test(navigator.userAgent) ||
                    /Android/i.test(navigator.userAgent);
            if (!this.isMobileDevice) {
                // Handle non-phone devices
                alert("This application is only available on mobile devices.");
            }
        },
        redirrectToInstagram() {
            window.open("https://www.instagram.com/", "_blank");
        },
        redirrectToFacebook() {
            window.open("https://www.facebook.com/", "_blank");
        },
        redirectToClientAuthPage() {
            this.visible = false;
            this.$router.push("/auth");
        },
    },
   
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Neucha&display=swap");
#app {
  position: relative;
}

.transparent-button {
  background: none;
  border: none;
  color: black;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
}
.user {
  background: none;
  border: none;
  color: black;
  position: absolute;
  top: 0;
  right: 50px;
  z-index: 1;
}
.user:focus {
  outline: none; /* Optional: Remove focus outline */
  box-shadow: none;
}

.search {
  background: none;
  border: none;
  color: black;
  position: absolute;
  top: 0;
  right: 100px;
  z-index: 1;
}
.search:focus {
  outline: none; /* Optional: Remove focus outline */
  box-shadow: none;
}
.cross-button {
  background: none;
  border: none;
  color: black;
  position: absolute;
  top: 10px;
  right: -45px;
}
.cross-button:focus {
  outline: none; /* Optional: Remove focus outline */
  box-shadow: none;
}
.transparent-button:focus {
  outline: none; /* Optional: Remove focus outline */
  box-shadow: none; /* Remove the button shadow on focus */
}
.client-auth-button {
  background: #f9f6a5;
  border: none;
  color: black;
  position: absolute;
  top: 15px;
  border-radius: 50px;
  margin-right: 10px;
  width: 290px;
  margin-left: 0px;
  padding: 10px 50px;
  font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
}

.client-auth-button:focus {
  outline: none; /* Optional: Remove focus outline */
  box-shadow: none;
}
.client-auth-button-text {
  background: rgba(249, 246, 165, 0.3);
  border: none;
  color: black;
  position: absolute;
  font-size: small;
  top: 70px;
  border-radius: 5px;
  padding: 10px 40px;
  margin-right: 20px;
  width: 290px;
  margin-left: 0px;
  font-family: "Neucha";
}
.staff-auth-button {
  background: #f9f6a5;
  border: none;
  color: black;
  position: absolute;
  top: 170px;
  border-radius: 50px;
  padding: 10px 40px;
  font-family: "Neucha";
  width: 290px;
  margin-left: 0px;
}
.staff-auth-button:focus {
  outline: none; /* Optional: Remove focus outline */
  box-shadow: none;
}
.staff-auth-button-text {
  background: rgba(249, 246, 165, 0.3);
  border: none;
  margin-right: 20px;
  width: 290px;
  margin-left: 0px;
  color: black;
  position: absolute;
  top: 227px;
  font-size: small;
  border-radius: 5px;
  padding: 10px 40px;
  font-family: "Neucha";
}
.divider-line1 {
  /* Styles for the divider line */
  height: 1px; /* Same as the line height */
  background-color: #747070;
  position: absolute;
  top: 335px;
  margin-left: -16px;
  width: 100%;
}
.divider-line2 {
  /* Styles for the divider line */
  height: 1px; /* Same as the line height */
  background-color: #747070;
  position: absolute;
  top: 433px;
  margin-left: -16px;
  width: 100%;
}
.divider-line3 {
  /* Styles for the divider line */
  height: 1px; /* Same as the line height */
  background-color: #747070;
  position: absolute;
  top: 480px;
  margin-left: -16px;
  width: 100%;
}
.contact {
  background: none;
  border: none;
  color: black;
  position: absolute;
  top: 350px;
  margin-left: 0px;
  font-family: "Neucha";
}
.adress {
  position: absolute;
  top: 375px;
  margin-left: 35px;
  color: black;
  font-family: "Neucha";
}
.map-icon {
  position: absolute;
  color: black;
  top: 380px;
  margin-left: 0px;
}
.phone-icon {
  position: absolute;
  color: black;
  top: 445px;
  margin-left: 0px;
}
.phone {
  position: absolute;
  top: 445px;
  margin-left: 35px;
  color: black;
  font-family: "Neucha";
}
.social-label {
  position: absolute;
  top: 490px;
  margin-left: 0px;
  color: black;
  font-family: "Neucha";
}
.instagram-icon {
  position: absolute;
  color: black;
  top: 517px;
  margin-left: 0px;
}
.instagram-label {
  position: absolute;
  top: 520px;
  margin-left: 35px;
  color: black;
  font-family: "Neucha";
}
.instgramm-link-button {
  background: none;
  border: none;
  color: black;
  position: absolute;
  top: 512px;
  right: 20px;
}
.instgramm-link-button:focus {
  outline: none; /* Optional: Remove focus outline */
  box-shadow: none;
}
.facebook-icon {
  position: absolute;
  color: black;
  top: 560px;
  margin-left: 0px;
}
.facebook-label {
  position: absolute;
  top: 564px;
  margin-left: 35px;
  color: black;
  font-family: "Neucha";
}
.facebook-link-button {
  background: none;
  border: none;
  color: black;
  position: absolute;
  top: 557px;
  right: 20px;
}
.facebook-link-button:focus {
  outline: none; /* Optional: Remove focus outline */
  box-shadow: none;
}
.personal-cabinet {
  background: #f9f6a5;
  border: none;
  color: black;
  position: absolute;
  top: 100px;
  border-radius: 50px;
  margin-right: 10px;
  width: 290px;
  margin-left: 0px;
  padding: 10px 50px;
  font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
}

.personal-cabinet:focus {
  outline: none; /* Optional: Remove focus outline */
  box-shadow: none;
}
.chosen {
  background: #f9f6a5;
  border: none;
  color: black;
  position: absolute;
  top: 160px;
  border-radius: 50px;
  margin-right: 10px;
  width: 290px;
  margin-left: 0px;
  padding: 10px 50px;
  font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
}

.chosen:focus {
  outline: none; /* Optional: Remove focus outline */
  box-shadow: none;
}
.user-icon{
  position: absolute;
  top: 20px;
}
.status-icon{
  position: absolute;
  top: 60px;
}
.mail-label{
  position: absolute;
  top: 23px;
  color: black;
  margin-left: 35px;
  font-family: "Neucha";
}
</style>
