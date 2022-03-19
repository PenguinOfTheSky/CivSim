Object.assign(render, {
  topNav: function() {
    let land = D.make('div', {
      className: 'resource',
      title: 'land'
    }
    land.append(
      D.make('span', {
        innerText: pc.usedLand + '/' + (pc.usedLand + pc.land)
      })
    )
    return (
      land
    )
  }
})
