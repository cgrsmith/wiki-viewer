document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("searchFormSubmit").addEventListener("click", function(defaultEvent) {
        defaultEvent.preventDefault();
        submitSearch(document.getElementById("searchForm").value);
    });

});

function submitSearch(searchVal) {
    let apiUrl = "//en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + searchVal 
    + "&format=json&dataType=jsonp&origin=*";
    callAjax(apiUrl, displayResults);
}

function displayResults(resultObject) {
    console.log(1);
    console.log(resultObject.query.search[0].snippet);
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

