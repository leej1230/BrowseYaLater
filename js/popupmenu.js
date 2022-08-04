import { Dexie } from '../node_modules/dexie/dist/dexie.mjs';
import db from './db.js';

const submit_button = document.getElementById('submit_button');
const tab_button = document.getElementById('open_button');
const link_button = document.getElementById('link_button');


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
    db.URL.get(2).then(function(d){
        if(!d){
            console.log("The data was undefined");
        }else{
            console.log('Output Test2');
            console.log("Earned Data: " + d.URLAddress);
            chrome.tabs.create({ url: d.URLAddress });
        }
    }).catch(function(error) {
        console.log('Error has occured');
        console.error(error);
    });
});

//Open on CURRENT tab
link_button.addEventListener('click', () => {
    console.log('Output Test');
    db.URL.get(2).then(function(d){
        if(!d){
            console.log("The data was undefined");
        }else{
            console.log('Output Test2');
            console.log("Earned Data: " + d.URLAddress);
            chrome.tabs.update({ url: d.URLAddress });
        }
    }).catch(function(error) {
        console.log('Error has occured');
        console.error(error);
    });
});