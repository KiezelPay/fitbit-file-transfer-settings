import document from "document";
import clock from "clock";
import { inbox } from "file-transfer";
import { readFileSync } from "fs";
import * as cbor from 'cbor';

let defaultSettings = {
  timeColor: '#FFFFFF',
  dateColor: '#FFFFFF',
  showDate: false,
  dateFormat: "dd-mm-yyyy"
};
let settings = defaultSettings;

let clockText = document.getElementById("clockText");
let dateText = document.getElementById("dateText");

//initialisation
inbox.onnewfile = processInbox;
clock.granularity = 'minutes';

function setTime(date) {
  clockText.text = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
  
  let dateAsText = settings.dateFormat; 
  dateAsText = dateAsText.replace('dd', ("0" + date.getDate()).slice(-2));
  dateAsText = dateAsText.replace('mm', ("0" + (date.getMonth() + 1)).slice(-2));
  dateAsText = dateAsText.replace('yyyy', (1900 + date.getYear()));
  dateText.text = dateAsText;
}

clock.ontick = (evt) => setTime(evt.date);
setTime(new Date());


//settings handling
function loadSettings()
{
  try {
    settings = readFileSync("settings.cbor", "cbor");
    transformSettings();
    mergeWithDefaultSettings();
  } catch (e) {
    console.log('No settings found, fresh install, applying default settings...');
    
    //apply default settings
    settings = defaultSettings;
  }
  
  console.log('Applying settings: ' + JSON.stringify(settings));
  applySettings();
}

function transformSettings() {
  //change all settings you want in another format as sent by the companion here
  if (settings.dateFormat) {
    settings.dateFormat = settings.dateFormat.values[0].name;
  }
}

function mergeWithDefaultSettings() {
  for (let key in defaultSettings) {
    if (!settings.hasOwnProperty(key)) {
      settings[key] = defaultSettings[key];
    }
  }
}

function applySettings() {
  clockText.style.fill = settings.timeColor;
  dateText.style.fill = settings.dateColor;
  dateText.style.display = (settings.showDate) ? 'inline' : 'none';
  setTime(new Date());
}

//load stored settings if any at startup
loadSettings();

function processInbox()
{
  let fileName;
  while (fileName = inbox.nextFile()) {
    console.log("File received: " + fileName);

    if (fileName === 'settings.cbor') {
        loadSettings();
    }
  }
};