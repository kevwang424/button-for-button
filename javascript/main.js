$(handleClick)

//define buttonHandler
function handleClick() {
  var $button = $("#click-me")
  $button.click(function(position){
    $button.hide()
    findAndRenderEvents(position)
  })
}

//search events by location of the user
function findAndRenderEvents(position){
  const URL = "http://api.eventful.com/rest/events/search?...&where=32.746682,-117.162741"
  const auth = "&within=25&date=Future\&app_key="
  debugger
  findLocation()
}

//search users locations
function findLocation(){
  const URL = "https://www.googleapis.com/geolocation/v1/geolocate?key="
  
}

// http://api.eventful.com/rest/events/search?...&where=32.746682,-117.162741&within=25&date=Future\&app_key=cmMZxgb87BQPf3cQ
