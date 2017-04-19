$(handleClick)

//define buttonHandler
function handleClick() {
  let $button = $("#click-me")
  $button.click(function(){
    $button.hide()
    getLocation()
  })
}

//search the users locations
function getLocation(){
  const URL = "https://www.googleapis.com/geolocation/v1/geolocate?key="
  $.ajax({
    type: "POST",
    url: `${URL}${apiKeys.google_geolocation_api_key}`,
    success: getCoordsAndEvents
  });
}

//uses the coordinates to interpolate into the eventful
function getCoordsAndEvents(data){
  let lat = data.location.lat
  let lng = data.location.lng

  const URL = "https://api.eventful.com/json/events/search?...&where="
  const CRITERIA = "&within=5&date=Future\&app_key="

  $.ajax({
    url: `${URL}${lat},${lng}${CRITERIA}${apiKeys.eventful_api_key}`,
    success: renderEvents
  })
}

//find events and render
function renderEvents(data){
  
  let eventList = $(".events-list")
  eventList.html('')

  function renderEvent ( event ) {
    let title = event.title
    let venue = event.venue_name
    let date_time = new Date(event.start_time)
    let calendar_day = date_time.toDateString()
    let event_time = date_time.toTimeString().split(' ')[0]
    let city_name = event.city_name
    let country = event.country_name
    let url = event.url
    eventList.append(`<li class='collection-item'>Title: ${title}<ul class=inner>Venue: ${venue}</ul><ul class=inner>Time: ${calendar_day} ${event_time}</ul><ul class=inner>City: ${city_name}</ul><ul class=inner >Country: ${country}</ul><ul><a href=${url} target="_blank">Link to Event</a></ul></li>`)
  }
  JSON.parse(data).events.event.forEach(renderEvent)
}
