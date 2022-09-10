// Cache the DOM
var countDown = document.getElementById("countDown");
var pauseBtn = document.getElementById("dataBtn");
// Add event listener to pause btn
pauseBtn.addEventListener("click", pauseLoadData);
// Timeout counter
var cntTimeout;
// Count data
var cntData = 0;
// Cnt click
var clickCnt = 0;

window.onload = resetTimer();

// Reset timer
function resetTimer() {
    //Set timeout counter
    cntTimeout = 5;
    // Display time
    countDown.innerHTML = "New data in: " + cntTimeout + " seconds.";
    // Set time interval
    myTimer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    // Decrement timeout counter
    cntTimeout--;
    // Update text
    countDown.innerHTML = "New data in: " + cntTimeout + " seconds.";
    // If timer is zero
    if (cntTimeout == -1) {
        // Clear time interval
        clearInterval(myTimer);
        // Load data
        cntData++;
        loadData(cntData);
        // Reset timer
        resetTimer();
    }
}

function loadData(cnt) {
    // Cache the table
    var dataTable = document.getElementById("dataTable");
    // Get request
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "https://jsonplaceholder.typicode.com/todos/" + cnt);
    httpRequest.send();
    httpRequest.onload = function() {
        var httpResponse = JSON.parse(httpRequest.responseText);
        // Yes? No?
        var yes_no = httpResponse.completed;
        if (yes_no == true) {
            yes_no = "Yes";
        } else {
            yes_no = "No";
        }
        // Create html string
        var htmlString = "<tr><td>" + httpResponse.id + "</td>" +
            "<td>" + httpResponse.title + "</td>" +
            "<td>" + yes_no + "</td></tr>";
        // Add string to table
        dataTable.tBodies[0].innerHTML += htmlString;
    }
}

function pauseLoadData() {
    // Increment click cnt
    clickCnt++;
    // Change btn text and functionality
    if (clickCnt % 2 != 0) {
        // Stop loading data
        clearInterval(myTimer);
        // Change text
        pauseBtn.innerHTML = "Resume data import";
        pauseBtn.classList.remove("redbg");
        countDown.innerHTML = "Data import paused";
        countDown.classList.add("redtext");
    } else {
        // Resume loading data
        myTimer = setInterval(updateTimer, 1000);
        // Change text
        pauseBtn.innerHTML = "Pause data import";
        pauseBtn.classList.add("redbg");
        countDown.innerHTML = "New data in: " + cntTimeout + " seconds.";
        countDown.classList.remove("redtext");
    }
}