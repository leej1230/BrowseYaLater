function Queue() {
	this.__a = new Array();
}
Queue.prototype.enqueue = function(o) {
	this.__a.push(o);
}
Queue.prototype.dequeue = function() {
	if( this.__a.length > 0 ) {
		return this.__a.shift();
	}
	return null;
}

var link_queue = new Queue();

const submit_button = document.getElementById('submit_button');
const tab_button = document.getElementById('open_button');
const link_button = document.getElementById('link_button');

//Sending a Link to Queue
submit_button.addEventListener('click', () => {
    const web_link = document.getElementById("mytext");
    link_queue.enqueue(web_link.value);
    //Empty input form
    web_link.value = '';

    // save
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