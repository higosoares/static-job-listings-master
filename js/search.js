var categoriesSearched = [] 

function searchByCategories() {
  let jobs = JSON.parse(localStorage.getItem('jobs'))
  
  document.querySelectorAll('.tags').forEach(tag => {
    tag.addEventListener('click', event => {
      document.getElementById('search').style.display = 'flex'

      let category = getObjectCategory(event.target)
      categoriesSearched.push(category)

      clearData()
      populateData(getJobsFiltered(jobs))
      populateCategorySearch(category)
    })
  })
}
  
function getObjectCategory(element) {
  let obj = {}
  obj.value = element.innerHTML
  obj.type = element.getAttributeNames()[1].split('data-')[1]

  return obj
}
  
function populateCategorySearch(element) {
  let categories = document.getElementById('search').querySelector('.categories'), 
  category = categories.querySelector('.category'), cloneDivCategory = category.cloneNode(true)

  cloneDivCategory.querySelector('.title').innerHTML = element.value
  cloneDivCategory.querySelector('.close').dataset[element.type] = element.value
  cloneDivCategory.className = 'category category-searched'
  
  cloneDivCategory.style.display = ''

  categories.append(cloneDivCategory)
}
  
function removeCategorySearch() {
  let jobs = JSON.parse(localStorage.getItem('jobs'))
  let closes = document.querySelectorAll('.close')

  closes.forEach(category => {
    category.addEventListener('click', event => {
      event.target.parentElement.remove()
      clearData()
      populateData(jobs)
      removeFromArrayCategoriesSearch(event.target)
    })
    
  })
}
  
function removeFromArrayCategoriesSearch(element){
  let category = getObjectCategory(element)

  categoriesSearched.pop(category)
}
  
function clearSearch() {
  let jobs = JSON.parse(localStorage.getItem('jobs'))

  document.getElementById('clear').addEventListener('click', event => {
    clearData()
    populateData(jobs)
    removeCategoriesSearch()
    categoriesSearched = []
    document.getElementById('search').style.display = ''
  })
}
  
function removeCategoriesSearch() {
  let categories = document.getElementById('search').querySelector('.categories')

  categories.querySelectorAll('.category-searched').forEach(category => {
    category.remove()
  })
}
  
function getJobsFiltered(jobs) {
  return jobs.filter((job) => {
    return categoriesSearched.length === searchInArrayCategories(job)
  })
}
  
function searchInArrayCategories(job) {
  let count = 0
    
  categoriesSearched.map((category) => {
    if (Array.isArray(job[category.type]) && job[category.type].includes(category.value)
    || job[category.type] === category.value) {
      count++
    }
  })

  return count
}
  
function clearData() {
  document.querySelectorAll('.job-list').forEach(job => {
    job.remove()
  })
}