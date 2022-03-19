Object.assign(json, {
  train: function() {

    let obj = {

      "Stick Gatherer": {
        level: 0,
        tip: "Increases lumber harvest by .1/tick",
        info: ``,
        onbuy: function(n) {
          pc.harvest.logs += .1 * n
        },
        cost: {
          gold: 1,
          logs: .51,
          pop: 1
        }
      },
      "Pebble picker-upper": {
        level: 0,
        tip: "Increases shiny harvest by .1/tick",
        info: ``,
        onbuy: function(n) {
          pc.harvest.shinies += .1 * n
        },
        cost: {
          gold: 1.1,
          shinies: .52,
          pop: 1
        }
      },
      "Gopher-whacker": {
        level: 0,
        tip: "Increases defense by .1 (kills monsters and protects against foreign armies)",
        info: ``,
        onbuy: function(n) {
          pc.harvest.mobs += .1 * n
        },
        cost: {
          gold: 1,
          logs: .5,
          pop: 1
        }
      },
      "Lean-to shelter": {
        req: 'Stick Shelters',
        level: 1,
        tip: "Raises max population by 2",
        info: ``,
        onbuy: function(n) {
          pc.maxPop += 2 * n
          render.population()
        },
        cost: {
          land: 1,
          logs: 5
        }
      },
      "Wigwam": {
        req: 'Stick Shelters',
        level: 2,
        tip: "Raises max population by 4",
        info: ``,
        onbuy: function(n) {
          pc.maxPop += 4 * n
          render.population()
        },
        cost: {
          land: 1,
          logs: 10
        }
      }
    }
    let opts = {
      "init": function() {
        let frag = D.createDocumentFragment()
        let landUseHTML = function() {
          return `Specialists do not count towards population, and do not contribute normal taxes of gold each tick.`
        }
        let landUse =
        D.make('div', {
          className: "menuDisplay_item",
          innerHTML: landUseHTML()
        })
        frag.appendChild(landUse)
        let keys = Object.keys(obj)
        keys.forEach(ele => {
          if (obj[ele].req && (!pc.research[obj[ele].req] || pc.research[obj[ele].req] < obj[ele].level)) return;
          let cost = function(n) {
            let str = ``
            n = Math.round(n || 1)

            for (let x in obj[ele].cost) {
              let amt = Math.ceil(((pc.trained[ele]||0)**1.07)/8 +  obj[ele].cost[x] * n * (((pc.trained[ele]||1)**.33)))
              str += " " + amt + render.iconString(x)
            }
            return str
          }

          let buttons = D.createDocumentFragment()
          buttons.append(
            D.make('button', {
            innerHTML: "Buy <input type='number' value='1' style='width:2.4rem;'><br>"+cost(),
            className: 'buy',
            onchange: function() {
              let n = this.querySelector('input').value
              if (n < 1) {
                this.querySelector('input').value = 1;
                n = 1
              }
              this.innerHTML = `Train <input onclick='event.stopPropagation();event.preventDefault();' type='number' value='${n}' style='width:2.4rem;'><br>`+cost(n)
            },
            onclick: function(e) {

              if (e.target.type == 'number') return;
              let n = Math.round(this.querySelector('input').value)
              let price = obj[ele].cost
              let canPay = true;
              let payType = ''
              for (let x in price) {
                let amt = ((pc.trained[ele]||0)**1.07)/8 +  obj[ele].cost[x] * n * (((pc.trained[ele]||1)**.33))
                if (pc[x] < amt) {
                  payType = x
                  canPay = false;
                }
              }
              if (canPay == false) {
                events.errorMsg(`Not enough ${payType}!`)
                return;
              }
              else {
                for (let x in price) {
                  pc[x] -= ((pc.trained[ele]||0)**1.07)/8 +  obj[ele].cost[x] * n * (((pc.trained[ele]||1)**.33))
                }
              }
              obj[ele].onbuy(n)
              if (!pc.trained[ele]) pc.trained[ele] = 0
              pc.trained[ele] += n
              this.onchange()
              owned.innerHTML = `Trained: ${pc.trained[ele] || 0}`
              landUse.innerHTML = landUseHTML()
            }
            }),
            /*D.make('button', {
              innerText: "Sell",
              className: 'sell',
              onclick: function() {

              }
            })*/
          )
          let owned = D.make('div', {
            innerText: `Built: ${pc.trained[ele] || 0}`
          })
          let div = D.make('div', {
            className: 'menuDisplay_item',
            innerHTML: `<b style='display:block;text-align:center;'>${ele}</b> ${obj[ele].tip}<br>`
          })
          div.append(buttons, owned)
          frag.append(div)
        })
        let footer = D.make('div', {
          className: `menuDisplay_item`,
          innerHTML: "<b style='display:block;text-align:center;'>???</b><br>Research technology to unlock more options."
        })
        D.find('#menuDisplay').innerHTML = ""
        D.find('#menuDisplay').append(frag, footer)
      },
    }
    return opts
  }
})
