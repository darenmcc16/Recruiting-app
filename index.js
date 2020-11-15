'use strict';

const apiKey =  "MDEwOlJlcG9zaXRvcnkxMjk2MjY5";

const searchUrl = "https://api.github.com/users/USERNAME/repos";

function findQueryParams(params){
    console.log(params);
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems;
}

function displayResults(responseJson){
    console.log(responseJson);
    $('#results-list').empty()

    for(let i=0; i < responseJson.length; i++){
        $('#results-list').append(`<li><h3><a href="${responseJson[i].url}"</a>${responseJson[i].name}</h3></li>`);
    }
}

function getUserRepos(query){
    const params = {
        q:query
    }
    const queryString = findQueryParams(params);
    const url = `https://api.github.com/users/${query}/repos`

    console.log(url);

    const options = {
        headers: new Headers({
            "Accept": apiKey
        })
    }
    fetch(url, options)
    .then(response => {
        if (response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then (responseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`)
    })
}

function watchForm(){
    $('form').submit(event =>{
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        getUserRepos(searchTerm);
    })
}

$(watchForm);