$(handleClick)

//define buttonHandler
function handleClick() {
  var $button = $("#click-me")
  $button.click(function(){
    $button.hide()
    getLocation()
    findAndRenderEvents(coordinates)
  })
}

//search events by location of the user
function findAndRenderEvents(coordinates){
  debugger
  const URL = "http://api.eventful.com/rest/events/search?...&where=32.746682,-117.162741"
  const auth = "&within=25&date=Future\&app_key="
}

//search the users locations
function getLocation(){
  const URL = "https://www.googleapis.com/geolocation/v1/geolocate?key="
  $.ajax({
    type: "POST",
    url: `${URL}${apiKeys.google_geolocation_api_key}`,
    success: getCoords
  });
}

function getCoordsAndEvents(data){
  debugger
}

// http://api.eventful.com/rest/events/search?...&where=32.746682,-117.162741&within=25&date=Future\&app_key=cmMZxgb87BQPf3cQ
