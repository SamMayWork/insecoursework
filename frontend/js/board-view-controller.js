let boardid = 'bf35c787';

async function start () {
  posts = await getContent(); 
  generateLists(posts);
}

/**
 * Gets a list of Boards from the server
 */
async function getContent () {
  let response = await fetch(`http://127.0.0.1:8080/get?boardid=${boardid}`, {
    method : 'GET',
  });
  let retData = await response.json();
  return retData;
}

/**
 * Generates a list of boards on the frontend using the template
 */
function generateLists (posts) {
  let container = document.querySelector('.postcontainer');

  // go through each board we've got an create an entry on the dashboard for it

  for (let row of posts) { 
    let divContainer = document.createElement('div');
    divContainer.id = row.post_id;
    divContainer = generateTextElement(row.post_title,divContainer);
    container.appendChild(divContainer);
  }
}


function generateTextElement (text, parent) {
  let element = document.createElement('p');
  element.textContent = text;
  parent.appendChild(element);
  return parent;
}