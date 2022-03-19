C.events.successMsg = function(str) {
  'use strict'
  let msg = U.make('h2', {
    innerText: str,
    style: 'background-color:white;text-align:center;font-weight:600; transition: 3.7s ease-in-out; position: fixed; top: 43%; z-index: 10000; text-shadow: .1rem .1rem .1rem #0F1; left:0;right:0;margin: 0 auto;'
  })
  D.find('#view').appendChild(msg)
  U.reflow();
  msg.style.opacity='0'
  setTimeout(function() {
    msg.remove()
  }, 2800)
}
