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
  var daysData = {};
  Object.keys(data.members).forEach(key => {
    const user = data.members[key];
    Object.keys(user.completion_day_level).forEach(day => {
      const dayInt = parseInt(day);
      if (!daysData[dayInt]) {
        daysData[dayInt] = [];
      }
      const dayData = user.completion_day_level[day];
      if (dayData['1']) {
        daysData[dayInt].push({
          name: user.name,
          star: 1,
          timestamp: dayData['1'].get_star_ts
        })
      }
      if (dayData['2']) {
        daysData[dayInt].push({
          name: user.name,
          star: 2,
          timestamp: dayData['2'].get_star_ts
        })
      }
    });
  });
  // console.log(data);

  const userPoints = {};
  Object.keys(daysData).forEach(day => {
    daysData[day].sort((a,b) => a.timestamp - b.timestamp)
    console.log ("December " + day + ", 2021\n");
    var points1Left = 11; //TODO: automate
    var points2Left = 11;
    daysData[day].forEach(entry => {
      const worth = entry.star == 1 ? points1Left -- : points2Left--;
      userPoints[entry.name] = (userPoints[entry.name] || 0) + worth;
      console.log(formatName(entry.name), entry.star, '\t', betterDate(new Date(entry.timestamp*1000)), 'Received: ', worth, 'Total: ', userPoints[entry.name]);
    })
    console.log ("=========================================================================")
    console.log('')
  })
  console.log('TOTALS')
  console.log('------')
  const totals = [];
  Object.keys(userPoints).forEach(user => totals.push( { user, points: userPoints[user] }));
  const sorted = totals.slice(0).sort((a,b) => b.points - a.points)
  sorted.forEach(x => console.log(formatName(x.user), x.points));
}

betterDate = (date) => {
  var dateStr = date.toString()
    .replace(' GMT-0500 (Eastern Standard Time)', '')
    .slice(3);
  return dateStr;
}

// Ascending
sortNumArray = (array) => {
  return array.slice(0).sort((a,b) => a-b);
};

formatName = (nameInput) => {
  const name = nameInput || 'Sean V. Probs';
  const pad = 20 - name.length;
  const nameArray = Array.from(name);
  nameArray.push(...new Array(pad).fill(' '));
  return nameArray.join('');
}

// TODO: track points per day and print out a progression
process();