let sounds = {
  default: new Audio('https://media1.vocaroo.com/mp3/1og1THFGbREk'),
  battle: new Audio('https://media1.vocaroo.com/mp3/17EWbkf23mWC'),
  //store: new Audio('https://media1.vocaroo.com/mp3/1d3I0NmJtzcv'),
  //blocked: new Audio('https://media1.vocaroo.com/mp3/1cLUKrQ6Mi3I'),
  //item: new Audio('https://media1.vocaroo.com/mp3/1OIiW6n5pcGP'),
  //missed: new Audio('https://media1.vocaroo.com/mp3/1e2rY253BKzH'),
  //victory: new Audio('https://media1.vocaroo.com/mp3/1fTvEgulgLaW'),
}

sounds.default.loop = true
sounds.battle.loop = true
//sounds.forest.loop = true
//sounds.store.loop = true

function stopSounds(){
  Object.keys(sounds).forEach( key => {
    sounds[key].pause();
    sounds[key].currentTime = 0
  })
}

module.exports = {
  sounds,
  stopSounds
}


// default: https://media1.vocaroo.com/mp3/1og1THFGbREk
// battle: https://media1.vocaroo.com/mp3/1bAS6JppM3yr
// forest: https://media1.vocaroo.com/mp3/17EWbkf23mWC
// store: https://media1.vocaroo.com/mp3/1d3I0NmJtzcv

// attack: https://media1.vocaroo.com/mp3/13tfsmPUKrOX
// blocked: https://media1.vocaroo.com/mp3/1cLUKrQ6Mi3I
// item: https://media1.vocaroo.com/mp3/1OIiW6n5pcGP
// missed: https://media1.vocaroo.com/mp3/1e2rY253BKzH
// victory: https://media1.vocaroo.com/mp3/1fTvEgulgLaW