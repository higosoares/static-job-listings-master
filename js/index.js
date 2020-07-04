function loadData(callback) {   
  let xobj = new XMLHttpRequest()
  xobj.open('GET', './data.json', true)
  xobj.send()  
  xobj.onload=function(){
    callback(JSON.parse(xobj.responseText))
  }
}

loadData(function(json) {
  populateData(json)
})

function populateData(json) {
  let divJob = document.getElementById('job'), divTag = divJob.querySelector('.tags .tag'),
  jobs = document.getElementsByClassName('jobs'), divBagde = divJob.querySelector('.info .badges')

  json.map((data) => {
    let cloneDivJob = divJob.cloneNode(true), cloneDivTag = divTag.cloneNode(true), 
    role = cloneDivTag.cloneNode(true), level = cloneDivTag.cloneNode(true), 
    cloneDivBagdes = divBagde.cloneNode(true)

    populateJob(data, cloneDivJob)
    populateBadges(data, cloneDivBagdes, cloneDivJob)
    populateRoleAndLevel(data, role, level, cloneDivJob)
    populateLanguages(data.languages, cloneDivJob, cloneDivTag)

    cloneDivJob.style.display = ''
    jobs[0].append(cloneDivJob)
  })

  divJob.style.display = 'none'

  if (localStorage.getItem('jobs') === null) {
    localStorage.setItem('jobs', JSON.stringify(json))
  }

  searchByCategories()
  clearSearch()
  removeCategorySearch()
}

function populateJob(data, divJob) {
  divJob.className = 'job job-list'

  if (data.featured) {
    divJob.className = 'job job-list job-border'
  }

  divJob.id = `job-${data.id}`
  divJob.querySelector('.logo img').src = data.logo
  divJob.querySelector('.info .position').innerHTML = data.position
  divJob.querySelector('.info .period').innerHTML = `${data.postedAt} · ${data.contract} · ${data.location}`
}

function populateBadges(data, divBagde, divJob) {
  let span = divBagde.querySelector('span')
 
  divJob.querySelector('.info .badges .company').innerHTML = data.company

  if (data.new) {
    let spanNew = span.cloneNode(true)
    spanNew.className = 'badge'
    spanNew.innerHTML = 'New!'
    divJob.querySelector('.info .badges').append(spanNew)
  }
  if (data.featured) {
    let spanFatured = span.cloneNode(true)
    spanFatured.className = 'badge featured'
    spanFatured.innerHTML = 'Featured'
    divJob.querySelector('.info .badges').append(spanFatured)
  }
}

function populateRoleAndLevel(data, role, level, divJob) {
  role.innerHTML = data.role
  role.dataset.role = data.role
  level.innerHTML = data.level
  level.dataset.level = data.level

  divJob.querySelector('.tags').append(role)
  divJob.querySelector('.tags').append(level)
}

function populateLanguages(languages, divJob, divTag) {
  let divTags = divJob.querySelector('.tags')

  languages.map(function (language) {
    let newLanguage = divTag.cloneNode(true)
    newLanguage.innerHTML = language
    newLanguage.dataset.languages = language

    divTags.append(newLanguage)
  })
  divTags.children[0].remove()
}