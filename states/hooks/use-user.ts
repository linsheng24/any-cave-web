import useSWR from "swr";
import AuthService from "../../services/auth-service";

export default function useUser() {
  const authService = new AuthService();
  const userFetcher = authService.userFetcher;
  const { data, mutate, error } = useSWR("user", userFetcher, { refreshInterval: 60000 });
  // @ts-ignore
  const loading = Boolean((data === 'login' || data === 'logout'));
  const user = data && !error ? data.data : null;
  return { user: user, mutate, loading, error };
}
