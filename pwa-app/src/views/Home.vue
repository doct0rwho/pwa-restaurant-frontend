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
        <Button class="feedback" @click="redirrectToServices">
            <div class="feedback-text">
                Надіслати відгук
            </div>
        </Button>        
    </div>
    <div class="divider-line-menu2"></div>
</template>

<script>
export default {
    name: 'HomePage',
}
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
</style>

