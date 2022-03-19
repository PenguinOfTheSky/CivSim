Object.assign(render, {
  base: function(type) {

  },
  shinies: function() {
      D.find('#shinies').innerText = render.trim(pc.shinies)//Math.floor(pc.shinies)
  },
  population: function() {
    D.find('#population').innerText = render.trim(pc.pop)+"/"+render.trim(pc.maxPop)
  },
  land: function() {
    D.find('#land').innerText =  render.trim(pc.usedLand) + '/' + render.trim(pc.usedLand + pc.land)
  },
  logs: function() {
    D.find('#logs').innerText = render.trim(pc.logs)
  },
  morale: function() {
    D.find('#morale').innerText = Math.round(pc.morale * 100)
  },
  gold: function() {
    D.find('#gold').innerText = render.trim(pc.gold)
  },
  clickCounter: function() {
    D.find('#clickCounter').style.background= `linear-gradient(0deg, #00FF0F ${pc.clicks*1.25 - 3}%, #FF002B ${pc.clicks*1.25 + 3}%)`
  },
  trim: function(num) {
    if (num < 10) {
      num = +num.toFixed(1)
    } else {
      num = Math.floor(num)
    }
    if (num > 10000) {
      num /= 1000
      if (num < 10) {
        num = +num.toFixed(1)
      } else {
        num = Math.floor(num)
      }
      num += 'K'
    }
    return num;
  },
  iconString: function(x) {
    let cost = ''
    switch(x) {
      case "pop":
        cost += "<img src='images/icons/pop.svg' class='icon_small' title='people'>"
        break;
      case "logs":
        cost += "<img src='images/icons/logs.svg' class='icon_small' title='logs'>"
        break;
      case "gold":
        cost += "<img src='images/icons/coins.svg' class='icon_small' title='gold'>"
        break;
      case "land":
        cost += "<img src='images/icons/land.svg' class='icon_small' title='land'>"
        break;
      case 'time':
        cost += "<img src='images/icons/time.svg' class='icon_small' title='time(beats)'>"
        break;
      case 'shinies':
        cost += "<img src='images/icons/shiny.svg' class='icon_small' title='shinies'>"
        break;
      default: cost += x
    }
    return cost;
  },
  uiCounters: function() {
    window.render.shinies()
    window.render.logs()
    window.render.gold()
    window.render.population()
    window.render.land()
    window.render.morale()
    window.render.clickCounter()
  }
})
