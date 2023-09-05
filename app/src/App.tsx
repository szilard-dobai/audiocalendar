import { useQuery } from "@tanstack/react-query";
import Auth from "./components/Auth";
import ReactQueryProvider from "./components/ReactQueryProvider";
import { useSpotify } from "./hooks/useSpotify";
import SpotifyProvider from "./components/SpotifyProvider";
import { useAuth } from "./hooks/useAuth";
import SupabaseProvider from "./components/SupabaseProvider";

const A = () => {
  const x = useSpotify();
  const { logout } = useAuth();

  const { data } = useQuery({
    queryFn: async () => {
      return x.player.getRecentlyPlayedTracks();
    },
    queryKey: ["test"],
  });

  return (
    <div>
      {data?.items.map((el) => (
        <p key={el.played_at + el.track.id}>
          {el.track.id}, {el.track.name}, {el.track.artists[0].name}
        </p>
      ))}

      <button onClick={() => logout()}>log out</button>
    </div>
  );
};

const App = () => {
  return (
    <ReactQueryProvider>
      <SupabaseProvider>
        <Auth>
          <SpotifyProvider>
            <A />
          </SpotifyProvider>
        </Auth>
      </SupabaseProvider>
    </ReactQueryProvider>
  );
};

export default App;
