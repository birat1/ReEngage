let backAPI
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    backAPI = `http://${window.location.hostname}:8000/`
} else {
    backAPI `http://${window.location.hostname}/`
}

export const backendAPI = backAPI;
