<template>
  <div class="home">
        <h1>Home</h1>
        <hr>
    <button @click="logout">Salir</button>
  </div>
</template>

<script>
import firebase from "firebase";
// @ is an alias to /src
export default {
  name: "home",
  components: {},
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    }
  }
};
</script>
