let scripts = [
  'events/startSystem.js',
  'events/errorMsg.js',
  'events/tick.js',
  'json/A0+.js',
  'json/mobs.js',
  'json/build.js',
  'json/research.js',
  'json/empire.js',
  'json/train.js',
  'json/quests.js',
  'render/resourceUp.js',
  'render/base.js',
  'render/settings.js',
  'render/lootbag.js'
]
initScriptsLoaded = 0;
let scriptsHolder = document.createDocumentFragment()
scripts.forEach(ele => {
  let script = Object.assign(document.createElement('script'), {
    src : ele,
    onload: function() {
      if (++initScriptsLoaded == scripts.length) {
        events.startSystem()
      }
    }
  })
  scriptsHolder.append(script)
})
document.head.append(scriptsHolder)
