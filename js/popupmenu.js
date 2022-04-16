const link_queue = [];

const submit_button = document.querySelector('submit_button');
const tab_button = document.querySelector('open_button');
const link_button = document.querySelector('link_button');

submit_button.addEventListener('click', event => {
  const web_link = document.getElementById("mytext");
  //mytext is id of input for in html
  link_queue.push(web_link.value);
});

tab_button.addEventListener('click', event => {
  var action_url = link_queue.pop;
  chrome.tabs.create({ url: action_url });
});

link_button.addEventListener('click', event => {
  var action_url = link_queue.pop;
  location = action_url;
});
