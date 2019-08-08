const monthStrings: Array<string> = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Augt",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
]

export function minutesToTime(minutes: number): string {
    let time = "";
    let timePeriod = "AM";
    let hours = Math.floor(minutes / 60);
    if(hours === 0) {
        hours = 12;
    }
    else if(hours == 12) {
        timePeriod = "PM";
    }
    else if(hours > 12) {
        hours =  hours - 12;
        timePeriod = "PM";
    }
    let min = String(minutes % 60);
    if(min == "0" ) {
        min = "00";
    }

    time = `${hours.toString()}:${min} ${timePeriod}`;

    return time;
}

export function dateParser(date, month, day) {
    return day + ' ' + monthStrings[month] + ' ' + date;
}