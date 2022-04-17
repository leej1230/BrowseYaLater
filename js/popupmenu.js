//const link_queue = [];
// Load stuff into link_queue if exists

const submit_button = document.getElementById('submit_button');
const tab_button = document.getElementById('open_button');
const link_button = document.getElementById('link_button');

//LOAD open
// chrome.storage.local.get(['queuetoSAVE'], function(result) {
//     console.log('Value currently is ' + result.key);
//     if(result.key == undefined){
//         const link_queue = [];
//     }else{
//         const link_queue = result.key.split(",");
//     }
// });
var data1 = "placeholder";

chrome.storage.local.get("memo1", function(result){
    data1 = result.memo1;
});


const link_queue = [];
if(data1 != undefined){
    const link_queue = data1.split(",");
}

submit_button.addEventListener('click', () => {
    const web_link = document.getElementById("mytext");
    //mytext is id of input for in html
    link_queue.push(web_link.value);
    var queuetoSAVE = link_queue.join(',');

    web_link.value = '';

    // save
    chrome.storage.local.set({"memo1": queuetoSAVE}, function(){ });
});

tab_button.addEventListener('click', () => {
    var action_url = link_queue.shift();
    if(action_url == undefined){
        var sampleArea = document.getElementById("sampleArea");
        sampleArea.innerHTML = "You have went through everything!"
    }else{
        chrome.tabs.create({ url: action_url });
    }
    // save
});

link_button.addEventListener('click', () => {
    var action_url = link_queue.shift();
    if(action_url == undefined){
        var sampleArea = document.getElementById("sampleArea");
        sampleArea.innerHTML = "You have went through everything!"
    }else{
    chrome.tabs.update({ url: action_url });
    }
    // save
});

