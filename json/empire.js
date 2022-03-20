Object.assign(json, {
  empire: function() {

    let obj = {

      "Mole": {
        level: 0,
        tip: "If only this mole wasn't here, you could build something",
        info: ``,
        onclick: function() {
          console.log('fighting')
        },
      }
    }
    let opts = {
      "init": function() {
        console.log('bip')
        let frag = D.createDocumentFragment()
        let div = D.make('div', {
          className: "menuDisplay_item",
          innerHTML: `Land isn't free. There are monsters out there.`
        })
        frag.appendChild(div)
        let keys = Object.keys(obj)
        keys.forEach(ele => {
          let cost =``
          for (let x in obj[ele].cost) {
            cost += " " + obj[ele].cost[x]
            switch(x) {
              case "logs":
                cost += "<img src='images/icons/logs.svg' class='icon_small' title='logs'>"
                break;
              case "gold":
                cost += "<img src='images/icons/gold.svg' class='icon_small' title='gold'>"
                break;
              case "land":
                cost += "<img src='images/icons/land.svg' class='icon_small' title='land'>"
                break;
              default: cost += x
            }
          }
          let buttons = D.createDocumentFragment()
          buttons.append(
            D.make('button', {
            innerHTML: "Buy<br>"+cost,
            className: 'buy',
            onclick: function() {
              obj[ele].onclick()
              if (!pc.built[ele]) pc.built[ele] = 0
              pc.built[ele] += 1
              owned.innerHTML = `Built: ${pc.built[ele] || 0}`
            }
            }),
            D.make('button', {
              innerText: "Sell",
              className: 'sell',
              onclick: function() {

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
        D.find('#menuDisplay').innerHTML = ""
        D.find('#menuDisplay').append(frag)
      },
    }
    return opts
  }
})
