const site = 'http://localhost:8000/'

async function makeUnathenticatedPostRequest(route, body){
    const response = await fetch(site + route, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(body)
    })

    const formattedResponse = await response.json();

    return formattedResponse
}

async function makeGetRequest(route){
    const response = await fetch(site + route, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    const formattedResponse = await response.json();

    return formattedResponse;
}

export {makeUnathenticatedPostRequest,makeGetRequest};