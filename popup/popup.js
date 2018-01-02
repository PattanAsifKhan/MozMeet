var meetup_list = [];

function updateMeetups() {
    if (this.readyState === 4) {
        var data = JSON.parse(this.responseText);
        console.log(data);
        if (data.error) {
            return;
        }
        if (data.data) {
            meetup_list = meetup_list.concat(data.data);
        } else {
            meetup_list = meetup_list.concat(data);
        }
        document.getElementById("loading").classList.add("hidden");
        if (meetup_list.length == 0) {
            document.getElementById("no_events").classList.remove("hidden");
        } else {
            var meetups = document.getElementById("meetups");
            while (meetups.firstChild) {
                meetups.removeChild(meetups.firstChild);
            }
            console.log(meetup_list);
            meetups.classList.remove("hidden");
            for (var i = 0; i < meetup_list.length; i++) {
                var meetup = document.createElement("div");
                meetup.classList.add("meetup_group");

                var meetup_name = document.createElement("div");
                meetup_name.appendChild(document.createTextNode(meetup_list[i].name));
                meetup_name.classList.add("meetup_name");
                meetup.appendChild(meetup_name);

                var meetup_time = document.createElement("div");
                var time = null;
                if (meetup_list[i].time) {
                    time = meetup_list[i].time;
                } else {
                    time = meetup_list[i].start_time;
                }
                meetup_time.appendChild(document.createTextNode(time));
                meetup_time.classList.add("meetup_time");
                meetup.appendChild(meetup_time);

                var meetup_venue = document.createElement("div");
                var venue = null;
                if (meetup_list[i].venue) {
                    venue = meetup_list[i].venue.name;
                } else {
                    venue = meetup_list[i].place.name;
                }
                meetup_venue.appendChild(document.createTextNode(venue));
                meetup_venue.classList.add("meetup_venue");
                meetup.appendChild(meetup_venue);

                var meetup_link = document.createElement("div");
                meetup_link.setAttribute("hidden", true);
                var link = null;
                if (meetup_list[i].link) {
                    link = meetup_list[i].link;
                } else {
                    link = "https://www.facebook.com/events/" + meetup_list[i].id;
                }
                meetup_link.appendChild(document.createTextNode(link));
                meetup.appendChild(meetup_link);

                meetups.appendChild(meetup);
            }
        }
    }
}

var data = null;
var xhr_meetups = new XMLHttpRequest();

xhr_meetups.addEventListener("readystatechange", updateMeetups);

xhr_meetups.open("GET", "https://api.meetup.com/Mozilla-Hyderabad/events?photo-host=public&page=20&sig_id=225151603&sig=e14efbc88e84c6648814520f7b16d766b716e142");
xhr_meetups.send(data);

var xhr_facebook = new XMLHttpRequest();

xhr_facebook.addEventListener("readystatechange", updateMeetups);

xhr_facebook.open("GET", "https://graph.facebook.com/v2.11/moztsap/events?access_token=EAACEdEose0cBAKk05ahnghME47dKziPxVe7jUXP6srh4rH6xiVudtuZAeihTgdigEU8MDmHnfTVICZAWUpZAjNMLOa7q3p7zZAZAXaZAYsOvr7frJPpcXFG5HVZC65VD8tGlnC2iAmr5aZAMKZAL4LvllfBpMY9HROVjMClDPw6NRNN97OxS1Mo2qyOL4v8Mhyc3bfQF20q9ToAZDZD&time_filter=upcoming");
xhr_facebook.send(data);
document.addEventListener("click", (e) => {
    var target = e.target;
    if (!target.classList.contains("meetup_group")) {
        target = target.parentElement;
    }
    if (target.classList.contains("meetup_group")) {
        var link = target.getElementsByTagName("div")[3].textContent;
        browser.tabs.create({ url: link });
    }
});