import AuthorizeGoogleButton from "./(components)/AuthorizeGoogleButton";
import AuthorizeSpotifyButton from "./(components)/AuthorizeSpotifyButton";

const Account = async () => {
  return (
    <>
      Account page
      <AuthorizeGoogleButton />
      <AuthorizeSpotifyButton />
    </>
  );
};

export default Account;
