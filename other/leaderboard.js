const { exec } = require('child_process');
const fs = require('fs');

/*
// Tom's Leaderboard
curl 'https://adventofcode.com/2023/leaderboard/private/view/1056653.json' \
  -H 'cookie: session=53616c7465645f5f00a38a09eb05b9b9269622b3ed05b15903f0119aa32ad1d3de1c47ff5b2ce3476ab1aef365e12fec4895f3641582c4bc6fb46ab995484907' \
  --compressed > leaderboard2023.json
*/
// const helpers = require('./helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  return JSON.parse(input);
}

function process() {
  const data = readInput('leaderboard_latest.json');
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

  // TODO: you can get the event from the data
  const userPoints = {};
  Object.keys(daysData).forEach(day => {
    daysData[day].sort((a,b) => a.timestamp - b.timestamp)
    console.log (`December ${day}, ${data.event}\n`);
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

// TODO: read session key from file that is not checked in
const session = "";
const url = "https://adventofcode.com/2023/leaderboard/private/view/1056653.json";

exec(`curl '${url}' \
-H 'cookie: session=${session}' \
--compressed > leaderboard_latest.json`, (err, stdout, stderr) => {
  if (err) {
    console.log('Could not execute CURL command.')
    return;
  }

  // the *entire* stdout and stderr (buffered)
  // console.log(`stdout: ${stdout}`);
  // console.log(`stderr: ${stderr}`);

  process();
});

// process();
