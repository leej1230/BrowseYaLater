const link_queue = [];

const submit_button = document.getElementById('submit_button');
const tab_button = document.getElementById('open_button');
const link_button = document.getElementById('link_button');

submit_button.addEventListener('click', () => {
    const web_link = document.getElementById("mytext");
    web_link.value = '';
    //mytext is id of input for in html
    link_queue.push(web_link.value);
    });

tab_button.addEventListener('click', () => {
    var action_url = link_queue.shift();
    if(action_url == undefined){
        var sampleArea = document.getElementById("sampleArea");
        sampleArea.innerHTML = "You have went through everything!"
    }else{
        chrome.tabs.create({ url: action_url });
    }
});

link_button.addEventListener('click', () => {
    var action_url = link_queue.shift();
    if(action_url == undefined){
        var sampleArea = document.getElementById("sampleArea");
        sampleArea.innerHTML = "You have went through everything!"
    }else{
    chrome.tabs.update({ url: action_url });
    }
});