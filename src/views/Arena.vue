<template>
  <div>

    <Loading v-if="!user || !oponnent || inLoading" />
    <div v-if="user && oponnent && !inLoading">

      <div>
        <Header 
          :health="oponnent.hp"
        />

        <OponnentView 
          ref="oponnentView" 
          :spritesheet="oponnent.spritesheet" 
        />
        
        <Painel 
          :counter="counter" 
          :console="console" 
          :active="user.active"
          :health="user.hp"
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

export default {
  components:{
    Header,
    OponnentView,
    Painel,
    Loading,
    Controls
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
      user: {},
      oponnent: {
        hp: 200,
        spritesheet: 'default'
      },
      console: 'Você está conectado',
      sounds: {}
    }
  },

  computed: {
    perfilState(){
      return this.$store.state.perfil
    }
  },

  methods: {

    initPlayers: function(perfil){
      this.user = {
        ...this.perfilState,
        active: false,
        blocking: false,
        hasPotion: true
      }

      this.oponnent = {
        ...perfil,
        spritesheet: 'default',
        blocking: false
      }

      console.log('this.user')
      console.log(this.user)

      console.log('this.oponnent')
      console.log(this.oponnent)
    },

    startGame: function(){
      if(this.oponnent.nv >= this.user.nv){
        this.user.active = true
      }

      this.inProgress = true
      this.inLoading = false
    },


    damage: function (dmg) {

      this.oponnent.spritesheet = 'attack'
      this.playSound('attack')

      setTimeout(() => this.oponnent.spritesheet = 'default', 630)

      this.user.active = true

      if(this.user.blocking && dmg == -1){
        this.userCounterAttack()
        return
      }

      this.user.hp -= dmg;

      if(dmg > 0) this.console = `Você perdeu ${dmg} pontos de HP. `
      if(dmg > 15) this.console += ' Ataque crítico!'      
      if(dmg <= 0) this.console = `Você se esquivou do golpe`

      if(this.user.hp <= 0){    

        this.console = ''
        this.$store.dispatch('setWarning', { amount: 'Você perdeu...' })
        this.user.hp = 0
        this.$props.socket.emit('logout')
      }
    },


    oponnentCure: function(cureValue){
      this.oponnent.hp += cureValue
      this.console = `Seu oponente usou uma poção de cura. Ele recuperou ${cureValue} pontos de vida`
    },


    oponnentCounterAttack: function(){
      this.oponnent.blocking = false
      this.user.hp -= this.oponnent.attack
      this.console = 'Seu oponente contra atacou. Você recebeu 20 pontos de dano'
      if(this.user.hp <= 0){
        //alert('Você perdeu!')
        this.console = 'Você perdeu!'
        this.$store.dispatch('setWarning', { amount: 'Você venceu!!' })
        this.gotExp(5) 
        this.$props.socket.emit('logout')
      }
    },


    userCounterAttack: function(){
      this.user.blocking = false
      this.oponnent.hp -= this.user.attack
      this.console = 'Você contra atacou. Seu oponente recebeu 20 pontos de dano'
    },


    attack: function(){
      if(this.user.active){

        let dmg = attackEmiter(this.$props.socket, this.oponnent.blocking, this.user.attack, this.oponnent.defense)

        if(dmg == -1){

          this.playSound('blocked')
          this.oponnentCounterAttack()
          this.endTurn()
          return
        }
        
        if(dmg != 0){

          this.playSound('attack')
          this.oponnent.hp -= dmg
          this.console = `Seu golpe causou ${dmg} de dano`
          if (dmg > 15) this.console += '\nAtaque crítico!'

          this.oponnent.spritesheet = 'hurt'
          setTimeout(() => {
            if(this.oponnent.hp <= 0){    
              this.oponnent.spritesheet = 'died'

            }else{
              this.oponnent.spritesheet = 'default'
            }
          }, 630)


        }else{
          // Missed attack
          this.playSound('missed')
          this.console = 'Você errou o golpe;'
        }

        this.endTurn()
      }
    },


    useCure: function(){
      if(this.user.hasPotion){

        this.playSound('item')

        this.user.hasPotion = false
        let cureValue = cureEmitter(this.$props.socket, this.user.hp)
        this.user.hp += cureValue
        this.console = `Você usou uma poção de cura e recuperou ${cureValue} pontos de vida`
        this.endTurn()

      }else{
        this.console = `Você não tem mais poções`
      }
    },


    useDefense: function(){
      this.user.blocking = true
      this.console = `Você se preparou para defender`
      defenseEmitter(this.$props.socket)
      this.endTurn()
    },

    initiateCount: function(){
      this.counter = 3
      this.user.blocking = false

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


    endTurn: function(){
      clearInterval(this.turnTimer)
      this.oponnent.blocking = false
      this.user.active = false
      this.$props.socket.emit('changeTurn')
      this.counter = 0
    },

    gotExp: function(xp){
      this.$store.dispatch('setExpState', { xp })
    },

    loadSounds: function(){
      this.sounds.attack = new Audio('https://media1.vocaroo.com/mp3/13tfsmPUKrOX')
      this.sounds.missed = new Audio('https://media1.vocaroo.com/mp3/1e2rY253BKzH')
      this.sounds.blocked = new Audio('https://media1.vocaroo.com/mp3/1oBYEk6es0Yi')
      this.sounds.item = new Audio('https://media1.vocaroo.com/mp3/16RNLg7yTKVb')
    },

    playSound: function(sound){
      if(this.sounds[sound] && this.$store.state.sound.active ){
        this.sounds[sound].play()
      } 
    },

  },


  mounted(){

    if(this.$props.socket){

      this.$props.socket.on('dataBinding', () => {
        this.$props.socket.emit('sendPlayerData', this.perfilState)
      })

      this.$props.socket.on('startGame', (perfil) => {
        //console.log('start game')
        this.initPlayers(perfil)
        this.startGame()
        this.loadSounds()
      })

      this.$props.socket.on('turnOn', () => {
        this.user.active = true
        this.initiateCount()
      })

      // Inflinct damage in the player
      this.$props.socket.on('damage', (dmg) => {
        this.damage(dmg)
      })

      // oponnentCure
      this.$props.socket.on('oponnentCure', (cureValue) => {
        this.oponnentCure(cureValue)
      })

      // oponnentDefense
      this.$props.socket.on('oponnentDefense', () => {
        this.oponnent.blocking = true
        this.console = `Seu oponente está preparado para se defender`
      })

      // When you win a battle
      this.$props.socket.on('win', () => {
        this.oponnent.hp = 0
        clearInterval(this.turnTimer)
        this.$store.dispatch('setWarning', { amount: 'Você venceu!!' })
        this.gotExp(10)
      })
      
    }else{
      this.$router.push('salas')
    }   
  }
};
</script>

<style lang="scss" scoped>

</style>