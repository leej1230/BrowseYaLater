const link_queue = [];

const button = document.querySelector('button');

button.addEventListener('click', event => {
  const web_link = document.getElementById("mytext");
  //mytext is id of input for in html
  link_queue.push(web_link.value);
});