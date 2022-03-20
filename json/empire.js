Object.assign(json, {
  empire: function() {

    let arr = [{
        name: 'Mole',
        tip: "If only this mole wasn't here, you could build something",
        info: ``,
        onclick: function() {
          console.log('fighting')
        },
      }
    ]
    let opts = {
      "init": function() {
        console.log('bip')
        let frag = D.createDocumentFragment()
        let div = D.make('div', {
          className: "menuDisplay_item",
          innerHTML: `Land isn't free. There are monsters out there.`
        })
        frag.appendChild(div)
        arr.forEach((ele,i) => {
          let cost =``
          for (let x in ele.cost) {
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
            innerHTML: "Fight!",
            className: 'Buy',
            onclick: function() {
              ele.onclick()
              console.log(i)
            }
            }),
          )
          let div = D.make('div', {
            className: 'menuDisplay_item',
            innerHTML: `<b style='display:block;text-align:center;'>${ele.name}</b> ${ele.tip}<br>`
          })
          div.append(buttons)
          frag.append(div)
        })
        D.find('#menuDisplay').innerHTML = ""
        D.find('#menuDisplay').append(frag)
      },
    }
    return opts
  }
})
