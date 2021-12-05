const fs = require('fs');
// const helpers = require('./helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  return JSON.parse(input);
}

function process() {
  const data = readInput('leaderboard.json');
  // Show who did what in order
  // console.log(Object.keys(data.members))
  var daysData = {};
  // console.log(what)
  Object.keys(data.members).forEach(key => {
    // console.log(daysData)
    const user = data.members[key];
    // console.log(user.name)
    Object.keys(user.completion_day_level).forEach(day => {
      const dayInt = parseInt(day);
      if (!daysData[dayInt]) {
        daysData[dayInt] = [];
      }
      const dayData = user.completion_day_level[day];
      if (dayData['1']) {
        // console.log(dayData['1'].get_star_ts)
        daysData[dayInt].push({
          name: user.name,
          star: 1,
          timestamp: dayData['1'].get_star_ts
        })
      }
      if (dayData['2']) {
        // console.log(dayData['2'].get_star_ts)
        daysData[dayInt].push({
          name: user.name,
          star: 2,
          timestamp: dayData['2'].get_star_ts
        })
      }
    });
  });
  // console.log(data);
  Object.keys(daysData).forEach(day => {
    daysData[day].sort((a,b) => a.timestamp - b.timestamp)
    console.log ("DAY " + day)
    daysData[day].forEach(entry => {
      console.log(entry.name, entry.star, '\t', betterDate(new Date(entry.timestamp*1000)))
    })
    console.log ("====================================")
  })
  daysData['1'].sort((a,b) => a.timestamp - b.timestamp)
  // console.log(JSON.stringify(daysData['1']))
  // console.log(JSON.stringify(daysData));
}

betterDate = (date) => {
  var dateStr = date.toString()
    .replace(' GMT-0500 (Eastern Standard Time)', '')
    .slice(3);
  return dateStr;
}
sortNumArray = (array) => {
  return array.slice(0).sort((a,b) => a-b);
};

process();