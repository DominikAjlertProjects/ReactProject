export default function authenticate(isLogged) {
    return {
        type: 'CHANGE_AUTH',
        payload: isLogged
    };
}
