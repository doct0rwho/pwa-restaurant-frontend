<template>
  <div>
    <div class="header">
      <Button class="back-button" @click="redirectToHomePage">
        <i class="pi pi-chevron-left"></i>
      </Button>
      <div class="header-text">Меню</div>
    </div>
    <div v-if="token" class="order">
        <Button class="order-button" @click="openOrder" :disabled="table === ''">
          <div class="order-button-text">
            Ваше замовлення
            <i class="pi pi-shopping-cart" ></i>
          </div>
        </Button>
    </div>
    <div class="table">
      <div v-for="category in sortedData" :key="category.categoryName">
        <div class="category">{{ category.categoryName }}</div>
        <div class="divider-line1"></div>
        <div v-for="item in category.items" :key="item.name">
          <div class="container">
            <div class="text">
              <div class="item-name">
                {{ item.name }}
              </div>
              <div class="item-price">{{ item.price }} UAH</div>
              <div class="item-description">
                {{ item.description }}
              </div>
              <div class="item-weight" style="margin-bottom: 20px;">Вага: {{ item.weight }} г</div>
              <div v-if="token" class="item-buttons" >
                <div v-if="chosen(item.name)">
                    <Button class="add-to-favorites" @click="removeFromFavorites(item)">
                  <div class="add-to-favorites-text">
                    <i class="pi pi-star-fill" style="font-size: 1.5rem;" ></i>
                  </div>
                </Button>
                
                <Button v-if="!inCart(item.name)" class="add-to-cart" @click="addToCart(item)" :disabled="table === ''">
  <div class="add-to-cart-text">
    <i class="pi pi-shopping-cart" style="font-size: 1.5rem;"></i>
  </div>
</Button>
<Button v-if="inCart(item.name)" class="remove-to-cart" @click="removeFromCart(item)" :disabled="table === ''">
  <div class="add-to-cart-text">
    <i class="pi pi-shopping-cart" style="font-size: 1.5rem;"></i>
  </div>
</Button>


                </div>
                <div v-else>                 
                <Button class="add-to-favorites" @click="addToFavorites(item.name)">
                  <div class="add-to-favorites-text">
                    <i class="pi pi-star" style="font-size: 1.5rem;" ></i>
                  </div>
                </Button>
                
                <Button v-if="!inCart(item.name)" class="add-to-cart" @click="addToCart(item)" :disabled="table === ''">
  <div class="add-to-cart-text">
    <i class="pi pi-shopping-cart" style="font-size: 1.5rem;"></i>
  </div>
</Button>
<Button v-if="inCart(item.name)" class="remove-to-cart" @click="removeFromCart(item)" :disabled="table === ''">
  <div class="add-to-cart-text">
    <i class="pi pi-shopping-cart" style="font-size: 1.5rem;"></i>
  </div>
</Button>

                </div>
                            
              </div>
            </div>
            <div class="item-image">
              <div v-if="item.image" class="item-image">
                <img
                  :src="item.image"
                  alt="background"
                  width="100%"
                  height="100%"
                />
              </div>
              <div v-else class="item-image">
                <img
                  class="image"
                  src="/img/icons/default.jpg"
                  alt="item image"
                />
              </div>
            </div>
          </div>
          <div class="divider-line1"></div>
        </div>
      </div>
    </div>
    <Dialog
      v-model:visible="greetings"
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
    
    <div class="greetings-text">{{ text }}</div>
   
      <Button class="close-dialog" @click="closeDialog">
        Закрити
      </Button>

    </Dialog>
    <Dialog
      v-model:visible="Cart"
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
    
    <div class="greetings-text">Ваше замовлення: {{ Summary }} UAH</div>
    <div class="order-lsit">
      <div v-for="item in OrderList" :key="item.name">
       
        
            <div class="item-name2">
              {{ item.name }}
              <Button class="remove-from-cart" @click="removeFromCart(item)">
              <i class="pi pi-times" style="font-size: 1.5rem;"></i>
            </Button>

            </div>
            <div class="item-price">{{ item.price }} UAH</div>
            
 

        
       
      </div>      
    </div>
   
      <Button class="close-dialog" @click="closeCart">
        Закрити
      </Button>

    </Dialog>
  </div>
