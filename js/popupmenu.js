const submit_button = document.getElementById('submit_button');
const tab_button = document.getElementById('open_button');
const link_button = document.getElementById('link_button');


//Sending a Link to Queue
submit_button.addEventListener('click', () => {
    const web_link = document.getElementById("mytext"); //Get input link

    chrome.storage.local.get(['number_of_tabs'], function(number) {
        if(number.number_of_tabs == undefined){ //Initialize process
            number.number_of_tabs=-1;
        }
        var tmp = number.number_of_tabs+1;
        chrome.storage.local.set({"number_of_tabs":tmp}, function(){});
        alert('Value currently is ' + tmp);
    })

    //Empty input form
    web_link.value = '';
});

//Open on NEW tab
tab_button.addEventListener('click', () => {
    var action_url = link_queue.dequeue();
    if(action_url == undefined){
        var sampleArea = document.getElementById("sampleArea");
        sampleArea.innerHTML = "You have went through everything!"
    }else{
        chrome.tabs.create({ url: action_url });
    }
    // save
});

//Open on CURRENT tab
link_button.addEventListener('click', () => {
    var action_url = link_queue.dequeue();
    if(action_url == undefined){
        var sampleArea = document.getElementById("sampleArea");
        sampleArea.innerHTML = "You have went through everything!"
    }else{
        chrome.tabs.update({ url: action_url });
    }
    // save
});