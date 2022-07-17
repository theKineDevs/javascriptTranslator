// Kine's Translator Bot for Twitch
require('dotenv').config();
const tmi = require('tmi.js');
const gtrans = require('googletrans').default;
const ignoreUsers = ['Nightbot', 'BikuBikuTest']
const ignoreWords = [
  'http', 'thekineDumpy', 'nt', 'ntnt', '<3',
  'Kappa', 'thekineLove', 'thekineBubbletoss',
  'Kreygasm', 'thekineScarz', 'thekineCry',
  'thekineStuck', 'doopleGrip', 'doopleLove', 'LUL',
  'VoteYea', 'VoteNay', ':)', 'NotLikeThis', 'TheIlluminati',
  'HeyGuys', 'PogChamp', 'VoHiYo', 'BibleThump', 'WutFace',
  'ResidentSleeper', 'thekineDeded', 'thekineDumpy', 'thekineJam',
  'thekineWiggle', 'thekineBubbletoss', 'thekineREEE', 'thekineLove',
  'thekineBubble', 'thekineYikes', 'thekineSip', 'thekinePeek',
  'thekinePat', 'thekineNotes', 'thekineNom', 'thekineSleep',
  'thekineKiss', 'thekineHug', 'thekineHmm', 'thekineFlex',
  'thekineBigfan', 'thekineDerp', 'thekineDeaf', 'thekinePork',
  'thekineDed', 'thekineCry', 'thekineShy', 'thekineBless',
  'thekineAngy', 'thekineGgs', 'thekineRage', 'thekineSmart',
  'thekineWingman', 'thekinePg', 'thekinePork', 'thekineFace',
  'thekineWtf', 'thekineScarz', 'thekineStuck', 'VeryPog',
  'TriSad', 'sumSmash', 'dinkDonk', 'Smile', 'Thinking2',
  'Thinking', 'ppSmoke', 'Binoculars', 'NoThanks', 'BASED',
  '4House', 'Weirdge', 'Handsup', 'GoodMeme', 'BUSSERS',
  'SHUSHERS', 'HYPERNODDERS', 'HYPERNOPERS', 'FLAPPERS',
  'BLUBBERS', 'GoodTake', 'Applecatrun', 'DANKIES', 'catKISS',
  'Drake', 'OMEGALULiguess', 'Jammies', 'SALAMI', 'pepeMeltdown',
  'peepoChat', 'PEEPEES', 'peepoRain', 'TriDance', 'BLANKIES',
  'peepoSleep', 'Madge', 'donowall', 'donkGiggles', 'HYPERCLAP',
  'peepoCoffee', 'ppOverheat', 'gachiPRIDE', 'Slap', 'MONKE',
  'GoodMorning', 'Gladgers', 'NOOOO', 'DankG', 'Tastyge',
  'CoffeeTime', 'MEGA', 'MONKE', 'Bedge', 'FeelsLagMan',
  'DonkCredit', 'GIGACHAD', 'BOOBA', 'monkaTOS', 'Scoots',
  'whycantthisfuckingbemegoddamnit', 'Prayge', 'ModTime',
  'PETTHEPEEPO', 'PepegaCard', 'WICKED', 'PETTHESTREAMER',
  'peepoShortOnAGoose', 'KEKWait', 'popCat', 'Modge',
  'COCKA', 'pugPls', 'SaxTime', 'POGGIES', 'PizzaTime',
  'DonoTime', 'pepePHONE', 'YEP', 'Offline', 'Smoge',
  'ApuChef', 'COGGERS', 'PETTHEVIPS', 'ACTINUP',
  'monkaHmm', 'peepoTalk', 'POGGIESS', 'ppSkate',
  'PepoPopcorn', 'peepoJail', 'KKonaLand', 'KEKL',
  'Saved', 'BANGER', 'peepoLegs', 'waterTime', 'Clueless',
  'dittoDumper', 'glizzyL', 'glizzyR', 'Applecatgun',
  'dogJAM', 'peepoFlower', 'Oldge', 'MODSS', 'BOOMIES',
  'Homi', 'CatAHomie', 'MonkeKiss', 'JointTime', 'FeelsDabMan',
  'widepeepoHug', 'peepoRoo', 'peepoFoil', 'SURE', 'peepoCheer',
  'Kissaweeb', 'xqcMald', 'WAYTOODANK', 'PeepoFinger', 'peepoStare',
  'YEPCOCK', 'peepoWagon', 'PepeSpit', 'peepoBlanketShare', 'DankHandshake',
  'DankVrum', 'stopbeingMean', 'LETSGOOO', 'SCAMMED', 'monkaHide',
  'PepegaAim', 'pepeBREAKDANCE', 'donkWalk', 'Radge', 'SUSSY', 'LipBite',
  'YEO', 'peepoFood', 'lebronJAM', 'monkeySip', 'Bananacatrun', 'PogU',
  'FeelsWeakMan', 'GIGADONK', 'peepoGamble', 'ChefsKiss', 'peepoLove',
  'Businessge', 'GoldenKappa', 'KEKWTF', 'Nerdge', 'peepoSit',
  'pepePoint', 'PlsBanMe', 'APEXFROG', 'PepeMoney', 'peeTime',
  'CopiumTime', 'FeelsDankVip', 'peepoComfy', 'peepoPooPoo',
  'peepoBand', 'Slapahomie', 'PogFish', 'PogOGrab', 'Kissahomie',
  'OME', 'VIPS', 'Chatting', 'PepeLoser', 'peepoRiot', 'peepoBlush',
  'YesYes', 'bruh', 'ewApex', 'DIESOFCRINGE', 'peepoEvil',
  'DonkSass', 'BOTHA', 'Wokege', 'peepoHappyRoll', 'peepoMarch',
  'catAwkward', 'applecatPanik', 'Avocatospin',
  'FullEpisodeOfRickAndMortySeason3Episode3ButSpedUpSuperFastImPickleRickMortyITurnedMyselfIntoAPickle',
  'WICKEDcock', 'XiPls', 'PepegaSlide', 'mandeSucccccc',
  'SALAMIhand', 'orangeCatRun', 'Adge',
  'POUND', 'TakingNotesL', 'HomieKiss', 'MODS',
  '2TIME', 'Aware', 'HUH', 'BowTime', '3Pepekeklul',
  'TinaTwerk', 'gettingSturdy', 'peepoCappin', 'ElmoDance',
  'Pumpkincatrun', 'BINGCHILLING', 'PikaYeet', 'ThisIsFine',
  'Sip', 'ICANT', 'GAMBAADDICT', 'xqcCheer', 'WhoAsked',
  'WeirdManDude', '4Weird', 'CatChest', 'ppZip', 'ApexServers',
  'applecatCHASE', 'MathTime', 'AYO', 'peepoJuiceSpin',
  'RainbowTwerk', 'GROUPA', 'WigglesAround', 'peepoSub',
  'md7GroupJAM', 'Vibe', 'Binoculous', 'GroupWankge',
  'willSlap', 'PeepoSZpride', 'Batting', 'xdd',
  'peepoPrime', 'WOT', 'iitzTake', 'JOHNNYCANT',
  'GIbbyTat', 'ClutchPlays', 'LegalHacks', 'SleepyTime',
  'wiggExit', 'Hearding', 'Copege', 'ChairStream', 'gachiBASS',
  'peepoHappy', 'BillyApprove', 'WAYTOODANK', 'WineTime',
  'FeelsDankMan', 'RebeccaBlack', 'FeelsWeirdMan', '7tvM',
  'reckH', 'FeelsOkayMan', 'CrayonTime', 'BasedGod',
  'forsenPls', 'TeaTime', 'Clap', 'GuitarTime', 'Clap2',
  'FeelsStrongMan', 'gachiGASM', 'nymnCorn', 'RareParrot',
  'AYAYA', 'knaDyppaHopeep', 'PianoTime', 'peepoSad',
  'YEAHBUT7TV', 'PepePls', 'AlienDance', 'EZ', 'ppL',
  'Stare', 'RainTime', 'PETPET', 'SteerR', 'PartyParrot',
  'ApuApustaja', 'Gayge', 'EZ', 'peepoSmash', 'MLADY',
  'sumSmash', 'KKool', 'FeelsLateMan', 'GuitarTime',
  'FeelsLoveMan', 'widepeepoHeart', 'gachiHYPER',
  'PepoSabers', 'pepeClap', 'kmdWeee', 'peepoRain',
  'Hmmm', 'BLELELE', 'MmmShake', 'TriHardoM',
  'peepoNaruSprint', 'peepoStrongest', 'PepegaGun', 'PepegaAim',
  'PepegaDitch', 'BearHug', 'peepoFatrun', 'peepoExit', 'BongoFat',
  'WeirdChamping', 'catJAM', 'ModTime', 'Brows', 'pompomD', 'PepegaCredit',
  'DONTPETTHEPEEPO', 'peepoSHAKE', 'gachiBASS', 'PepoDance', 'pepeD',
  'CLAP', 'PepoCheer', 'peepoClap', 'SadgeCry', 'peepoShy', 'Jammies',
  'TriDance', 'TriKool', 'pepeJAM', 'PEPEDS', 'peepoWink', 'peepoRun',
  'peepoArrive', 'peepoLeave', 'peepoGiggles', 'peepoPats', 'HACKERMANS',
  'peepoPooPoo', 'peepoBye', 'peepoHey', 'NOPERS', 'NODDERS', 'peepoJAMMER',
  'peepoWine', 'ppOverheat', 'PogUU', 'PauseChamp', 'iLOVEyou', 'Prayge', 'pugPls',
  'popCat', 'modCheck', 'DanceBro', 'monkaSTEER', 'pepeL', 'PETTHEMODS', 'HYPERPOGGER',
  'SmokeTime', 'gibbyJAM', 'COPIUM', 'PepoG', 'dittoDumper', 'peepoVrumvrum', 'PagMan',
  'PogO', 'BOFA', 'Segz', ':tf:', 'CiGrip', 'DatSauce', 'ForeverAlone', 'GabeN',
  'HailHelix', 'ShoopDaWhoop', 'M&Mjc', 'bttvNice', 'TwaT', 'WatChuSay', 'tehPoleCat',
  'AngelThump', 'TaxiBro', 'BroBalt', 'CandianRage', 'D:', 'VisLaud', 'KaRappa',
  'FishMoley', 'Hhhehehe', 'KKona', 'PoleDoge', 'sosGame', 'CruW', 'RarePepe',
  'haHAA', 'FeelsBirthdayMan', 'RonSmug', 'KappaCool', 'FeelsBadMan', 'bUrself',
  'ConcernDoge', 'FeelsGoodMan', 'FireSpeed', 'NaM', 'SourPls', 'LuL', 'SaltyCorn',
  'monkaS', 'VapeNation', 'ariW', 'notsquishY', 'FeelsAmazingMan', 'DuckerZ',
  'SqShy', 'Wowee', 'WubTF', 'cvR', 'cvL', 'cvHazmat', 'cvMask', 'DogChamp',
  'KEKW', 'Pog', '3Head', 'PepeClown', 'Pog', 'widepeepoHappy', 'widepeepoSad',
  'widepeepoBlanket', 'peepoFinger', 'PepeMods', 'MONKERS', 'LULW', 'KEKW', 'OMEGALUL',
  'PauseChamp', 'PepeLaugh', 'peepoSad', 'POGGERS', '5Head', 'peepoFat', 'forsenCD',
  'Okayge', 'peepoSus', '4WeirdW', 'pepePoint', 'FeelsStrongMan', 'HYPERS', 'Kapp',
  'monkaChrist', 'monkaW', 'NOP', 'Sadge', 'YEP', 'FeelsWowMan', 'peepoHappy',
  'PepoThink', 'Pepepains', 'POOGERS', 'peepoWTF', 'PeepoWeird', 'Pepega',
  'PepegaPhone', 'PepeHands', 'WaitWhat', 'widepeepoHigh', 'COPIUM', 'monkaS',
  'FeelsGoodMan', 'FeelsBadMan', 'sup', 'huh', 'lol', 'Lol', 'LOl', 'LOL', 'lOL', 'loL', 'haha'
]


