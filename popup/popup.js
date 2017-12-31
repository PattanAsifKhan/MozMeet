var data = null;

var xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        var meetup_list = JSON.parse(this.responseText);
        document.getElementById("loading").classList.add("hidden");
        if (meetup_list.length == 0) {
            document.getElementById("no_events").classList.remove("hidden");
        } else {
            var meetups = document.getElementById("meetups");
            meetups.classList.remove("hidden");
            for (var i = 0; i < meetup_list.length; i++) {
                var meetup = document.createElement("div");
                meetup.classList.add("meetup_group");

                var meetup_name = document.createElement("div");
                meetup_name.appendChild(document.createTextNode(meetup_list[i].name));
                meetup_name.classList.add("meetup_name");
                meetup.appendChild(meetup_name);

                var meetup_time = document.createElement("div");
                meetup_time.appendChild(document.createTextNode(meetup_list[i].local_date + " " + meetup_list[i].local_time));
                meetup_time.classList.add("meetup_time");
                meetup.appendChild(meetup_time);

                var meetup_link = document.createElement("div");
                meetup_link.setAttribute("hidden", true);
                meetup_link.appendChild(document.createTextNode(meetup_list[i].link));
                meetup.appendChild(meetup_link);

                meetups.appendChild(meetup);
            }
        }
    }
});

xhr.open("GET", "https://api.meetup.com/Mozilla-Hyderabad/events?photo-host=public&page=20&sig_id=225151603&sig=e14efbc88e84c6648814520f7b16d766b716e142");
xhr.send(data);


document.addEventListener("click", (e) => {
    target = e.target;
    if (!target.classList.contains("meetup_group")) {
        target = target.parentElement;
    }
    if (target.classList.contains("meetup_group")) {
        var link = target.getElementsByTagName("div")[2].textContent;
        browser.tabs.create({ url: link });
    }
});