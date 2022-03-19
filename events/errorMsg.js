events.errorMsg = function(str) {
  'use strict'
  let msg = D.make('h2', {
    innerText: str,
    style: 'background-color:white;text-align:center;font-weight:600; transition: 3.5s ease-in-out; position: fixed; top: 43%; z-index: 10000; text-shadow: .1rem .1rem .1rem #ff0000; width:100%; pointer-events:none;'
  })
  D.find('#view').appendChild(msg)
  //U.reflow();
  setTimeout(function() {
    msg.style.opacity='0'
  },100)
  setTimeout(function() {
    msg.remove()
  }, 2800)
}
