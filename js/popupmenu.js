import { Dexie } from '../node_modules/dexie/dist/dexie.mjs';
import db from './db.js';

const DBName = 'browseyalater';

const submit_button = document.getElementById('submit_button');
const tab_button = document.getElementById('open_button');
const link_button = document.getElementById('link_button');

function list_empty(){
    alert("The Queue is empty! Time to save links!");
}

//Sending a Link to Queue
submit_button.addEventListener('click', () => {
    const web_link = document.getElementById("mytext"); //Get input link
    if(web_link.value){
        console.log('Input is: ' + web_link.value);
        console.log(db);
        // Data store name: URL, Key is auto increment, Data: URLAddress

        db.URL.add({
            URLAddress: web_link.value
        })
    }

    //Make the Input form back to Empty
    web_link.value = '';
});

tab_button.addEventListener('click', () => {
    console.log('Output Test');
    db.table("URL").toArray().then((val_tab)=>{
        const tab_len = val_tab["length"];
        console.log(val_tab);
        console.log("Accessing Value Test: " + val_tab[0]["URLAddress"]);
        if(tab_len > 0){
            const linktoaccess = val_tab[0]["URLAddress"];
            const arrtosave = val_tab.shift();
            db.table("URL").clear();
            console.log(arrtosave);
            db.URL.bulkAdd(val_tab);
            chrome.tabs.create({ url: linktoaccess });
        }
    }).catch(() => {
        Dexie.delete(DBName);
        list_empty();
    });
});

//Open on CURRENT tab
link_button.addEventListener('click', () => {
    console.log('Output Test');
    db.table("URL").toArray().then((val_tab)=>{
        const tab_len = val_tab["length"];
        console.log(val_tab);
        console.log("Accessing Value Test: " + val_tab[0]["URLAddress"]);
        if(tab_len > 0){
            const linktoaccess = val_tab[0]["URLAddress"];
            const arrtosave = val_tab.shift();
            db.table("URL").clear();
            console.log(arrtosave);
            db.URL.bulkAdd(val_tab);
            chrome.tabs.update({ url: linktoaccess });
        }
    }).catch(() => {
        Dexie.delete(DBName);
        list_empty();
    });
});