// Define configuration options here
// - username is the name of the channel/bot
// - password is generated on https://twitchapps.com/tmi/ page
// - channels is an array of channels
// - connection: defines additional options
//
// username and password are defined after CHANNEL_NAME and CHANNEL_PASSWORD environment variables
// (you also can overwrite botName and botPassword here)

let botName = process.env.CHANNEL_NAME;
let botPassword = process.env.CHANNEL_PASSWORD;

// If no channel & password, then exit...
if ((botName == undefined) || (botPassword == undefined)) {
  console.error('No CHANNEL_NAME or CHANNEL_PASSWORD environment variable found. Exiting.');
  process.exit(-1);
}
// add oauth: before botPassword
botPassword = 'oauth:' + botPassword;

const opts = {
  identity: {
    username: botName,
    password: botPassword
  },
  channels: [
    'jan_levinson_i_presume'
  ],
  // Automatic reconnection
  connection: { reconnect: true }
};
// Create a client with our options
const client = new tmi.client(opts);

const tr_lang = {
  'de': ['de', 'sagt'],
  'en': ['en', 'says'],
  'fr': ['fr', 'dit'],
  'pt': ['pt', 'disse'],
  'ja': ['ja', ''],
};

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  // implement variable to change target trans lang
  if (msg[0] === '!') {
    return;
  };
  const userSending = context?.username;
  if (ignoreUsers.includes(userSending)) {
    return;
  };

  try {

    // Ignore messages from the bot
    if (self) { return; }

    // Remove whitespace from chat message
    let tMsg = '!ja' + ' ' + msg.trim();

    // Check if the message starts with @name
    // in that case, extract the name and move the @name at the end of the message, and process
    if (tMsg[0] === '@') {
      let atnameEndIndex = tMsg.indexOf(' ');
      let atname = tMsg.substring(0, atnameEndIndex);
      let msg = tMsg.substring(atnameEndIndex + 1);
      tMsg = msg + ' ' + atname;
      console.info('Changed message :', tMsg);
    }
    // Filter commands (options)
    if (tMsg[0] != '!') return;

    // Extract command
    let cmd = tMsg.split(' ')[0].substring(1).toLowerCase();

    // Name for answering
    let answername = '@' + context['display-name'];

    // Command for displaying the commands (in english)
    if (cmd === "lang" || cmd === "translate") {
      client.say(target, 'I can (approximatevely) translate your messages in many languages. Simply start your message with one of these commands: !en (english) !fr (french)  !de (german) !pt (portuguese)... ');
      return;
    }

    if (cmd in tr_lang) {
      var ll = tr_lang[cmd];
      var txt = tMsg.substring(1 + cmd.length);
      const message = txt?.toString().toLowerCase().trim()

      if (ignoreWords.includes(message)) {
        console.log('txt is in the building', txt)
        return;
      }
      if (message?.length <= 2) {
        return;
      }

      // Text must be at least 2 characters and max 200 characters
      var lazy = false;
      if (txt.length > 2) {
        if (txt.length > 200) {
          lazy = true;
          txt = "i'm too lazy to translate long sentences ^^";
        }

        // Lazy mode, and english target => no translation, only displays 'lazy' message in english
        if ((lazy === true) && (ll[0].indexOf('en') == 0)) {
          say(target, context['display-name'] + ', ' + txt);
          return;
        }

        // Translate text
        gtrans(txt, { to: ll[0] }).then(res => {
          if (lazy === true) {
            // lazy mode sentence in english and also in requested language
            client.say(target, context['display-name'] + ', ' + txt + '/' + res.text);
          }
          else {
            // Translation
            client.say(target, context['display-name'] + ' ' + ll[1] + ': ' + res.text);
          }
        }).catch(err => {
          console.error('Translation Error:', err);
        })
      }
    }
  }
  catch (e) {
    console.error(e.stack);
  }


}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

// const ignoreLines = ['http', 'BikuBikuTest', '888', '８８８']
// const deleteWords = ['saatanNooBow', 'BikuBikuTest'];