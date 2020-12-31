<template>
  <div class="welcome">
    <Login v-if="hasAccount" @changeHasAccount="hasAccount = false"/>
    <Sign v-if="!hasAccount" @changeHasAccount="hasAccount = true" />
  </div>
</template>

<script>
import Login from '@/components/Login.vue'
import Sign from '@/components/Sign.vue'

export default {
  name: 'welcome',
  components: {
    Login,
    Sign
  },
  data(){
    return{
      hasAccount: false
    }
  }
}
</script>

<style lang="scss" scoped>

.welcome{
  //background-image: url(../images/paper.png);
  min-height: 700px;
  width: 90vw;
  max-width: 700px;
  background-repeat: no-repeat;
  background-position: top;
  background-size: contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  p, small {
    width: 60%;
    max-width: 320px;
    text-align: center;
    margin: 0px auto;
    color: #333333;
  }

  input{
    border: none;
    background-color: transparent;
    border-bottom: 1px #333333 solid;
    margin: 16px auto;
    font-size: 14px;
  }

  input:focus{
    outline: none;
  }

  button{
    background-color: transparent;
    border: none;
    width: 100px;
    height: 32px;
    cursor: pointer;
    font-size: 14px;
  }

  button:focus{
    outline: none;
  }

  p{
    cursor: pointer;
    font-size: 14px;
  }

}





</style>
