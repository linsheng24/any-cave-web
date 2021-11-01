import useSWR from "swr";
import UserService from "../../services/auth-service";

export default function useUser() {
  const userService = new UserService();
  const userFetcher = userService.userFetcher;
  const { data, mutate, error } = useSWR("user", userFetcher, { refreshInterval: 60000 });
  // @ts-ignore
  const loading = Boolean((data === 'login' || data === 'logout'));
  const user = data && !error ? data.data : null;
  return { user: user, mutate, loading, error };
}
