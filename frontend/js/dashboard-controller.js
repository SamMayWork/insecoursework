let boards;

async function start () {
  boards = await getContent(); 
  generateLists(boards);
}

/**
 * Gets a list of Boards from the server
 */
async function getContent () {
  let response = await fetch('http://127.0.0.1:8080/get?all=1', {
    method : 'GET',
  });
  let retData = await response.json();
  return retData;
}

/**
 * Generates a list of boards on the frontend using the template
 */
function generateLists (boardlist) {
  let container = document.querySelector('#boardcontainer');

  // go through each board we've got an create an entry on the dashboard for it

  for (let row of boardlist) {  
    let divContainer = document.createElement('div');
    divContainer.id = row.board_id;
    divContainer.classList.add('boardtemplate');
    let module = document.createElement('p');
    module.textContent = row.board_module;
    let year = document.createElement('p');
    year.textContent = row.board_year;

    let open = document.createElement('button');
    open.textContent = 'Open';
  
    divContainer.appendChild(module);
    divContainer.appendChild(year);
    divContainer.appendChild(open);

    container.appendChild(divContainer);
  }
}