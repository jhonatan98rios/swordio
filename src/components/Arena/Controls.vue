<template>
  <div class="is-column controls">
    <img src="../../assets/images/attack.svg" alt="Ataque" @click="attack">
    <img src="../../assets/images/itens.svg" alt="Itens" @click="useCure" v-if="hasPotion">
    <img src="../../assets/images/defense.svg" alt="Defesa" @click="useDefense">
  </div>
</template>

<script>
export default {
  data(){
    return{
      hasPotion: true
    }
  },
  methods: {
    attack: function(){
      if(this.user.active){

        //let dmg = attackEmiter(socket, this.oponnent.defense)
        let dmg = 10

        if(dmg == -1){
          this.oponnentCounterAttack()
          this.endTurn()
          return
        }
        
        if(dmg != 0){

          this.oponnent.health -= dmg
          this.console = `Seu golpe causou ${dmg} de dano`
          if (dmg > 15) this.console += '\nAtaque crítico!'
          
          // Make animation
          this.spriteAnimation(this.$refs.opponent, 'damage_sprites', 75)

        }else{
          // Missed attack
          this.console = 'Você errou o golpe;'
        }

        this.endTurn()
      }
    },

    useCure(){
      if(this.hasPotion){
        this.hasPotion = false
        //let cureValue = cureEmitter(socket, this.user.health)
        let cureValue = 10
        this.user.health += cureValue
        this.console = `Você usou uma poção de cura e recuperou ${cureValue} pontos de vida`
        this.endTurn()

      }else{
        this.console = `Você não tem mais poções`
      }
    },

    useDefense(){
      this.user.defense = true
      this.console = `Você se preparou para defender`
      //defenseEmitter(socket)
      this.endTurn()
    },

    unavailable(){
      this.console = `Essa função ainda não está disponível`
    },

    attackEmiter(socket, blocking) {

      let precision = Math.floor(Math.random() * 20)
      let damage = Number()

      if(!blocking){
        // If the oponnent wasnt blocking, u can apply full damage
        damage = precision < 3 ? 0 :
          precision <= 10 ? Math.floor(Math.random() * 5) + 5 :
            precision <= 15 ? Math.floor(Math.random() * 5) + 10 :
              Math.floor(Math.random() * 10) + 15
      }else{
        // If the oponent was blocking, u can apply, just half damage, or receive a counter
        damage = precision <= 7 ? -1 :
          precision <= 12 ? Math.floor((Math.random() * 5 + 5) / 2) :
            precision <= 18 ? Math.floor((Math.random() * 5 + 10) / 2) :
              Math.floor((Math.random() * 10 + 15) / 2)
      }

      //socket.emit('attack', damage)

      return damage
    },

    defenseEmitter(socket){
      socket.emit('useDefense')
    }
  }
}
</script>

<style lang="scss" scoped>

.controls{
  border-bottom: none;
  width: 100px;
  min-height: 300px;
  height: auto;
  position: absolute;
  right: 0px;
  top: 200px;
  z-index: 9999;
  display: flex;
  flex-direction: column;

  img{
    width: 60px;
    height: 60px;
    margin: 10px;
  }
}


</style>