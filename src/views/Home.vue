<template>
  <div class="home">
    <button @click="logout">Salir</button>
  </div>
  
</template>

<script>
import firebase from 'firebase';
// @ is an alias to /src
export default {
  name: "home",
  components: {
  },
    methods: {
      logout: function(){
        firebase.auth().signOut().then(() =>{
          this.$router.replace('login')
        })
      }  
   }
}
</script>
