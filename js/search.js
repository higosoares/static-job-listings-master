var categoriesSearched = [] 

document.addEventListener('click', event => {
  let jobs = JSON.parse(localStorage.getItem('jobs'))

  if (event.target) {
    switch (event.target.className) {
      case 'tag':
        searchByCategory(event, jobs)
        break;
      case 'close':
        removeCategorySearch(event, jobs)
        break;
      case 'clear':
        clearSearch(jobs)
        break;
    }
  }
})


function searchByCategory(event, jobs) {
  document.getElementById('search').style.display = 'flex'

  let category = getObjectCategory(event.target)
  categoriesSearched.push(category)

  clearData()
  populateData(getJobsFiltered(jobs))
  populateCategorySearch(category)
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
  
function removeCategorySearch(event, jobs) {
  event.target.parentElement.remove()
  clearData()
  removeFromArrayCategoriesSearch(event.target)
  populateData(getJobsFiltered(jobs))

  if (categoriesSearched.length === 0) {
    document.getElementById('search').style.display = 'none'
  }
}
  
function removeFromArrayCategoriesSearch(element){
  let category = getObjectCategory(element)

  categoriesSearched.pop(category)
}
  
function clearSearch(jobs) {
  clearData()
  populateData(jobs)
  removeCategoriesSearch()
  categoriesSearched = []
  document.getElementById('search').style.display = 'none'
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