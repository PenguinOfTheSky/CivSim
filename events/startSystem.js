{
  'use strict'
  let bgImages = [
    "images/dirt.jpg"
  ]
  let grid = []
  let line
  events.startSystem = function() {

    for (let i =0; i < 16; i++) {
      grid.push(null)
    }
    let gridLength = 3
    let gridHeight = 1

    data.gridlength = 3;
    data.gridHeight = 1
    let loc = function(x, y) {
      return (y * gridLength) + x
    }
    line = [json.mobs(),json.shiny,json.trees2()]
    grid[loc(0,1)] = json.shiny
    //grid[loc(3,1)] = json.trees
    //grid[loc(1,2)] = json.wanderShiny
    let trees = [json.trees2(),json.trees2(),json.trees2()]
    let mobs = [json.mobs(), json.mobs(), json.mobs()]
    //grid[loc(2,1)] = trees[0]
    grid[loc(0,2)] = trees[1]
    //grid[loc(2,0)] = trees[2]
    grid[loc(0,0)] = mobs[0]
    //grid[loc(0,2)] = mobs[1]
    //grid[loc(2,2)] = mobs[2]
    render(grid)
  }
  let render = function(grid) {
    let frag = document.createDocumentFragment();
    line.forEach((ele, i)=> {

      let box = D.make('div', {
        style: `height:30.333%;width:100%;max-height:32.333%;max-width:100%;box-sizing:border-box; display: inline-flex;/*box-shadow:0px 0px 2vh 1vh brown inset;*/ margin:0px;padding:0px; box-sizing:border-box;
        -webkit-user-select: none; /* Safari 3.1+ */
        -moz-user-select: none; /* Firefox 2+ */
        -ms-user-select: none; /* IE 10+ */
        user-select: none; /* Standard syntax */`
      })
      if (ele) {
        window.i = box
        if (!ele.currentImage) ele.currentImage = ele.images[Math.floor(Math.random() * ele.images.length)]
        let img = D.make('img', {
          src: ele.currentImage,
          style: 'height:100%;width:100%; transition: transform .5s linear;',
          draggable: false
        })
        ele.ref = img
        box.onclick = ele.onclick;
        ele.render()
        box.append(img)
      }
      frag.append(box)
    })
    D.find('#grid').append(frag)
    json.build = json.build()
    json.empire = json.empire()
    json.research = json.research()
    json.train = json.train()
    json.quests = json.quests()
    json.build.init();
    window.render.uiCounters()
  }

  setInterval(function(){
    events.tick()

  },2399)
}
