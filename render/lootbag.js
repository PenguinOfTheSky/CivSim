render.lootbag = function(opts={}) {
  let item = D.make('img', {
    className: 'lootbag',
    style: `position:absolute;z-index:4;transition:.6s all ease-in;width:7vh;height:7vh;right:45%;top:15%; filter:drop-shadow(1px 1px 3px gold);`,
  })
  let pos = [Math.random()*85,Math.random()*33]
  let active = true;
  item.src='images/' + opts.src
  setTimeout(function(){
    item.style.right = `${pos[0]}%`
    item.style.top = `${pos[1]}%`
    item.style.transform = `scale(1.4)`
  },60)
  setTimeout(function() {
    item.onmouseenter = function() {
      if (active) {
        active = false;
        item.style.transform=`translate(-200%, -120%) scale(2.5) rotate(-90deg) `
        item.style.opacity = .7
        setTimeout(function() {
          pc.gold += opts.gold || 0
          item.remove()
          render.uiCounters()
        },500)
      }
    }
  },120)
  setTimeout(function() {
    if (active) {
      active = false;
      item.style.transform=`translate(-200%, -120%) scale(2.5) rotate(-90deg) `
      item.style.opacity = .7
      setTimeout(function() {
        pc.gold += opts.gold || 0
        item.remove()
        render.uiCounters()
      },500)
    }
  },15000)
  return item;
}
