Object.assign(json, {
  A0: {
    type: 'narrative'
  },
  "shiny": {
    name: 'Shiny1',
    type: 'unit',
    subtypes: 'resource',
    amount: 10,
    rate: 1,
    position: [2,2],
    mined: 0,
    currentImage: null,
    ref: null,
    images: ['images/crystal1.svg','images/shiniesIcon.svg', 'images/shiny3.svg','images/shiny2.svg','images/shiny1.svg','images/shiny4.svg'],
    audio: {
      onclick: ['audio/clink2.mp3','audio/clink3.mp3','audio/clink4.mp3']
    },
    render: function() {
      let ele = json.shiny
      ele.ref.src = ele.currentImage
      let n = ((1.1 - ((ele.mined+1)/ele.amount)) **.25) *.8
      ele.ref.style.transform =  `scale(${n})`

    },
    empty: function() {
      let ele = json.shiny
      ele.currentImage = ele.images[Math.floor(Math.random() * ele.images.length)]
      ele.ref.style.filter =`hue-rotate(${Math.random() * 360}deg)`
    },
    onclick: function(e, tick) {
      let ele = json.shiny
      if (!tick) {
        if (pc.clicks < 1) return;
        pc.shinies += ele.rate;
        ele.mined += ele.rate
        pc.clicks -= 1;
      } else {
        pc.shinies += e
        ele.mined += e
      }

      let audio

      if (ele.mined >= ele.amount) {
        ele.amount = ele.amount + 10 + (2 * Math.round(ele.amount/10))
        ele.mined = 0;
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
      //  ele.ref.style.transform =  `scale(${1.5 - ((ele.mined+1)/ele.amount)})`
      }
      if (!tick) {
        window.render.shinies()
        window.render.clickCounter()
        render.resourceUp([e.clientX, e.clientY],"+" + ele.rate,'white')
        audio.onended = function() {
          delete audio
        }
        audio.play()
      } else delete audio
    }
  },

  "wanderShiny": {
    name: 'Shiny1',
    type: 'unit',
    subtypes: 'resource',
    amount: 10,
    rate: 1,
    //position: [0,2],
    mined: 0,
    currentImage: null,
    active: true,
    ref: null,
    images: ['images/crystal1.svg','images/shiniesIcon.svg', 'images/shiny3.svg','images/shiny2.svg','images/shiny1.svg','images/shiny4.svg'],
    audio: {
      onclick: ['audio/clink2.mp3','audio/clink3.mp3','audio/clink4.mp3']
    },
    render: function() {
      let ele = json.wanderShiny
      if (ele.active) {
        ele.ref.src = ele.currentImage
        let n = (1.1 - ((ele.mined+1)/ele.amount)) **.25

        ele.ref.style.transform =  `scale(${n})`
      } else {
        ele.ref.style.transform = 'scale(0)'
      }

    },
    empty: function() {
      let ele = json.wanderShiny
      ele.active = false;
      setTimeout(function() {
        ele.active = true
        ele.render()
      },12000 + ele.rate)
      ele.currentImage = ele.images[Math.floor(Math.random() * ele.images.length)]
      ele.ref.style.filter =`hue-rotate(${Math.random() * 360}deg)`
    },
    onclick: function(e, tick) {

      let ele = json.wanderShiny
      if (!ele.active) return;
      if (!tick) {
        if (pc.clicks < 1) return
        pc.clicks -= 1;
        pc.shinies += ele.rate;
        ele.mined += ele.rate
      } else {
        pc.shinies += e
        ele.mined += e
      }
      let audio

      if (ele.mined >= ele.amount) {
        ele.amount = ele.amount + 10 + (ele.amount/5) ** 1.03
        ele.mined = 0;
        ele.rate += 2;
        audio = new Audio('audio/clink5.mp3')
        ele.empty()
        ele.render()
      } else {
        audio = new Audio('audio/clink4.mp3')
        audio.volume = .5
        ele.render()
      //  ele.ref.style.transform =  `scale(${1.5 - ((ele.mined+1)/ele.amount)})`
      }
      if (!tick) {
        window.render.shinies()
        window.render.clickCounter()
        render.resourceUp([e.clientX, e.clientY],"+" + ele.rate,'white')
        audio.onended = function() {
          delete audio
        }
        audio.play()
      } else delete audio
    }
  },
  "trees2": function () {
    let ele = {
      name: 'tree',
      type: 'unit',
      subtypes: 'resource',
      amount: 10,
      rate: 1,
      active: true,
      position: [3,1],
      mined: 0,
      currentImage: null,
      ref: null,
      images: ['images/tree.svg', 'images/forest.svg'],
      audio: {
      },
      render: function() {
        if (ele.active) {
          ele.ref.src = ele.currentImage
          let n = (1.1 - ((ele.mined+1)/ele.amount)) **.25

          ele.ref.style.transform =  `scale(${n})`
        } else {
          ele.ref.style.transform = 'scale(.8)'
          ele.ref.src = 'images/stump.svg'
        }
      },
      empty: function() {
        //ele.active = false;
      //  setTimeout(function() {
        //  ele.active = true

        //},Math.min(8000 + ele.rate, 30000))
        ele.currentImage = ele.images[Math.floor(Math.random() * ele.images.length)]
        ele.ref.style.filter =`hue-rotate(${Math.random() * 360}deg)`
        ele.render()
      },
      onclick: function(e, tick) {
        if (!ele.active) return;
        if (!tick) {
          if (pc.clicks  < 1) return;
          pc.clicks -= 1;
          pc.logs += ele.rate;
          ele.mined += ele.rate
        } else {
          pc.logs += e;
          ele.mined += e
        }

        let audio

        if (ele.mined >= ele.amount) {
          ele.amount = ele.amount + 10 + (2 * Math.round(ele.amount/10))
          ele.mined = 0;
          ele.rate += 1;
          audio = new Audio('audio/woodchop3.mp3')
          audio.volume = .9
          ele.empty()
          //ele.render()
        } else {
          audio = new Audio('audio/woodchop2.mp3')
          audio.volume = .33
          ele.render()
          let orig = ele.ref.style.transform
          ele.ref.style.transform = `skew(${Math.random() * 20 - 10}deg,${Math.random() * 20 - 10}deg) ` + orig
          setTimeout(function() {
            ele.ref.style.transform = orig
          },100)
        }

        if (!tick) {
          window.render.clickCounter()
          window.render.logs()
          render.resourceUp([e.clientX, e.clientY],'+' + ele.rate,'#1F2')
          audio.onended = function() {
            delete audio
          }
          audio.play()
        } else delete audio
      }
    }
    return ele
  },
})
