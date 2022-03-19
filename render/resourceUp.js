Object.assign(render, {
  resourceUp: function(loc, amount, color) {
			let info = D.make('span', {
				innerHTML: `<b>${amount}</b>`,
				style: `color: ${color}; position:absolute; left:${loc[0]*.96}px; top:${loc[1]}px; z-index:10;transition: all 2.5s ease-out; font-size:1.25rem; text-shadow:1px 1px .1rem black;pointer-events: none;`
			})
			D.find('#main').append(info)
			D.find('#main').offsetWidth
			info.style.opacity='.2'
			info.style.transform = `translate(${(Math.random() - 0.5) * 4}vh,${Math.random() *10}vh)`
			setTimeout(function(){
				info.remove()
			},2700)
  }
})