</template>
<script setup>
import axios from "axios";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import io from 'socket.io-client';
const socket = io("https://diploma-lya6.onrender.com");
socket.on('connect', () => {
  console.log('connected');
  offline.value = false;
});
socket.on('disconnect', () => {
  console.log('disconnected');
  offline.value = true;
});
const router = useRouter();
//const data = ref({});
const sortedData = ref([]);
const token = ref("");
const favorites = ref([]);

const greetings = ref(false);
const text = ref("");
const table = ref("");
const offline = ref(true);
const busy = ref(false);
const Cart = ref(false);
const OrderList = ref([]);
const Summary = ref('');


onMounted(async () => {
  try {
    table.value = router.currentRoute.value.params.id
  } catch (error) {
    console.log(error);
  }
  checkerToken();
  axios
    .get("https://diploma-lya6.onrender.com/getAllMenu")
    .then((response) => {
      sortedData.value = response.data.data;
      console.log(response.data.data);
      // transfer response.data.data to sortedData as an array of objects

      console.log("sorted", sortedData.value);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
    greetingsFunc();
  
});
const getChosen = () => {
  socket.emit('getOrder', {
    table: table.value,
    email: localStorage.getItem("email"),
  });
  socket.on('order', (data) => {
    console.log('data', data);
    OrderList.value = data.orders;
    Summary.value = data.summary;
    console.log('Summary', Summary.value);
    console.log('OrderList', OrderList.value);
  });
}
const openOrder = () => {
  Cart.value = true;
  getChosen();
}

const addToCart = (item) => {
  const email = localStorage.getItem("email");
  const data = {
    email: email,
    foodId: item.id,
    table: table.value,
  };
  console.log('data', data);
  socket.emit('addFood', data);
  OrderList.value.push({ name: item.name, price: item.price });
  socket.on('foodAdded', () => {
    
  console.log('food added');
  
  });
}
const removeFromCart = (item) => {
  const email = localStorage.getItem("email");
  const data = {
    email: email,
    foodId: item.id,
    table: table.value,
  };
  console.log('data', data);
  socket.emit('removeFood', data);
  const index = OrderList.value.findIndex((item) => item.name === item.name);
  OrderList.value.splice(index, 1);
  Summary.value = Summary.value - item.price;
  socket.on('foodRemoved', () => {
    
  console.log('food removed');
  
  });
}
const greetingsFunc = () => {
  // const email = localStorage.getItem("email");
  if(!localStorage.getItem("token")){
    text.value = "Ви не увійшли у свій аккаунт. Для того, щоб замовити щось, будь ласка, увійдіть у свій аккаунт";
    greetings.value = true;
    console.log('не увішов');
  }else{
    if(table.value == ""){
      text.value = "Ви не обрали столик. Для того, щоб замовити щось, будь ласка, оберіть столик та відскануйте QR-код за допомогою камери"; 
      greetings.value = true;
      console.log('не обрав столик');
    }else{
      if(localStorage.getItem("role") === 'staff'){
        text.value = "Ви увійшли у аккаунт персоналу. Для того, щоб замовити щось, будь ласка, увійдіть у аккаунт клієнта";
        greetings.value = true;
        console.log('персонал');
      }else{        
        socket.emit('join', {
          table: table.value,
          email: localStorage.getItem("email"),
        });
        socket.on('busy', () => {
          busy.value = true;
          text.value = "На жаль, цей столик вже зайнятий. Будь ласка, оберіть інший столик";
          greetings.value = true;
          console.log('busy');
        });         
        socket.on('tableJoined', () => {
          busy.value = false;     
        text.value = `Вітаємо! Ви обрали столик №${table.value}. Для того, щоб замовити щось, будь ласка, оберіть страву та натисніть кнопку "Ваше замовлення"`;
        greetings.value = true;
        console.log('tableJoined');
        });

      }
    
    }
  }
};
const closeDialog = () => {
  greetings.value = false;
};
const closeCart = () => {
  Cart.value = false;
};
const addToFavorites = (name) => {
  const email = localStorage.getItem("email");
  const data = {
    email: email,
    foodName: name,
  };
  axios
    .post("https://diploma-lya6.onrender.com/add/favorite/food", data)
    .then((response) => {
      console.log(response);
      favorites.value.push({ foodName: name });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      toast.error("Помилка при додаванні у вибране");
    });
};
const removeFromFavorites = (name) => {
    const email = localStorage.getItem("email");
    const data = {
        email: email,
        foodName: name.name,
    };
    axios
        .post("https://diploma-lya6.onrender.com/remove/favorite/food", data)
        .then((response) => {
        console.log(response);
        const index = favorites.value.findIndex((item) => item.foodName === name.name);
        favorites.value.splice(index, 1);
        })
        .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Помилка при видаленні з вибраного");
        });
    };

