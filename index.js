
var mymap = L.map('mapid').setView([-19.4679, -44.2477], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'Yours Leaflet token';
}).addTo(mymap);

var marker = L.marker([-19.4679, -44.2477]).addTo(mymap);

// Creating variables to hold the text display
const outPutIpadress = document.querySelector("#ipadress");
const outPutLocation = document.querySelector('#location');
const outPutTimezone = document.querySelector('#timezone');
const outPutIsp = document.querySelector('#isp');
var ip = "";
const apiKey = "Yours geo.ipify API key";

// Creating function to fetch the API data
async function getData() {
  const api_url = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ip}`
  const response = await fetch(api_url)
  const outPut = await response.json();
  
  return outPut;
}

// Creating function to display the data into the html
function displayOutPutData(outPut) {
  outPutIpadress.textContent = outPut.ip;
  outPutLocation.textContent = `${outPut.location.city}, ${outPut.location.region} ${outPut.location.postalCode}`;
  outPutTimezone.textContent = `UTC ${outPut.location.timezone}`;
  outPutIsp.textContent = outPut.isp;
  mymap.setView([outPut.location.lat, outPut.location.lng], 13);

  marker.setLatLng([outPut.location.lat, outPut.location.lng]).addTo(mymap);
}

// creating function when an incorrect Ipadress is inserted

function clearOutPutData () {
  outPutIpadress.textContent = "";
  outPutLocation.textContent = "";
  outPutTimezone.textContent = "";
  outPutIsp.textContent = "";
  
  marker.remove(mymap);
}

getData()
    .then(outPut => displayOutPutData(outPut));

// creating fuction for when ipadress is inserted

function myFunction () {
  ip = document.querySelector(".form-control").value;
  document.querySelector("#ipadress").classList.remove("error");
  getData().then(outPut => {
    if (outPut.ip == undefined){
      clearOutPutData();
      document.querySelector("#ipadress").textContent = "IP Adress is not valid";
      document.querySelector("#ipadress").classList.add("error");
      document.querySelector(".form-control").value = "";
    } else {
      displayOutPutData(outPut)
      document.querySelector(".form-control").value = "";
    }
  })

}

document.addEventListener("keydown", function (event){
  if (event.keyCode === 13){
    myFunction();
  }
})