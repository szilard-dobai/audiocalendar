import { useQuery } from "@tanstack/react-query";
import Auth from "./components/Auth";
import ReactQueryProvider from "./components/ReactQueryProvider";
import SpotifyProvider from "./components/SpotifyProvider";
import SupabaseProvider from "./components/SupabaseProvider";
import { useAuth } from "./hooks/useAuth";
import useSupabase from "./hooks/useSupabase";

const A = () => {
  const supabase = useSupabase();
  const { logout } = useAuth();

  const { data } = useQuery({
    queryFn: async () => {
      const { data } = await supabase
        .from("history")
        .select("*")
        .order("playedAt", { ascending: false });

      return data;
    },
    queryKey: ["test2"],
  });

  return (
    <div>
      {data?.map((el) => (
        <div
          key={el.id}
          style={{
            paddingBottom: "1rem",
            marginBottom: "1rem",
            borderBottom: "1px solid black",
          }}
        >
          <p>
            <strong>{el.playedAt}</strong>
            <br />
            <img
              src={el.albumImage}
              width={100}
              height={100}
              style={{ border: "1px solid black" }}
            />
            <br />
            {el.id}, {el.artist}, {el.album}, {el.song}
          </p>
          {el.songPreviewUrl && <audio src={el.songPreviewUrl} controls />}
        </div>
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