const inCart = (name) => {
  console.log('name', name);
  const result = OrderList.value.find((item) => item.name === name);
  if(result){
    return true;
  }
  else{
    return false;
  }
}
const chosen = (name) =>{
    
    const result = favorites.value.find((item) => item.foodName === name);
    if(result){
        return true;
    }
    else{
        return false;
    }
};

const redirectToHomePage = () => {
  router.push("/");
};
const checkerToken = () => {
  if (localStorage.getItem("token") === null) {
    token.value = false;
  } else {
    if(localStorage.getItem("role") === 'staff'){
      token.value = false;
    }
    else{
      const email = localStorage.getItem("email");
    axios.get(`https://diploma-lya6.onrender.com/get/user/data/${email}`).then((response) => {
      console.log('response data', response.data.data[0].favorites);
      favorites.value = response.data.data[0].favorites;
      token.value = true;
      console.log(favorites.value);
    } )
    }
    
   
  }
};
</script>
<style scoped>
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* Add this line to prevent horizontal scrolling */
}
.container {
    display: flex;
  }
  .text {
    flex: 0 0 45%;
     /* Adjust as needed */
     left : 0;
  }

.header {
  position: fixed;
  top: 0;
  left: 0;
  /* margin-left: -8px;
  margin-top: -8px; */
  right: 0;
  width: 100vw;
  height: 45px;
  background-color: #dac2c2;
  font-size: 20px;
  z-index: 2;
  font-weight: 500;
  color: #000000;
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.3); /* Adjust values as needed */
}
.back-button {
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 0px;
  margin-top: 2px;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 20px;
  font-weight: 500;
  color: #000000;
}
.header-text {
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 45px;
  margin-top: 8px;
  height: 40px;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 20px;
  font-weight: 500;
  color: #000000;
  font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
}
.table {
  position: absolute;
  top: 45px;
  left: 0; /* Adjust as needed */
  right: 0; /* Adjust as needed */
  width: 100%; /* Set width to 100% to cover the whole page */
  /* Add other styling properties as needed */
}

