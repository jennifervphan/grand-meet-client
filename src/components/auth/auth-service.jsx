import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API}`,
      withCredentials: true
    });
    this.service = service;
  }

  signup = (form) => {
    return axios({
      method:"POST",
      baseURL:`${process.env.REACT_APP_API}/signup`,
      withCredentials: true,
      data:form
    })
    .then(response => {
      this.setUser(response.data)
      return response.data    
    })
  }

  loggedin = () => {
    return this.service.get('/loggedin')
    .then(response => response.data)
  }
  
  login = 
  // (username,password) => {
  //   return axios({
  //     method:"POST",
  //     baseURL: `http://localhost:5000/api/login`,
  //     withCredentials: true,
  //   })
  (username, password, coordinates) => {
    return this.service.post('/login', {username, password, coordinates})
    .then(response => {
      this.setUser(response.data)
    return response.data})     
  }

  setUser(user){
    localStorage.setItem('user', JSON.stringify(user));
}

// getUser(){
//   return JSON.parse(localStorage.getItem('user'));
// }

  logout = () => {
    return this.service.post('/logout', {})
    .then(() => {
      localStorage.removeItem('user');
    })
  }
}

export default AuthService;