Object.assign(json, {
  mobs: function () {
    let mobs = {
      wolf: {
        health: .9,
        image: 'images/mobs/wolf.png'
      },
      bossWolf: {
        health: 1.9,
        image: 'images/mobs/bossWolf.png'
      },
      ghost: {
        health: 1,
        image: 'images/mobs/ghost.svg'
      }
    }
    let keys = Object.keys(mobs)
    let currmob = mobs[keys[Math.floor(Math.random() * keys.length)]]
    let ele = {
      name: 'mob',
      type: 'unit',
      subtypes: 'resource',
      amount: 10,
      rate: 1,
      active: true,
      position: [3,1],
      mined: 0,
      currentMob: currmob,
      currentImage: currmob.image,
      ref: null,
      images: ['images/tree.svg', 'images/forest.svg'],
      audio: {
        onclick: ['audio/clink2.mp3','audio/clink3.mp3','audio/clink4.mp3']
      },
      render: function() {
        if (ele.active) {
          ele.ref.src = ele.currentImage
          let n = ((1.05 - ((ele.mined)/ele.amount)) **.25) * .75

          ele.ref.style.transform =  `scale(${n})`
        } else {
          ele.ref.style.transform = 'scale(.8)'
          ele.ref.src = 'images/mobs/tombstone.svg'
        }
      },
      empty: function() {
      //  ele.active = false;
    //    setTimeout(function() {
      //    ele.active = true

      //  },Math.min(8000 + ele.rate, 30000))
        ele.currentImage = mobs[keys[Math.floor(Math.random() * keys.length)]].image
        ele.ref.style.filter =`hue-rotate(${Math.random() * 360}deg)`
        ele.render()
        let loot = render.lootbag({gold: Math.round(ele.amount/3 * (Math.random()+.1)), src: 'lootbag.svg'})
        window.i = loot
        D.find('#main').append(loot)
      },
      onclick: function(e, tick) {
        if (!ele.active) return;
        if (!tick) {
          if (pc.clicks < 1) return;
          pc.clicks -= 1;
          ele.mined += ele.rate
        } else {
          ele.mined += e
        }

        let audio

        if (ele.mined >= ele.amount) {
          ele.amount = ele.amount + 10 + (2 * Math.round(ele.amount/10))
          ele.mined = (1-ele.currentMob.health) * ele.amount;
          ele.rate += 1;
          audio = new Audio('audio/clink5.mp3')
          ele.empty()
          ele.render()
        } else {
          audio = new Audio('audio/clink4.mp3')
          audio.volume = .5
          ele.render()
          let orig = ele.ref.style.transform
          ele.ref.style.transform = `skew(${Math.random() * 20 - 10}deg,${Math.random() * 20 - 10}deg) ` + orig
          setTimeout(function() {
            ele.ref.style.transform = orig
          },100)
        }
        //D.find('#logs').innerText = pc.logs
        if (!tick) {
          render.clickCounter()
          render.resourceUp([e.clientX, e.clientY],'-' + ele.rate,'#F02')
          audio.onended = function() {
            delete audio
          }
          audio.play()
        } else {
          delete audio
        }
      }
    }
    return ele
  },

})
