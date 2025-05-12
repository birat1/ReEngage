let bAPI;
if (window.location.hostname === 'localhost') {
    bAPI = `http://${window.location.hostname}:8000/`;
} else {
    bAPI = `http://django:8000/`;
}

export const backendAPI = bAPI;
