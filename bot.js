// Kine's Translator Bot for Twitch
import dotenv from 'dotenv';
dotenv.config();
import tmi from 'tmi.js';
import gtrans from 'googletrans';
import { isEmpty, isNil } from 'ramda';
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
let broadcastChannel = process.env.BROADCAST_CHANNEL;

// If no channel & password, then exit...
if ((botName == undefined) || (botPassword == undefined)) {
  console.error('No CHANNEL_NAME or CHANNEL_PASSWORD environment variable found. Exiting.');
  process.exit(-1);
}
// add oauth: before botPassword
botPassword = `oauth:${botPassword}`;

const opts = {
  identity: {
    username: botName,
    password: botPassword
  },
  channels: [
    // channel name goes here
    broadcastChannel
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

const deeplLangugageDictionary = {
  'de': 'DE', 'en': 'EN', 'fr': 'FR', 'es': 'ES', 'pt': 'PT',
  'it': 'IT', 'nl': 'NL', 'pl': 'PL', 'ru': 'RU', 'ja': 'JA', 'zh-CN': 'ZH'
};

const checkForNonTranslate = (msg, self, context) => {
  if (self) {
    return false;
  } else if (msg[0] === '!') {
    return false;
  } else if (msg?.trim()?.split(' ')?.includes(':')) {
    return false;
  } else if (ignoreUsers.includes(context?.username)) {
    return false;
  } else if (!isNil(context?.emotes)) {
    return false;
  }
  return true;
}

// Connect to Twitch:
client.connect();

// Called every time a message comes in
const onMessageHandler = async (target, context, msg, self) => {
  console.log('context', context)
  if (checkForNonTranslate(msg, self, context) === false) {
    console.log('contains a bad message')
    return;
  } else {
    // Remove whitespace from chat message
    let tMsg = msg.trim();
    console.log('tMsg', tMsg)

    if (tMsg[0] === '@') {
      let atnameEndIndex = tMsg.indexOf(' ');
      let atname = tMsg.substring(0, atnameEndIndex);
      let msg = tMsg.substring(atnameEndIndex + 1);
      tMsg = msg + ' ' + atname;
      console.info('Changed message :', tMsg);
    }

    // Extract command
    let cmd = tMsg.split(' ')[0].substring(1).toLowerCase();
    // Name for answering
    let answername = '@' + context['display-name'];

    let txt = tMsg;
    const message = txt?.toString().toLowerCase().trim()

    if (ignoreWords.includes(message)) {
      console.log('Ignoring this word', txt)
      return;
    }
    if (message?.length <= 2) {
      return;
    }

    // Text must be at least 2 characters and max 200 characters
    let lazy = false;
    if (txt.length > 2) {
      if (txt.length > 200) {
        lazy = true;
        txt = "i'm too lazy to translate long sentences ^^";
      }
      try {
        // Translate text
        const ogTrans = await gtrans(txt);
        if (lazy === true) {
          let lazyTr;
          if (ogTrans?.src === 'ja') {
            lazyTr = await gtrans(txt, { to: 'en' });
          } else if (ogTrans?.src === 'en') {
            lazyTr = await gtrans(txt, { to: 'ja' });
          }
          return client.say(target, `${context['display-name']}, ${txt}`);
        }
        else {
          let textTr;
          let lang;
          if (ogTrans?.src === 'ja') {
            textTr = await gtrans(txt, { to: 'en' });
            lang = '[ja > en]';
          } else if (ogTrans?.src === 'en') {
            textTr = await gtrans(txt, { to: 'ja' });
            lang = '[en > ja]'
          }
          client.say(target, context['display-name'] + ' ' + lang + ': ' + textTr.text);
        }
      } catch (err) {
        console.error('Translation Error:', err);
      }

    }
  }
}

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

// const ignoreLines = ['http', 'BikuBikuTest', '888', '８８８']
// const deleteWords = ['saatanNooBow', 'BikuBikuTest'];