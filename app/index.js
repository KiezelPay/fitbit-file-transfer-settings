import document from "document";
import clock from "clock";
import { inbox } from "file-transfer";
import { readFileSync } from "fs";
import * as cbor from 'cbor';

let defaultSettings = {
  timeColor: '#FFFFFF',
  dateColor: '#FFFFFF',
  showDate: false
};
let settings = {};

let clockText = document.getElementById("clockText");
let dateText = document.getElementById("dateText");

//initialisation
inbox.onnewfile = processInbox;
clock.granularity = 'minutes';

function setTime(date) {
  clockText.text = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
  dateText.text = (1900 + date.getYear()) + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDay()).slice(-2);
}

clock.ontick = (evt) => setTime(evt.date);
setTime(new Date());


//settings handling
function loadSettings()
{
  try {
    settings = readFileSync("settings.cbor", "cbor");
    mergeWithDefaultSettings();
    
    console.log('Applying settings from file...');
    applySettings();
  } catch (e) {
    console.log('No settings found, fresh install, applying default settings...');
    
    //apply default settings
    settings = defaultSettings;
    applySettings();
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