<template>
    <div class="image">
    <img src="/img/icons/idaa.jpg" alt="background">   
</div>
<div class="name">
        Your company name
    </div>
    <div class="work">
 Працюємо з 10 до 22 кожний день
    </div>
    <div class="divider-line-menu1"></div>
    <div class="buttons">
        <Button class="menu" @click="redirrectToAbout">
            <div class="menu-text">
                Меню
            </div>
        </Button>
        <Button class="feedback" @click="openDialor">
            <div class="feedback-text">
                Надіслати відгук
            </div>
        </Button>    
         
    </div>
    <div class="divider-line-menu2"></div>
    <Dialog
      v-model:visible="dialog"
      modal
      :style="{
        width: '50rem',
        borderRadius: '50px',
        background: '#f9f6a5',
        marginTop: '20px',
      }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      :showHeader="false"
      :showCloseIcon="false"
    >
    <div >
    <div class="input-name">Email</div>
    <InputText class="edit-name" v-model="itemName"  />
</div>   

<div > 
    <div class="input-description">Відгук</div>   
    <Textarea class="desc-input" v-model="itemDesc" autoResize rows="5" cols="30" />
</div>   

     
      <div>
        <Button class="decline2" @click="decline"> Закрити </Button>
        <Button class="accept2" @click="sendEmail">
          Наліслати
        </Button>
      </div>
    </Dialog>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const dialog = ref(false);
const itemName = ref("");
const itemDesc = ref("");


const router = useRouter();

const openDialor = () => {
  dialog.value = true;
};

const decline = () => {
  dialog.value = false;
  itemDesc.value = "";
    itemName.value = "";
};

const redirrectToAbout = () => {
  router.push('/menu');
};

const sendEmail = async () => {
    await axios
      .post(`http://localhost:4000/send/email`, {
        email: itemName.value,
        text: itemDesc.value,
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Відгук надіслано");
        dialog.value = false;
        itemDesc.value = "";
        itemName.value = "";
      })
      .catch((error) => {
        console.log(error);
      });
};

</script>
<style scoped>
.image{
    position: absolute;
    top: 0 ;
    left: 0 ;
    margin-left: -8px;
    margin-top: -8px;
    right: 0 ;
    width: 100vw;
    height: 100vh;
    overflow: hidden;     
    font-size: 20px ;
    font-weight: 500 ;
    color: #000000 ;    
    z-index: -1;
    opacity: 0.3;
    filter: blur(2px);    
}

.name{
    z-index: 1;
    position: absolute;  
    top: 165px; 
    left:50%;
    transform: translate(-50%, -50%);
    border: none ;
    width: 248px;
    outline: none ;
    font-size: 35px;
    font-weight: 500 ;
    color: #000000 ;
    font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
}
.work{
    z-index: 1;
    position: absolute;  
    top: 360px; 
    left:50%;
    transform: translate(-50%, -50%);
    border: none ;
    width: 223px;
    outline: none ;
    font-size: 17px;
    font-weight: 500 ;
    color: #000000 ;
    font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
}
.divider-line-menu1{
    height: 1px; /* Same as the line height */
  background-color: #747070;
  position: absolute;
  top: 403px;
  margin-left: -8px;
  width: 100vw;
  z-index: 1;
}
.menu{
  background:  #DAC2C2 80%;
  border: none;
  color: black;
  position: absolute;
  top: 440px;
  border-radius: 50px;
  margin-right: 10px;
  width: 350px;
  margin-left: 0px;
  left:50%;
    transform: translate(-50%, -50%);
  padding: 10px 50px;
  font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.3);
}
.menu:focus {
    outline: none; /* Optional: Remove focus outline */
    box-shadow: none;
}
.menu-text{
    margin-left: 95px;
    font-family: 'Neucha';
    font-size: 25px;
}
.feedback{
    background:  #DAC2C2 80%;
  border: none;
  color: black;
  position: absolute;
  top: 510px;
  border-radius: 50px;
  margin-right: 10px;
  width: 350px;
  margin-left: 0px;
  left:50%;
    transform: translate(-50%, -50%);
  padding: 10px 50px;
  font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.3);
}
.feedback:focus {
    outline: none; /* Optional: Remove focus outline */
    box-shadow: none;
}
.feedback-text{
    margin-left: 45px;
    font-family: 'Neucha';
    font-size: 25px;
}
.divider-line-menu2{
    height: 1px; /* Same as the line height */
  background-color: #747070;
  position: absolute;
  top: 555px;
  margin-left: -8px;
  width: 100vw;
  z-index: 1;
}
.edit-name{
  border: none;
  background: white;
    border-radius: 50px;
  padding: 10px 10px;
  width: 250px;
  color: #000000;
  font-size: small;
}

.desc-input{
  border: none;
  background: white;
    border-radius: 20px;
  padding: 10px 10px;
  margin-top: 10px;
  width: 250px;
  color: #000000;
  font-size: small;
}
.accept2 {
  background: white;
  border: none;
  color: black;
  position: absolute;

  width: 100px;
  border-radius: 50px;
  right: 25px;
  margin-top: 20px;
  padding: 10px 20px;
  font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
}
.accept2:focus {
  outline: none;
  box-shadow: none;
}
.decline2 {
  background: white;
  border: none;
  color: black;  
  width: 100px;
  border-radius: 50px;

  margin-top: 20px;
  padding: 10px 25px;
  font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
}
.decline2:focus {
  outline: none;
  box-shadow: none;
}

.input-name {
  font-size: 15px;
  margin-top: 10px;
  font-weight: 500;
  color: #000000;
  font-family: "Neucha";
}
.input-price {
  font-size: 15px;
  font-weight: 500;
  color: #000000;
  font-family: "Neucha";
}
.input-description {
  font-size: 15px;
  font-weight: 500;
  color: #000000;
  font-family: "Neucha";
}

</style>

