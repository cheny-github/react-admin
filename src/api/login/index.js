import ajax from '../ajax';

function requestLogin(username,password){
    return  ajax.post('/login',
                {username,password}
            )
}

export {requestLogin}