<template>
  <div class="header">
    <a @click.prevent="logout"><p>Sair</p></a>
  </div>
</template>

<script>
import { userKey } from '@/global'
import { mapState } from 'vuex'
export default {
  name: 'Header',
  components: {
  
  },
  computed: mapState(['user']),
  methods: {
    logout(){
      localStorage.removeItem(userKey)
      this.$store.commit('setUser', null)
      this.$router.push('/auth')
    }
  }

}
</script>

<style lang="scss">
  .header{
    grid-area: header;
    height: 100%;
    background-color: #F57E68;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;

    a{
      font-size: 1.2em;
      &:hover{
        cursor: pointer
      }
    }
    
  }
</style>
