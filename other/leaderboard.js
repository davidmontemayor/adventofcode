const fs = require('fs');

/*
// Tom's Leaderboard
curl 'https://adventofcode.com/2022/leaderboard/private/view/1056653.json' \
  -H 'cookie: session=53616c7465645f5ff15c1f893171afe3c69ec05c6d8108f87041c68e87176f60d917772b18ca9ea8e78267cb743af7b59a65dd252c9ea4fa7ec862c4c261a96b' \
  --compressed > leaderboard2022.json
*/
// const helpers = require('./helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  return JSON.parse(input);
}

function process() {
  const data = readInput('leaderboard2022.json');
  // Show who did what in order
  var daysData = {};
  const leaderboardMembers = Object.keys(data.members);
  const maxPoints = leaderboardMembers.length;
  leaderboardMembers.forEach(key => {
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
    console.log ("December " + day + ", 2022\n");
    var points1Left = maxPoints;
    var points2Left = maxPoints;
    daysData[day].forEach(entry => {
      const worth = entry.star == 1 ? points1Left -- : points2Left--;
      userPoints[entry.name] = (userPoints[entry.name] || 0) + worth;
      console.log(formatName(entry.name), 'P' + entry.star, padString('(+' + worth + ')', 6), padString('' + userPoints[entry.name], 3), ' ', 'Time:' + betterDate(new Date(entry.timestamp*1000)));
    })
    console.log ("==============================================================")
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
  return padString(nameInput, 20);
}

padString = (string, count) => {
  const pad = count - string.length;
  const nameArray = Array.from(string);
  nameArray.push(...new Array(pad).fill(' '));
  return nameArray.join('');
}

// TODO: track points per day and print out a progression
process();