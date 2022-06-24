const notfication1=document.querySelector('.notfication')
const weatherIcon =document.querySelector('.weather-icon')
const tempValue=document.querySelector('.temperature-value')
const tempDescription=document.querySelector('.description')
const location1=document.querySelector('.location')
const container=document.querySelector('.container')
const weather={
    temperature : {
        value:57.5
        ,
        unit:"celsiuse"
    },
    description:"cloudy",
    icon:"01d",
    city:"tehran",
    country:"ir"

}
function displayWeather(){
   // weatherIcon.innerHTML=`<img src="image/${weather.icon}.png"/> `
    tempValue.innerHTML=` ${weather.temperature.value} <span>c</span> `
    tempDescription.innerHTML=weather.description
    location1.innerHTML= `${weather.city} - ${weather.country}`
}
displayWeather()
tempValue.addEventListener('click',()=>{
    if(weather.temperature.unit==="celsiuse"){
        let farenhit= (weather.temperature.value) * 1.8 +32
        tempValue.innerHTML= `${farenhit.toFixed(1)} F`
        weather.temperature.unit="Farenhite"
    }else{
        tempValue.innerHTML= `${weather.temperature.value} c `
        weather.temperature.unit="celsiuse"
    }
})

  function success(pos) {
    var crd = pos.coords;
  
    
     let latitude = crd.latitude
     let longitude = crd.longitude
     getweather(latitude,longitude)

  }
  
  navigator.geolocation.getCurrentPosition(success);
  function getweather(latitude,longitude)
  {
      let key = "f6cf5d9ee2ebd7a4f2f909b38820569c"
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
      fetch(url).then(function(response){
          let data= response.json()
          console.log(data)
          return data;
      }).then(function(data){
          
          weather.temperature.value= ((data.main.temp)-273).toFixed(0)
          weather.temperature.unit ="celsiuse"
          weather.description= (data.weather[0].description)
          weather.country = data.sys.country
          weather.city = data.name
          displayWeather()
      })
  }
  function rotate(shape,deg,time){
      return new Promise(function(resolve,reject){  let frame=time/100
          let step=deg/frame
          let angle=0
          let i=0
          const interval = setInterval(()=>{
              angle +=step
              shape.style.transform= ` rotate(${angle}deg) `
              i++
              if(i>frame){
                  clearInterval(interval)
                  shape.style.transform=`rotate(0deg)`
                  resolve()
              }
       
          },100)})
        
        }
  
function move(shape,x,y,time){
    return new Promise(function(resolve,reject){

        let left= parseInt( getComputedStyle(shape).getPropertyValue('left')) 
        let top= parseInt( getComputedStyle(shape).getPropertyValue('top')) 
        let frame= time/100
        let stepX= x/frame
        let stepY= y/frame
        let i=0
        const interval2=setInterval(()=>{
            left += stepX
            top += stepY
            shape.style.left=left + "px"
            shape.style.top=`${top}px`
            i++
            if(i>frame){
                clearInterval(interval2)
                resolve()
            }
        },100)
    })


}
async function  vo(){
    await rotate(container,360,4000)
    await move(container,500,500,4000)

}
vo()