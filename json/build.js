Object.assign(json, {
  build: function() {

    let obj = {

      "Bed of Leaves": {
        tip: "Raises max population by 1. Humans produce gold in tribute. It's not as good as shinies but it seems to have uses.",
        info: ``,
        onbuy: function(n) {
          pc.maxPop += 1 * n
          render.population()
        },
        cost: {
          land: 1,
          logs: 1
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
      "Tipi": {
        req: 'Stick Shelters',
        level: 2,
        tip: "Raises max population by 2, doesn't take up much space",
        info: ``,
        onbuy: function(n) {
          pc.maxPop += 2 * n
          render.population()
        },
        cost: {
          land: .5,
          logs: 11
        }
      },
      "Wigwam": {
        req: 'Stick Shelters',
        level: 2,
        tip: "Raises max population by 6",
        info: ``,
        onbuy: function(n) {
          pc.maxPop += 6 * n
          render.population()
        },
        cost: {
          land: 1,
          logs: 30
        }
      },
      "Longhouse": {
        req: 'Stick Shelters',
        level: 3,
        tip: "Raises max population by 35",
        info: ``,
        onbuy: function(n) {
          pc.maxPop += 35 * n
          render.population()
        },
        cost: {
          land: 3,
          logs: 100,
          gold: 100,
          shinies: 10
        }
      },
      "Bonfire": {
        req: 'Fire',
        level: 1,
        tip: "Raises birthrate by .05/tick",
        info: ``,
        onbuy: function(n) {
          pc.birthrate += .05 * n
        },
        cost: {
          land: 1,
          logs: 5
        }
      },
      "Campfires": {
        req: 'Fire',
        level: 2,
        tip: "Raises birthrate by .1/tick",
        info: ``,
        onbuy: function(n) {
          pc.birthrate += .1 * n
        },
        cost: {
          land: .5,
          logs: 15
        }
      },
     /*"Library": { //knowledge does...?
       req: 'Knowledge',
       level: 2,
       tip: "Placeholder",
       info: ``,
       onbuy: function(n) {
         pc.Knowledge += 1 * n
       },
       cost: {
         land: 2,
         logs: 20
       }
     },*/

    }
    let opts = {
      "init": function() {
        let frag = D.createDocumentFragment()
        let landUseHTML = function() {
          return `<b>Total Land:</b> ${pc.land}<br>
          <b>Land in use:</b> ${pc.usedLand} <br>
          <b>% used:</b> ${Math.round(pc.usedLand/(pc.usedLand + pc.land) *100)}%`
        }
        let landUse =
        D.make('div', {
          className: "menuDisplay_item",
          innerHTML: landUseHTML()
        })
        frag.appendChild(landUse)
        let keys = Object.keys(obj)
        keys.forEach(ele => {
          if (obj[ele].req && (!pc.research[obj[ele].req] || pc.research[obj[ele].req] < obj[ele].level)) {
            return;
          }
          let cost = function(n) {
            let str = ``

            for (let x in obj[ele].cost) {
              let amt;
              if (x != 'land') amt = Math.ceil(((pc.built[ele]||0)**1.07)/8 +  obj[ele].cost[x] * n * (((pc.built[ele]||1)**.33)))
              else amt = obj[ele].cost[x] * n
              str += " " +amt + render.iconString(x)
            }
            return str
          }

          let buttons = D.createDocumentFragment()
          buttons.append(
            D.make('button', {
            innerHTML: "Build <input type='number' value='1' style='width:2.4rem;'><br>"+cost(1),
            className: 'buy',
            onchange: function() {
              let n = this.querySelector('input').value
              if (n < 1) {
                this.querySelector('input').value = 1;
                n = 1
              }
              this.innerHTML = `Build <input onclick='event.stopPropagation();event.preventDefault();' type='number' value='${n}' style='width:2.4rem;'><br>`+cost(n)
            },
            onclick: function(e) {

              if (e.target.type == 'number') return;
              let n = Math.round(this.querySelector('input').value)
              //pc.built[ele] = pc.built[ele] || 0;
              let price = obj[ele].cost
              let canPay = true;
              let payType = ''
              for (let x in price) {
                let amt;
                if (x != 'land') amt = ((pc.built[ele]||0)**1.07)/8 +  obj[ele].cost[x] * n * (((pc.built[ele]||0)**.33) + 1)
                else amt = obj[ele].cost[x] * n
                if (pc[x] < amt) {
                  canPay = false;
                  payType = x
                }
              }
              if (canPay == false) {
                events.errorMsg(`Not enough ${payType}!`)
                return;
              } else {
                for (let x in price) {
                  let amt;
                  if (x != 'land') amt = ((pc.built[ele]||0)**1.07)/8 +  obj[ele].cost[x] * n * (((pc.built[ele]||0)**.33) + 1)
                  else amt = obj[ele].cost[x] * n
                  pc[x] -= amt
                  if (x == 'land') pc.usedLand += price[x] * n
                }
              }
              obj[ele].onbuy(n)
              if (!pc.built[ele]) pc.built[ele] = 0
              pc.built[ele] += n
              this.onchange()
              owned.innerHTML = `Built: ${pc.built[ele] || 0}`
              landUse.innerHTML = landUseHTML()
            }
            }),
            D.make('button', {
              innerHTML: `Demolish <br><input onclick='event.stopPropagation();event.preventDefault();' type='number' value='1' style='width:2.4rem;'>`,
              className: 'sell',
              onclick: function(e) {
                if (e.target.type == 'number') return;
                let n = Math.round(this.querySelector('input').value)
                pc.built[ele] = pc.built[ele] || 0
                if (n > pc.built[ele]) n = pc.built[ele]
                pc.built[ele] -= n
                pc.usedLand -= n * obj[ele].cost.land
                pc.land += n * obj[ele].cost.land
                owned.innerHTML = `Built: ${pc.built[ele]}`
                landUse.innerHTML = landUseHTML()
              }
            })
          )
          let owned = D.make('div', {
            innerText: `Built: ${pc.built[ele] || 0}`
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