.divider-line1 {
  /* Styles for the divider line */
  height: 1px; /* Same as the line height */
  background-color: #747070;
  position: absolute;
  margin-left: -8px;
  width: 100vw;
}
.category {
  /* Styles for the category */
  font-size: 30px;
  font-weight: 500;
  color: #000000;
  margin-left: 30px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-family: "Neucha"; /*/* Use 'Neucha' font and fall back to cursive if not available */
}
.item-name {
  /* Styles for the item name */
  font-size: 18px;
  font-weight: 500;
  color: #000000;
  margin-left: 30px;
  margin-top: 25px;

  font-family: "Neucha"; /*/* Use 'Neucha' font and fall back to cursive if not available */
}
.item-name2 {
  /* Styles for the item name */
  font-size: 18px;
  font-weight: 500;
  color: #000000;
  margin-left: 30px;
  

  font-family: "Neucha"; /*/* Use 'Neucha' font and fall back to cursive if not available */
}
.item-price {
  /* Styles for the item price */
  font-size: 18px;
  font-weight: 500;
  color: red;
  margin-left: 30px;
  font-family: "Neucha"; /*/* Use 'Neucha' font and fall back to cursive if not available */
}
.item-description {
  /* Styles for the item description */
  font-size: 18px;
  font-weight: 500;
  color: #000000;
 
  margin-left: 30px;
  margin-bottom: 10px;
  font-family: "Neucha"; /*/* Use 'Neucha' font and fall back to cursive if not available */
}
.item-weight {
  /* Styles for the item weight */
  font-size: 18px;
  font-weight: 500;
  color: #000000;
  margin-left: 30px;
 
  font-family: "Neucha"; /*/* Use 'Neucha' font and fall back to cursive if not available */
}
.item-image {
  flex: 1;
  margin-top: 10px;
  margin-right: 10px;
  position: relative;
  margin-bottom: 10px;
  overflow: hidden; /* Ensure image doesn't overflow its container */
}

.image {
  width: 100%;
  height: auto;
  display: block;
}
.add-to-favorites {
  position: relative;
  top: 0;
  left: 0; 
  background-color: transparent;
  border: none;
  outline: none;
  margin-left: 15px;
  font-weight: 500;
  color: red;
  font-size: 1.5rem;
}
.add-to-favorites:focus {
  outline: none; /* Optional: Remove focus outline */
  box-shadow: none;
}
.add-to-cart {
  position: relative;
  top: 0;
  left: 0; 
  background-color: transparent;
  border: none;
  margin-left: -20px;
  outline: none;  
  font-weight: 500;
  color: #000000;
  font-size: 1.5rem;
}
.add-to-cart:focus {
  outline: none; /* Optional: Remove focus outline */
  box-shadow: none;
}
.remove-to-cart {
  position: relative;
  top: 0;
  left: 0; 
  background-color: transparent;
  border: none;
  margin-left: -20px;
  outline: none;  
  font-weight: 500;
  color: green;
  font-size: 1.5rem;
}
.remove-to-cart:focus {
  outline: none; /* Optional: Remove focus outline */
  box-shadow: none;
}
.order{
    position: fixed;
    top: 60px;
    right: 0;
    margin-right: 10px;
    margin-top: 2px;    
    z-index: 2;
    
    border: none;
    outline: none;
    font-size: 20px;
    font-weight: 500;
    color: #000000;
}
.order-button{
    position: relative;
    top: 0;
    left: 0; 
    height: 30px;
    background-color: white;   
    border: 1px solid #000000;
    border-radius: 60px;
    outline: none;
    margin-left: 15px;
    box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.3); 
    color: #000000;
    
}
.order-button:focus {
  outline: none; /* Optional: Remove focus outline */
  box-shadow: none;
}
.order-button-text{
    position: relative;
    top: 0;
    left: 0; 
       
    color: #000000;
    font-family: "Neucha";
}
.greetings-text{
    position: relative;
    top: 0;
    left: 0; 
   
    margin-left: 15px;
    margin-top: 15px;
    color: #000000;
    font-size: 20px;
    font-family: "Neucha";
}
.close-dialog{
    background: white;
  border: none;
  color: black;  
  width: 100px;
  border-radius: 50px;
  left: 50%;
  transform: translate(-50%, 0);
  margin-top: 20px;
  padding: 10px 30px;
  font-family: "Neucha";
    
   
    
}
.close-dialog:focus {
  outline: none; /* Optional: Remove focus outline */
  box-shadow: none;
}
.remove-from-cart{
    position: relative;
    top: 15px;
    left: 0; 
    background-color: transparent;
    border: none;
    outline: none;
    
    font-weight: 500;
    color: red;
    font-size: 1.5rem;
}

</style>
