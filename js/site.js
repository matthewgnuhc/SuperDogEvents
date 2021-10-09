let events = [{
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017"
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018"
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019"
    }
]


// Build a Dropdown of Distinct Cities
function buildDropDown() {
    //event DD is the Drop down items to select on HTML
    let eventDD = document.getElementById("eventDropDown");
    //clear out the drop down
    eventDD.innerHTML = "";
    // get the template
    let ddTemplate = document.getElementById("cityDD-template");

    let curEvents = JSON.parse(localStorage.getItem("eventData")) || events;;

    let distinctEvents = [...new Set(curEvents.map((event) => event.city))];

    let ddItemNode = document.importNode(ddTemplate.content, true);
    let ddItem = ddItemNode.querySelector("a");
    ddItem.setAttribute("data-string", "All");
    ddItem.textContent = "All";
    eventDD.appendChild(ddItemNode);

    //add the Cities to the dropdown
    for (let i = 0; i < distinctEvents.length; i++) {
        ddItemNode = document.importNode(ddTemplate.content, true);
        ddItem = ddItemNode.querySelector("a");
        ddItem.setAttribute("data-string", distinctEvents[i]);
        ddItem.textContent = distinctEvents[i];
        eventDD.appendChild(ddItemNode);

    }

    //display stats for all events
    displayStats(curEvents);
    //display data set
    displayData();
}

function displayStats(filteredEvents) {
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;

    filteredEvents.forEach((e) => {
        let currentAttendance = e.attendance;
        total += currentAttendance;

        if (most < currentAttendance) {
            most = currentAttendance;
        }
        if (least > currentAttendance || least < 0) {
            least = currentAttendance;
        }
        average = total / filteredEvents.length;


    })

    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(
        undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });

    document.getElementById("least").innerHTML = least.toLocaleString();
}

//get the events for the selected City
function getEvents(ddElement) {
    let cityName = ddElement.getAttribute("data-string")
    let curEvents = JSON.parse(localStorage.getItem("eventData")) || events;
    let filteredEvents = curEvents;
    document.getElementById("statsheader").innerHTML = `Stats for ${cityName} events`

    if (cityName != "All") {
        //filter the array using filter array method
        filteredEvents = curEvents.filter(function (item) {
            if (item.city == cityName) {
                return item;
            }
        })
    }
    displayStats(filteredEvents);

}

function displayData() {
    let template = document.getElementById("eventData-template");
    let eventBody = document.getElementById("eventBody");
    eventBody.innerHTML = "";
    let curEvents = JSON.parse(localStorage.getItem("eventData")) || events;
    for (let i = 0; i < curEvents.length; i++) {
        let eventRow = document.importNode(template.content, true);
        let eventCols = eventRow.querySelectorAll("td");

        eventCols[0].textContent = curEvents[i].event;
        eventCols[1].textContent = curEvents[i].city;
        eventCols[2].textContent = curEvents[i].date;
        eventCols[3].textContent = curEvents[i].attendance;
        eventCols[4].textContent = new Date(
            curEvents[i].date).toLocaleDateString();

        eventBody.appendChild(eventRow);


    }
}

//Save event data to local storage
function saveData() {
    let curEvents = JSON.parse(localStorage.getItem("eventData")) || events;
    let stateSelect = document.getElementById("addEventState");
    let eventDate = document.getElementById("addDate").value;
    let eventDate2 = `${eventDate} 00:00`;

    let newEvent = {
        event: document.getElementById("addEventName").value,
        city: document.getElementById("addCity").value,
        state: stateSelect.options[stateSelect.selectedIndex].text,
        attendance: parseInt(document.getElementById("addAttendance").value, 10),
        date: new Date(eventDate2).toLocaleDateString(),
    };

    curEvents.push(newEvent);

    localStorage.setItem("eventData", JSON.stringify(curEvents));

    buildDropDown();
    displayData();


}