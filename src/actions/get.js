import fetch from 'cross-fetch';

// Credit to @ramzallan in tonic

export const REQUEST_DATABASES = 'REQUEST_DATABASES';
export const RECEIVE_DATABASES = 'RECEIVE_DATABASES';

export function requestDatabases() {
    return {
        type: REQUEST_DATABASES,
    };
}


export function receiveDatabases(json) {
    return {
        type: RECEIVE_DATABASES,
        databases: json,
        receivedAt: Date.now(),
    };
}

export function GET(access_token, route) {
    return fetch(process.env.REACT_APP_API_ROUTE + route, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': 'Bearer ' + access_token,
        },
    });
}

export function fetchDatabases(dispatch, access_token) {
    dispatch(requestDatabases());
    return GET(access_token, '/databases')
        .then(response => response.json())
        .then(json => dispatch(receiveDatabases(json)));
}