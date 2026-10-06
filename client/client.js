// Handles the response
// Dynamicaly renders html on the page with
// data recived in the response
const handleResponse = async (res) => {
    const content = document.querySelector('#content');
    // Display message for status code
    switch (res.status) {
        case 200:
            content.innerHTML = `<b>Success</b>`;
            break;
        case 201:
            content.innerHTML = '<b>Created</b>';
            break;
        case 204:
            content.innerHTML = '<b>Updated (No Content)</b>';
            return;
        case 404:
            content.innerHTML = `<b>Not Found</b>`;
            break;
        default:
            content.innerHTML = `Error code not implemented by client.`;
            break;
    }

    // Bail if a HEAD request (ie no response body)
    // no need to get and parse json when it doesnt exist
    if (!res.body) return;

    // Get response json and display message
    let json = await res.json();
    if (json.message) {
        content.innerHTML += `<p>${JSON.stringify(json.message)}</p>`;
    }
}


const init = () => {
    // Form for addUser
    // On submit, sends a POST request with the form data to the server,
    // then passes the response to handleResponse
    document.querySelector('#nameForm').onsubmit = (e) => {
        e.preventDefault();
        const url = `/addUser?name=${document.querySelector('#nameField').value}&age=${document.querySelector('#ageField').value}`;
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        fetch(url, params).then(r => handleResponse(r));
        return false;
    }

    // Form for getUsers & notReal
    // On submit, sends a GET or HEAD request based on the form data to the server,
    // then passes the response to handleResponse
    document.querySelector('#userForm').onsubmit = (e) => {
        e.preventDefault();
        const url = document.querySelector('#urlField').value;
        const params = {
            method: document.querySelector('#methodSelect').value,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        fetch(url, params).then(r => handleResponse(r));
        return false;
    };
}

window.onload = init;