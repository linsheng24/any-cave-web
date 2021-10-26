import axios, {AxiosInstance} from "axios";
import Cookies from "js-cookie";

class AuthService {
  public request: AxiosInstance;
  constructor() {
    this.request = axios.create({
      baseURL: 'http://127.0.0.1:3000/auth/'
    });
  }

  private static getAuthHeader = () => {
    const token = Cookies.get('token');
    if (token) {
      return {
        'Authorization': 'Bearer ' + token,
        'Cache-Control': 'no-cache'
      };
    } else {
      return {
        'Cache-Control': 'no-cache'
      };
    }
  }

  public logout = () => {
    Cookies.remove('token')
  }

  public userFetcher = async () => {
      // @ts-ignore
    return this.request({
      method: 'post',
      url: '/profile',
      headers: AuthService.getAuthHeader()
    });
  }

  public login = async (username: string, password: string) => {
    try {
      const response = await this.request.post('/login', {
        username: username,
        password: password
      });
      const { data } = response;
      return data;
    } catch (e) {
      throw new Error("Login error!");
    }
  }


}

export default AuthService;
