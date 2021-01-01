<template>
  <div>
    <Loading v-if="inLoading" />
    <div v-if="!inLoading">

      <div>
        <Header 
          :health="oponnent.health"
        />

        <OponnentView ref="oponnentView" />
        
        <Painel 
          :counter="counter" 
          :console="console" 
          :active="user.active"
          :health="user.health"
        />
      </div>

      <Controls 
        v-if="user.active" 
        :active="user.active" 
        :socket="socket" 
        @oponnentCounterAttack="oponnentCounterAttack"
        @attack="attack"
        @useCure="useCure"
        @useDefense="useDefense"
      />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Arena/Header.vue'
import OponnentView from '@/components/Arena/OponnentView.vue'
import Painel from '@/components/Arena/Painel.vue'
import Loading from '@/components/Arena/Loading.vue'
import Controls from '@/components/Arena/Controls.vue'
import { attackEmiter, cureEmitter, defenseEmitter } from '../scripts/emitters'
import { sprites, damageAnimation } from '../scripts/spriteAnimation'


export default {
  components:{
    Header,
    OponnentView,
    Painel,
    Loading,
    Controls,
  },

  props: {
    socket: {
      type: Object,
    }
  },

  data(){
    return {
      inLoading: true,
      inProgress: false,
      counter: 0,
      user:{
        health: 200,
        active: false,
        defense: false
      },
      oponnent: {
        health: 200,
        defense: false,
        spriteInterval: null
      },
      console: 'Olá Vue'
    }
  },

  computed:{
    oponnentRef(){
      return this.$refs.oponnentView.$refs.opponent
    }
  },

  methods: {

    startGame: function(){
      this.user.health = 200
      this.oponnent.health = 200
      this.inProgress = true
      this.inLoading = false

      setTimeout(() => {
        this.spriteAnimation(this.oponnentRef, 'static_sprites')
      }, 100)
    },


    damage: function (dmg) {
      this.user.active = true

      if(this.user.defense && dmg == -1){
        this.userCounterAttack()
        return
      }

      this.user.health -= dmg;

      if(dmg != 0){
        this.console = `Você perdeu ${dmg} pontos de HP`
        if (dmg > 15) this.console += '\nAtaque crítico!'

      }else{
        this.console = `Você se esquivou do golpe`
      }

      if(this.user.health <= 0){
        alert('Você perdeu!')
        this.console = 'Você perdeu!'
        this.$props.socket.emit('logout')
      }
    },


    oponnentCure: function(cureValue){
      this.oponnent.health += cureValue
      this.console = `Seu oponente usou uma poção de cura. Ele recuperou ${cureValue} pontos de vida`
    },


    oponnentCounterAttack: function(){
      this.oponnent.defense = false
      this.user.health -= 20
      this.console = 'Seu oponente contra atacou. Você recebeu 20 pontos de dano'
      if(this.user.health <= 0){
        alert('Você perdeu!')
        this.console = 'Você perdeu!'
        this.$props.socket.emit('logout')
      }
    },


    userCounterAttack: function(){
      this.user.defense = false
      this.oponnent.health -= 20
      this.console = 'Você contra atacou. Seu oponente recebeu 20 pontos de dano'
    },


    attack: function(){
      if(this.user.active){

        let dmg = attackEmiter(this.$props.socket, this.oponnent.defense)

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
          this.spriteAnimation(this.oponnentRef, 'damage_sprites', 75)

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
        let cureValue = cureEmitter(this.$props.socket, this.user.health)
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
      defenseEmitter(this.$props.socket)
      this.endTurn()
    },


    unavailable(){
      this.console = `Essa função ainda não está disponível`
    },


    initiateCount: function(){
      this.counter = 5
      this.user.defense = false

      clearInterval(this.turnTimer)
      this.turnTimer = setInterval(() => {

        if(this.counter > 0){
          this.counter--

        }else{

          clearInterval(this.turnTimer)
          this.user.active = false
          this.$props.socket.emit('changeTurn')

        }
      }, 1000)
    },


    endTurn(){
      clearInterval(this.turnTimer)
      this.oponnent.defense = false
      this.user.active = false
      this.$props.socket.emit('changeTurn')
      this.counter = 0
    },



    /* Animations */
    spriteAnimation(opponent, animation, interval = 140){
      clearInterval(this.oponnent.spriteInterval)
      let sprite = 1

      this.oponnent.spriteInterval = setInterval(() => {

        sprite = (sprite < sprites[animation].length -1) ? sprite + 1 : 0

        if(opponent){
          //opponent.src = sprites[animation][sprite]
        }

      }, interval)

      if(animation == "damage_sprites"){
        damageAnimation(opponent)
        setTimeout(()=> this.spriteAnimation(opponent, "static_sprites"), 900)
      }

      if(animation == "attack_sprites"){
        setTimeout(()=> this.spriteAnimation(opponent, "static_sprites"), 450)
      }
    }
  },


  mounted(){

    if(!this.$props.socket){
      this.$router.push('salas')
    }

    this.$props.socket.on('startGame', () => {
      this.startGame()
    })

    this.$props.socket.on('turnOn', () => {
      this.user.active = true
      this.initiateCount()
    })

    // Inflinct damage in the player
    this.$props.socket.on('damage', (dmg) => {
      this.spriteAnimation(this.oponnentRef, 'attack_sprites', 30)
      this.damage(dmg)
    })

    // oponnentCure
    this.$props.socket.on('oponnentCure', (cureValue) => {
      this.oponnentCure(cureValue)
    })

    // oponnentDefense
    this.$props.socket.on('oponnentDefense', () => {
      this.oponnent.defense = true
      this.console = `Seu oponente está preparado para se defender`
    })

    // When you win a battle
    this.$props.socket.on('win', () => {
      alert('Você venceu')
      this.console += '\nVocê venceu!!'
      clearInterval(this.turnTimer)
    })
  }
};
</script>

<style lang="scss" scoped>

</style>