class TokenService {
    static getToken() {
      return localStorage.getItem('jwt');
    }
  
    static setToken(token: string) {
      localStorage.setItem('jwt', token);
    }
  
    static clearToken() {
      localStorage.removeItem('jwt');
      localStorage.removeItem("user");
    }
  }
  
  export default TokenService;
  