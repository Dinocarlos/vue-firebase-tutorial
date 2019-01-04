<template>
  <div class="sign-up">
    <p>Create una nueva cuenta!</p>
    <input type="text" v-model="email" placeholder="Email">
    <br>
    <input type="password" v-model="password" placeholder="Password">
    <br>
    <button @click="signUp">Sign Up</button>
    <span>Volver al
      <router-link to="/login">Login</router-link>.
    </span>
  </div>
</template>
<script>
// import firebase from "firebase";
import { database, auth } from "@/fire.js";
export default {
  name: "signUp",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signUp: function() {
      auth.createUserWithEmailAndPassword(this.email, this.password).then(
        user => {
          const usuarios = {
            username: this.email
          };
          //Push message to firebase reference
          database.ref("users").push(usuarios);
          this.$router.replace("chat");
        },
        err => {
          alert("Oops." + err.message);
        }
      );
    }
  }
};
</script>

<style scoped>
.signUp {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  margin-top: 10px;
  width: 10%;
  cursor: pointer;
}
span {
  display: block;
  margin-top: 20px;
  font-size: 11px;
}
</style>
