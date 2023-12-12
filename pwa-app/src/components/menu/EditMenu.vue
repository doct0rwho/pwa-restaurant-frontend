<template>
  <div>
    <div class="header">
      <Button class="back-button" @click="redirectToHomePage">
        <i class="pi pi-chevron-left"></i>
      </Button>
      <div class="header-text">Редагування меню</div>
    </div>
    <div>
      <Button class="add-category" @click="addCategory">
        <i class="pi pi-plus"></i>
      </Button>
    </div>   
    <div>

    </div>
      <div class="table">
        <div v-for="category in sortedData" :key="category.categoryName">
          
          <div class="category">{{ category.categoryName }}
            <Button
              class="edit-category"
              @click="openDialogForCategoryEdit(category.categoryId, category.categoryName)">
              <i class="pi pi-pencil"></i>
            </Button>
            <Button class="delete-category" @click="deleteCategory(category.categoryId)">
              <i class="pi pi-trash"></i>
            </Button>
            <Button class="add-menu-item" @click="add(category.categoryName)">
              <i class="pi pi-plus"></i>
            </Button>
           </div>
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
                <div
                  class="item-weight"
                  v-if="!token"
                  style="margin-bottom: 20px"
                >
                  Вага: {{ item.weight }} г
                </div>
                <div>
                  <Button
              class="accept"
              @click="
                OpenDialog(
                  item.name,
                  item.weight,
                  item.price,
                  item.description,
                  item.id
                )
              "
            >
              Edit
            </Button>
            <Button class="delete-menu-item" @click="deleteMenuItem(item.id)">
              Delete
            </Button>
                </div>
              </div>
            </div>
            <div class="divider-line1"></div>
          </div>
        </div>
      </div>
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
    <div class="input-name">Назва</div>
    <InputText class="edit-name" v-model="itemName"  />
</div>   
<div>
    <div class="input-price">Ціна</div>
    <InputText class="edit-price" v-model="itemPrice"   /> UAH
</div>
<div > 
    <div class="input-description">Опис</div>   
    <Textarea class="desc-input" v-model="itemDesc" autoResize rows="5" cols="30" />
</div>   
<div >
    <div class="input-weight">Вага</div>
    <InputText class="weight-input" v-model="itemWeight"   /> г
</div>
     
      <div>
        <Button class="decline2" @click="decline"> Decline </Button>
        <Button class="accept2" @click="acceptEdittedData">
          Accept
        </Button>
      </div>
    </Dialog>
    <Dialog
      v-model:visible="dialogCategory"
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
    <div class="category-name">Назва</div>
    <InputText class="edit-category2" v-model="categoryName"  />
</div>   
<div>
        <Button class="decline2" @click="declineCategory"> Decline </Button>
        <Button class="accept2" @click="acceptNewCategoryName">
          Accept
        </Button>
      </div>
    </Dialog>
    <Dialog
      v-model:visible="dialogAddCategory"
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
    <div class="category-name">Назва</div>
    <InputText class="edit-category2" v-model="categoryName"  />
</div>   
<div>
        <Button class="decline2" @click="declineAddCategory"> Decline </Button>
        <Button class="accept2" @click="addCategoryFunction">
          Accept
        </Button>
      </div>
    </Dialog>
    <Dialog
      v-model:visible="dialogAddMenuitem"
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
    <div class="input-name">Назва</div>
    <InputText class="edit-name" v-model="itemName"  />
</div>   
<div>
    <div class="input-price">Ціна</div>
    <InputText class="edit-price" v-model="itemPrice"   /> UAH
</div>
<div > 
    <div class="input-description">Опис</div>   
    <Textarea class="desc-input" v-model="itemDesc" autoResize rows="5" cols="30" />
</div>   
<div >
    <div class="input-weight">Вага</div>
    <InputText class="weight-input" v-model="itemWeight"   /> г
</div>
     
      <div>
        <Button class="decline2" @click="declineAddMenuitem"> Decline </Button>
        <Button class="accept2" @click="addNewMenuItem">
          Accept
        </Button>
      </div>
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


const router = useRouter();
//const data = ref({});
const sortedData = ref([]);
const token = ref("");
const favorites = ref([]);
const dialog = ref(false);
const dialogCategory = ref(false);
const dialogAddCategory = ref(false);
const dialogAddMenuitem = ref(false);
const itemName = ref("");
const itemPrice = ref("");
const itemDesc = ref("");
const itemWeight = ref("");
const itemId = ref("");
const categoryName = ref("");
const categoryId = ref("");



