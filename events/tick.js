events.tick = function() {
  pc.pop += pc.birthrate
  if (pc.pop >= pc.maxPop) pc.pop = pc.maxPop
  pc.gold += pc.pop * pc.morale
  if (pc.clicks < 79.9) pc.clicks += ((80-pc.clicks)**1.21)/100 +.001
  window.render.uiCounters()
  //if (json.shiny.mined > json.shiny.rate) json.shiny.mined -= json.shiny.rate/5;
  json.shiny.render()
  pc.morale *= .99996
  pc.scienceSpeed *= .9999
  let mobs = []
  let trees = []
  let shinies = []
  for (let i in grid) {
    if (grid[i]) {
      if (grid[i].name =='mob' && grid[i].active) {
        mobs.push(i)
      } else if (grid[i].name == 'tree') {
        trees.push(i)
      } else if (grid[i].name == 'shiny') shinies.push(i)
    }
  }
  console.log(trees)
  for (let x in pc.harvest) {
    if (pc.harvest[x]) {
      if (x == 'mobs') {
        mobs.forEach(ele => {
          grid[ele].onclick(pc.harvest[x]/mobs.length, 1)
        })

      } else if (x =='logs') {
        trees.forEach(ele => {
          grid[ele].onclick(pc.harvest[x]/trees.length, 1)
        })
      } else if (x =='shinies') {
        shinies.forEach(ele => {
          grid[ele].onclick(pc.harvest[x]/shinies.length, 1)
        })
      } else {
        pc[x] += pc.harvest[x]
      }
    }

  }
}
