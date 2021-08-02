const tvShowId = localStorage.getItem("id");
const mainTitle = document.querySelector("h2");

const tvImg = document.createElement("img");

let season = document.querySelector(".season-title");
let seasonDate = document.querySelector(".season-date");
let castCont = document.getElementsByClassName("cast");
let castUl = document.querySelector(".cast-list")
let showInfo = document.querySelector(".showInfo");


const request = new XMLHttpRequest();
request.open("GET", `https://api.tvmaze.com/shows/${tvShowId}/seasons`)

request.onload = function() {
    const response = JSON.parse(request.responseText);
    console.log(response)
    const numberOfSeasons = response.length;
    season.textContent = `Seasons (${numberOfSeasons})`

    response.forEach(function (el) {
        let seasonList = document.createElement("li");
        let firstDate = el.premiereDate;
        let lastDate = el.endDate;

        seasonList.textContent = `${firstDate}  -   ${lastDate}`;
        seasonDate.append(seasonList)
    })
}
request.send();


const request2 = new XMLHttpRequest();
request2.open("GET", `https://api.tvmaze.com/shows/${tvShowId}/cast`);
request2.onload = function () {
    const response2 = JSON.parse(request2.responseText);

    response2.forEach(function(el) {
        let castList = document.createElement("li");
        let castName = el.person.name;
        castList.textContent = castName;
        castUl.append(castList);
    })

}

request2.send();

const request3 = new XMLHttpRequest();
request3.open("GET", `https://api.tvmaze.com/shows/${tvShowId}`, true);
request3.onload = function(){
    const response3 = JSON.parse(request3.responseText);
    mainTitle.innerText = response3.name;
    tvImg.setAttribute("src", response3.image.original);
    document.querySelector(".imageDiv").append(tvImg)
    showInfo.innerHTML = response3.summary;
}
request3.send();