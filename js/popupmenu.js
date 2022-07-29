const submit_button = document.getElementById('submit_button');
const tab_button = document.getElementById('open_button');
const link_button = document.getElementById('link_button');
var DBName = 'browseyalater';


//Sending a Link to Queue
submit_button.addEventListener('click', () => {
    const web_link = document.getElementById("mytext"); //Get input link
    alert('Input is: ' + web_link.value);
    if(web_link.value){
        var db = new Dexie(DBName);
        // Data store name: URL, Key is auto increment, Data: URLAddress
        db.version(1).stores({
            URL: '++id, URLAddress'
        });

        db.URL.put({
            URLAddress: web_link.value
        })
        // chrome.storage.local.get(['number_of_tabs'], function(number) {
        //     if(number.number_of_tabs == undefined){ //Initialize process
        //         var tmp = 1;
        //     } else {
        //         var tmp = number.number_of_tabs+1;
        //     }
        //     chrome.storage.local.set({"number_of_tabs":tmp}, function(){});
        //     alert('Value currently is ' + tmp);
        // })
    }

    //Make the Input form back to Empty
    web_link.value = '';
});

//Open on NEW tab
tab_button.addEventListener('click', () => {
    Dexie.exists(DBName).then(function(exists){
        if(exists){
            var db = new Dexie(DBName);
            if(db.URLAddress.get(0) != undefined){
                var link_add = db.URLAddress.last();
                chrome.tabs.create({ url: link_add });
                db.URLAddress.last().delete();
            }
        }
    });
    // chrome.storage.local.get(['number_of_tabs'], function(number) {
    //     if(number.number_of_tabs == undefined){ //Initialize process
    //         alert('Number of tabs were initialized, it is 0 and request denied')
    //         number.number_of_tabs=0;
    //     } else if(number.number_of_tabs == 0){ //NO Link
    //         alert('There is no link to pull, request denied');
    //     } else {
    //         var tmp = number.number_of_tabs - 1;
    //         alert('Link is opened, previously, there were ' + number.number_of_tabs + 'links, now the number of link is: ' + tmp);
    //     }
    //     chrome.storage.local.set({"number_of_tabs":tmp}, function(){});
    // })    
    // To open link on NEW TAB
        // chrome.tabs.create({ url: action_url });
});

//Open on CURRENT tab
link_button.addEventListener('click', () => {
    Dexie.exists(DBName).then(function(exists){
        if(exists){
            var db = new Dexie(DBName);
            if(db.URLAddress.get(0) != undefined){
                var link_add = db.URLAddress.last();
                chrome.tabs.update({ url: link_add });
                db.URLAddress.last().delete();
            }
        }
    });
    // chrome.storage.local.get(['number_of_tabs'], function(number) {
    //     if(number.number_of_tabs == undefined){ //Initialize process
    //         alert('Number of tabs were initialized, it is 0 and request denied')
    //         number.number_of_tabs=0;
    //     } else if(number.number_of_tabs == 0){ //NO Link
    //         alert('There is no link to pull, request denied');
    //     } else {
    //         var tmp = number.number_of_tabs - 1;
    //         alert('Link is opened, previously, there were ' + number.number_of_tabs + 'links, now the number of link is: ' + tmp);
    //     }
    //     chrome.storage.local.set({"number_of_tabs":tmp}, function(){});
    // })
    // To open link on CURRENT TAB
    // chrome.tabs.update({ url: action_url });
});