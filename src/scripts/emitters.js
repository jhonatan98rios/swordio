function attackEmiter(socket, blocking, attack, oponnentDefense) {

  let precision = Math.floor(Math.random() * 20)
  let damage = Number()

  if(!blocking){
    // If the oponnent wasnt blocking, u can apply full damage
    damage = precision < 3 ? 0 :
      precision <= 10 ? Math.floor(Math.random() * 5) + attack - oponnentDefense :
        precision <= 15 ? Math.floor(Math.random() * 5) + 10 + attack - oponnentDefense :
          Math.floor(Math.random() * 10) + 15 + attack - oponnentDefense
  }else{
    // If the oponent was blocking, u can apply, just half damage, or receive a counter
    damage = precision <= 7 ? -1 :
      precision <= 12 ? Math.floor((Math.random() * 5 + attack - oponnentDefense) / 2) :
        precision <= 18 ? Math.floor((Math.random() * 5 + 10 + attack - oponnentDefense) / 2) :
          Math.floor((Math.random() * 10 + 15 + attack - oponnentDefense) / 2)
  }

  socket.emit('attack', damage)

  return damage
}

function cureEmitter(socket){
  let cureValue = (Math.floor(Math.random() * 20)) + 10

  socket.emit('useCure', cureValue)
  return cureValue
}

function defenseEmitter(socket){
  socket.emit('useDefense')
}

module.exports = {
  attackEmiter,
  cureEmitter,
  defenseEmitter
}