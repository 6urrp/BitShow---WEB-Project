const endpoint = "http://api.tvmaze.com/shows";
let main = document.querySelector(".main-div");
let top50 ={};
let titles = [];

const xhr = new XMLHttpRequest();
xhr.open("GET", endpoint, true);
xhr.onload = function () {
    const request = JSON.parse(xhr.responseText);
    let rating = request.sort(function(a, b) {
        return b.rating.average - a.rating.average;
    })
    request.forEach(function (el) {
        titles.push({
            name: el.name,
            id: el.id
        });
    })
    top50 = rating.slice(0, 50);
    top50.forEach(function(el){
        let mainDiv = document.createElement("div");
        mainDiv.setAttribute("data-key", el.id);
        mainDiv.classList = "tv-div";

        let img = document.createElement("img");
        img.setAttribute("src", el.image.medium);

        let title = document.createElement("h4");
        title.textContent = el.name;

        main.append(mainDiv);
        mainDiv.append(img);
        mainDiv.append(title);
    })

    localStorage.clear();

    var div = document.querySelectorAll(".tv-div");
    div.forEach(function(el) {
        el.addEventListener("click", function(event) {
            event.preventDefault();
            let key = this.getAttribute("data-key");
            window.localStorage.setItem("id", key);
            
            document.location = "tv-show.html";
        })
    })

}
xhr.send()
