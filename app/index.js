import document from "document";
import clock from "clock";
import { inbox } from "file-transfer";
import { readFileSync } from "fs";
import * as cbor from 'cbor';

let settings = {};
let clockText = document.getElementById("clockText");

//initialisation
inbox.onnewfile = processInbox;
clock.granularity = 'minutes';

function setTime(date) {
  clockText.text = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
}

clock.ontick = (evt) => setTime(evt.date);
setTime(new Date());


//settings handling
function loadSettings()
{
  try {
    settings = readFileSync("settings.cbor", "cbor");
    console.log('Applying settings from file...');
    applySettings();
  } catch (e) {
    console.log('No settings found, fresh install, applying default settings...');
    
    //apply default settings
    applyDefaultSettings();
  }
}

function applySettings() {
  clockText.style.fill = settings.timeColor;
}

function applyDefaultSettings() {
  clockText.style.fill = "#FFFFFF";
}

//load stored settings if any at startup
loadSettings();

function processInbox()
{
  let fileName;
  while (fileName = inbox.nextFile()) {
    console.log("File received: " + fileName);

    if (fileName == 'settings.cbor') {
        loadSettings();
    }
  }
};