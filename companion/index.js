import * as messaging from "messaging";
import { settingsStorage } from "settings";
import { outbox } from "file-transfer";
import * as cbor from 'cbor';

let settings = { };

function initialize() {
  //make sure the stored settings are up to date
  restoreSettings();
}

function sendSettingsToWatch() {
  outbox.enqueue('settings.cbor', cbor.encode(settings))
        .then(ft => console.log('settings sent'))
        .catch(error => console.log("Error sending settings: " + error));
}

// A user changes settings
settingsStorage.onchange = evt => {
  settings[evt.key] = JSON.parse(evt.newValue);
  sendSettingsToWatch();
};

// Restore any previously saved settings
function restoreSettings() {
  for (let index = 0; index < settingsStorage.length; index++) {
    let key = settingsStorage.key(index);
    if (key) {
      settings[key] = JSON.parse(settingsStorage.getItem(key));
    }
  }
}

//restore old previous settings on load
initialize();
