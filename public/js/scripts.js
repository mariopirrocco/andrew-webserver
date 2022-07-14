
const weatherForm = document.querySelector('form')
const inputLocation = document.querySelector('input')
const locationReport = document.querySelector('#locationReport')
const forecast = document.querySelector('#forecast')

console.log(weatherForm)

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = inputLocation.value
  locationReport.textContent = 'Cargando info'
  forecast.textContent = ''

  fetch(`/weather?address=${location}`).then((response) => {
    
    response.json().then((data) => {
      
      if(data.error) {
        console.log(data.error)
        locationReport.textContent = data.error
      } else {
        locationReport.textContent = data.location
        forecast.textContent = data.forecast
        console.log(data.forecast)
      }
    })
  })
})
