var link_queue = [];
// Load stuff into link_queue if exists
if (window.localStorage) {
	let json = localStorage.getItem('key_name');
	let link_queue = JSON.parse(json);
}


const submit_button = document.getElementById('submit_button');
const tab_button = document.getElementById('open_button');
const link_button = document.getElementById('link_button');

submit_button.addEventListener('click', () => {
    const web_link = document.getElementById("mytext");
    //mytext is id of input for in html
    link_queue.push(web_link.value);
    web_link.value = '';
    if (window.localStorage) {
        let json = JSON.stringify(link_queue, undefined, 1);
        localStorage.setItem('key_name', json);
    }
});

tab_button.addEventListener('click', () => {
    var action_url = link_queue.shift();
    if(action_url == undefined){
        var sampleArea = document.getElementById("sampleArea");
        sampleArea.innerHTML = "You have went through everything!"
    }else{
        chrome.tabs.create({ url: action_url });
    }
    if (window.localStorage) {
        let json = JSON.stringify(link_queue, undefined, 1);
        localStorage.setItem('key_name', json);
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
    if (window.localStorage) {
        let json = JSON.stringify(link_queue, undefined, 1);
        localStorage.setItem('key_name', json);
    }
});