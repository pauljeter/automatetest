const args = require('yargs').argv;
const webexTeams = require('ciscospark');
const package = require('./package.json');

function promptCiscoWebexToken(spaceId) {
  return new Promise(function(resolve, reject) {
    if (process.env.WEBEXTEAMS_ACCESS_TOKEN) {
      resolve(process.env.WEBEXTEAMS_ACCESS_TOKEN);
    } else {
      reject('WEBEXTEAMS_ACCESS_TOKEN env variable not found');
      // var questions = [
      //   {
      //     type: 'input',
      //     name: 'wtToken',
      //     message: 'Webex Teams access token:',
      //   },
      // ];

      // console.log(
      //   '\x1b[33m%s\x1b[0m',
      //   'WEBEXTEAMS_ACCESS_TOKEN env variable not found (set WEBEXTEAMS_ACCESS_TOKEN to skip this prompt)'
      // );
      // inquirer.prompt(questions).then(function(answers) {
      //   resolve(answers.wtToken);
      // });
    }
  });
}

function promptCiscoWebexSpace() {
  return new Promise(function(resolve, reject) {
    if (process.env.WEBEXTEAMS_SPACE_ID) {
      spaceId = process.env.WEBEXTEAMS_SPACE_ID;
      resolve(spaceId);
    } else {
      reject('WEBEXTEAMS_SPACE_ID env variable not found.');
      // var questions = [
      //   {
      //     type: 'input',
      //     name: 'wtSpace',
      //     message: 'Webex Teams access space id:',
      //   },
      // ];

      // console.log(
      //   '\x1b[33m%s\x1b[0m',
      //   'WEBEXTEAMS_SPACE_ID env variable not found (set WEBEXTEAMS_SPACE_ID to skip this prompt)'
      // );
      // inquirer.prompt(questions).then(function(answers) {
      //   spaceId = answers.wtSpace;
      //   resolve(spaceId);
      // });
    }
  });
}

function sendWebexTeamsMessage() {
  const teamsMessage = '# ' + package.name + '\n' + args.message;
  console.log(package.name);
  let spaceId;
  promptCiscoWebexSpace()
    .then((response) => {
      spaceId = response;
      return promptCiscoWebexToken();
    })
    .then((wtToken) => {
      const teams = webexTeams.init({
        credentials: {
          authorization: {
            access_token: wtToken,
          },
        },
      });
      return teams.messages.create({
        markdown: teamsMessage,
        roomId: spaceId,
      });
    });
}

sendWebexTeamsMessage();
