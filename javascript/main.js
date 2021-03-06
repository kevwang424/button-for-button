$(handleClick)

//define buttonHandler
function handleClick() {
  let $button = $("#click-me")

  $button.click(function(){
    getLocation()
  })
}


//search the users locations
function getLocation(){
  const URL = "https://www.googleapis.com/geolocation/v1/geolocate?key="
  const GOOGLEAPI = "AIzaSyCMfAJKtXj1L5fMf-qjJKR-114_Zo4Lk0A"

  $.ajax({
    type: "POST",
    url: `${URL}${GOOGLEAPI}`,
    success: getCoordsAndEvents
  });
}

//uses the coordinates to interpolate into the eventful
function getCoordsAndEvents(data){
  let lat = data.location.lat
  let lng = data.location.lng

  const URL = "https://api.eventful.com/json/events/search?...&where="
  const CRITERIA = "&within=10&date=Future\&app_key="
  const EVENTFULAPI = "cmMZxgb87BQPf3cQ"

  $.ajax({
    url: `${URL}${lat},${lng}${CRITERIA}${EVENTFULAPI}`,
    dataType: "jsonp",
    success: parseEvents
  })
}

//find events and render
function parseEvents(data){
  $(".accordion").remove()

  $(".events-list").append(`<div class="accordion" role="tablist" data-accordion  data-multi-expand="true" data-allow-all-closed="true">`)
  let eventList = $(".accordion")
  let $button = $("#click-me")

  function renderEvent ( event ) {

    let id = event.id
    let title = event.title
    let venue = event.venue_name
    let date_time = new Date(event.start_time)
    let calendar_day = date_time.toDateString()
    let event_time = date_time.toTimeString().split(' ')[0]
    let city_name = event.city_name
    let url = event.url

    eventList.append(`
      <div class="accordion-item" data-accordion-item>
        <a href="#${id}" role="tab" id="${id}-heading" aria-controls="${id}" class="accordion-title">${title}</a>
        <div id="${id}" role="tabpanel" aria-labelledby="${id}-heading" class="accordion-content" data-tab-content>
          <h5>Venue:</h5> ${venue}
          <h5>When:</h5> ${calendar_day} ${event_time}
          <h5>Where:</h5> ${city_name}<br/>
          <a href=${url}>See More Details</a>
        </div>
      </div>`)
    }

    data.events.event.forEach(renderEvent)

  //check to for new elements to initialize foundation plug-ins
  $(document).foundation()
  $button.text("Gimme More")
  $button.css({"margin-top": "20px"})


}
