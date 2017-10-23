document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("searchFormSubmit").addEventListener("click", function(defaultEvent) {
        defaultEvent.preventDefault();
        submitSearch(document.getElementById("searchInput").value);
    });
});

function submitSearch(searchVal) {
    document.getElementById("searchSection").className = "alignTop";
    let apiUrl = "//en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + searchVal 
    + "&format=json&dataType=jsonp&origin=*";
    callAjax(apiUrl, displayResults);
}



function displayResults(resultObject) {
    //console.log(resultObject.query.search[0].pageid);
    removeResultDivs();
    let newDiv;
    let resultIndex;
    for (let resultIndex in resultObject.query.search) {
        newDiv = buildResultDiv(resultObject.query.search[resultIndex].title, resultObject.query.search[resultIndex].snippet, resultObject.query.search[resultIndex].pageid);
        document.getElementById("resultArea").appendChild(newDiv);
  }
}

function buildResultDiv(title, snippet, pageid) {
  //Article box
  let resultDiv = document.createElement("a");
  resultDiv.className = "resultDiv";
  resultDiv.setAttribute("href","https://en.wikipedia.org/?curid=" + pageid);
  resultDiv.setAttribute("target","_blank");
  //Article Title
  let resultElement = document.createElement("h2");
  resultElement.innerHTML = title;
  resultElement.className = "resultTitle";
  resultDiv.appendChild(resultElement);
  //Article snippet
  resultElement = document.createElement("p");
  resultElement.className = "resultSnippet";
  resultElement.innerHTML = snippet +"...";
  resultDiv.appendChild(resultElement);  
  return resultDiv;
}

function removeResultDivs() {
  let resultArea = document.getElementById("resultArea");
  while (resultArea.hasChildNodes()) {
    resultArea.removeChild(resultArea.lastChild);
  }
}

function removeResultDivs() {
  let resultArea = document.getElementById("resultArea");
  while (resultArea.hasChildNodes()) {
    resultArea.removeChild(resultArea.lastChild);
  }
}


function callAjax(url, callback){
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(JSON.parse(xmlhttp.responseText));
        } else {
          console.log("failed to retrieve");
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