onMounted(async () => {
  checkerToken();
  getMenu();
});
const getMenu = () => {
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
};
const redirectToHomePage = () => {
  router.push("/");
};
const checkerToken = () => {
  if (localStorage.getItem("token") === null) {
    token.value = false;
  } else {
    if (localStorage.getItem("role") === "staff") {
      token.value = false;
    } else {
      const email = localStorage.getItem("email");
      axios
        .get(`https://diploma-lya6.onrender.com/get/user/data/${email}`)
        .then((response) => {
          console.log("response data", response.data.data[0].favorites);
          favorites.value = response.data.data[0].favorites;
          token.value = true;
          console.log(favorites.value);
        });
    }
  }
};
const OpenDialog = (name, weight, price, description, id) => {
  dialog.value = true;
  console.log(name, weight, price, description, id);
  itemName.value = name;
  itemPrice.value = price;
  itemDesc.value = description;
  itemWeight.value = weight;
  itemId.value = id; 
  
  
};

const decline = () => {  
  itemDesc.value = "";
  itemName.value = "";
  itemPrice.value = "";
  itemWeight.value = "";
  itemId.value = "";
  dialog.value = false;
};
const declineCategory = () => {  
  categoryName.value = "";
  dialogCategory.value = false;
};
const declineAddCategory = () => {  
  categoryName.value = "";
  dialogAddCategory.value = false;
};
const declineAddMenuitem = () => {  
  categoryName.value = "";
  dialogAddMenuitem.value = false;
};
const acceptEdittedData = () => {
  const data = {
    name: itemName.value,
    price: itemPrice.value,
    description: itemDesc.value,
    weight: itemWeight.value,
    itemId: itemId.value,
    email: localStorage.getItem("email"),
  };
  console.log(data);
  axios
    .post("https://diploma-lya6.onrender.com/editMenuItem", data)
    .then((response) => {
      console.log(response);
      if (response.data.status === "success") {       
        dialog.value = false;
        itemDesc.value = "";
        itemName.value = "";
        itemPrice.value = "";
        itemWeight.value = "";
        toast.success("Дані успішно змінено");
        getMenu();
      }
    })
    .catch((error) => {
      if (error.response.status === 402) {
        toast.error("Користувач з таким email вже існує");
      } else {
        console.log(error);
        toast.error("Помилка");
      }
    });
};
const openDialogForCategoryEdit = (id,name) => {
  dialogCategory.value = true;
  categoryName.value = name;
  categoryId.value = id;
  console.log(id, name)
}
const acceptNewCategoryName = () => {
  const data = {
    name: categoryName.value,
    categoryId: categoryId.value,
    email: localStorage.getItem("email"),
  };
  console.log(data);
  axios
    .post("https://diploma-lya6.onrender.com/editCategory", data)
    .then((response) => {
      console.log(response);
      if (response.data.status === "success") {       
        dialogCategory.value = false;
        categoryName.value = "";
        categoryId.value = "";
        toast.success("Дані успішно змінено");
        getMenu();
      }
    })
    .catch((error) => {
      if (error.response.status === 402) {
        toast.error("Користувач з таким email вже існує");
      } else {
        console.log(error);
        toast.error("Помилка");
      }
    });

}
const addCategory = () => {
  dialogAddCategory.value = true;
}
const addCategoryFunction = () => {
  const data = {
    categoryName: categoryName.value,
    email: localStorage.getItem("email"),
  };
  console.log(data);
  axios
    .post("https://diploma-lya6.onrender.com/addCategory", data)
    .then((response) => {
      console.log(response);
      if (response.data.status === "success") {       
        dialogAddCategory.value = false;
        categoryName.value = "";
        toast.success("Дані успішно змінено");
        getMenu();
      }
    })
    .catch((error) => {
      if (error.response.status === 402) {
        toast.error("Користувач з таким email вже існує");
      } else {
        console.log(error);
        toast.error("Помилка");
      }
    });

}
const deleteCategory = (id) => {
  const data = {
    categoryId: id,
    email: localStorage.getItem("email"),
  };
  console.log(data);
  axios
    .post("https://diploma-lya6.onrender.com/deleteCategoryAndItems", data)
    .then((response) => {
      console.log(response);
      if (response.data.status === "success") {       
        toast.success("Дані успішно змінено");
        getMenu();
      }
    })
    .catch((error) => {
      if (error.response.status === 402) {
        toast.error("Користувач з таким email вже існує");
      } else {
        console.log(error);
        toast.error("Помилка");
      }
    });

}
const add = (name) => {
  dialogAddMenuitem.value = true;
  categoryName.value = name;
  console.log(name)
}
const addNewMenuItem = () => {
  const data = {
    name: itemName.value,
    price: itemPrice.value,
    description: itemDesc.value,
    weight: itemWeight.value,
    categoryName: categoryName.value,
    email: localStorage.getItem("email"),
  };
  console.log(data);
  axios
    .post("https://diploma-lya6.onrender.com/addMenuItem", data)
    .then((response) => {
      console.log(response);
      if (response.data.status === "success") {       
        dialogAddMenuitem.value = false;
        itemDesc.value = "";
        itemName.value = "";
        itemPrice.value = "";
        itemWeight.value = "";
        toast.success("Дані успішно змінено");
        getMenu();
      }
    })
    .catch((error) => {
      if (error.response.status === 402) {
        toast.error("Користувач з таким email вже існує");
      } else {
        console.log(error);
        toast.error("Помилка");
      }
    });

}
const deleteMenuItem = (id) => {
  const data = {
    itemId: id,
    email: localStorage.getItem("email"),
  };
  console.log(data);
  axios
    .post("https://diploma-lya6.onrender.com/deleteMenuItem", data)
    .then((response) => {
      console.log(response);
      if (response.data.status === "success") {       
        toast.success("Дані успішно змінено");
        getMenu();
      }
    })
    .catch((error) => {
      if (error.response.status === 402) {
        toast.error("Користувач з таким email вже існує");
      } else {
        console.log(error);
        toast.error("Помилка");
      }
    });

}
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
  flex: 0 0 90%;
  /* Adjust as needed */
  left: 0;
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
  background-color: #f9f6a5;
  font-size: 20px;
  z-index: 1;
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
.accept {
  background: #f9f6a5;
  border: none;
  color: black;
  position: relative;

  width: 100px;
  border-radius: 50px;
  left: 10%;
  transform: translate(0, -50%);
  margin-top: 10px;
  padding: 10px 40px;
  font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
}
.accept:focus {
  outline: none;
  box-shadow: none;
}
.item-name2 {
  /* Styles for the item name */
  font-size: 18px;
  font-weight: 500;
  color: #000000;
  margin-left: 30px;
  margin-top: 0px;

  font-family: "Neucha"; /*/* Use 'Neucha' font and fall back to cursive if not available */
}
.item-email2 {
  /* Styles for the item name */
  font-size: 18px;
  font-weight: 500;
  color: #000000;
  margin-left: 30px;
  margin-top: 0px;

  font-family: "Neucha"; /*/* Use 'Neucha' font and fall back to cursive if not available */
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
  padding: 10px 30px;
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
  padding: 10px 30px;
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
.input-weight {
  font-size: 15px;
  font-weight: 500;
  color: #000000;
  font-family: "Neucha";
}
.register-input{
    border: none;
    background: rgba(249, 246, 165, 0.3);
    border-radius: 50px;
  
  width: 300px;
  color: #000000;
  font-size: small;
} 
.register-input:focus {
    outline: none; /* Optional: Remove focus outline */
    box-shadow: none;
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
.edit-price{
  border: none;
  background: white;
    border-radius: 50px;
  padding: 10px 10px;
  margin-top: 10px;
  width: 100px;
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
.weight-input{
  border: none;
    background: white;
    border-radius: 50px;
  padding: 10px 10px;
  width: 100px;
  margin-top: 10px;
  color: #000000;
  font-size: small;
}
.edit-category{
  background: transparent;
  border: none;
  color: black;
  position: absolute;
  width: 50px;
  border-radius: 50px;
 margin-left: 0px;
  margin-top: 0px;
 
  font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
}
.edit-category:focus {
  outline: none;
  box-shadow: none;
}

.category-name {
  font-size: 15px;
  margin-top: 10px;
  font-weight: 500;
  color: #000000;
  font-family: "Neucha";
}
.edit-category2{
  border: none;
  background: white;
    border-radius: 50px;
  padding: 10px 10px;
  width: 250px;
  color: #000000;
  font-size: small;
}
.delete-category{
  background: transparent;
  border: none;
  color: red;
  position: absolute;
  width: 50px;
  border-radius: 50px;
 margin-left: 80px;
  margin-top: 0px;
 
  font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
}
.delete-category:focus {
  outline: none;
  box-shadow: none;
}
.add-menu-item{
  background: transparent;
  border: none;
  color: black;
  position: absolute;
  width: 50px;
  border-radius: 50px;
 margin-left: 40px;
  margin-top: 0px;
 
  font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
}
.add-menu-item:focus {
  outline: none;
  box-shadow: none;
}


.add-category {
  background: none;
  border: none;
  color: black;
  position: fixed;
  top: 5px;
  right: 50px;
  z-index: 2;
}
.add-category:focus {
  outline: none; /* Optional: Remove focus outline */
  box-shadow: none;
}
.delete-menu-item{
  background: #f9f6a5;
  border: none;
  color: black;
  position: absolute;

  width: 100px;
  border-radius: 50px;
  right: 10%;
  transform: translate(0, -50%);
  margin-top: 10px;
  padding: 10px 35px;
  font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
}
</style>
