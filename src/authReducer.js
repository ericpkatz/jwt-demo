import axios from 'axios';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

const loginSuccess = (user)=> ({
  type: LOGIN_SUCCESS,
  user
});


const me = ()=> {
  return (dispatch)=> {
    const token = localStorage.getItem('token');
    if(!token)
      return;
    return axios.get(`/api/session/${token}`)
      .then(response => response.data)
      .then( user=> dispatch(loginSuccess(user)));
  };
}

const login = (credentials)=> {
  return (dispatch)=> {
    return axios.post('/api/session', credentials)
      .then(response => response.data)
      .then(data => {
        localStorage.setItem('token', data.token)
        return axios.get(`/api/session/${data.token}`)
      })
      .then(response => response.data)
      .then( user=> dispatch(loginSuccess(user)));
  };
};

export {
  login,
  me
};


const authReducer = (state={ }, action)=> {
  switch(action.type){
    case LOGIN_SUCCESS:
      state = Object.assign({}, state, { user: action.user });
      break;
  }
  return state;
};



export default authReducer;
