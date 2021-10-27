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
    const token = Cookies.get('access_token');
    if (token) {
      return {
        'Authorization': 'Bearer ' + token,
      };
    } else {
      return {};
    }
  }

  public logout = () => {
    Cookies.remove('access_token')
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
      if (data) {
        const access_token = data.data.access_token;
        Cookies.set('access_token', access_token);
      }
      return data;
    } catch (e) {
      return new Error("Login error!");
    }
  }


}

export default AuthService;
