import Logout from "./(components)/LogoutButton";
import ManageAccount from "./(components)/ManageAccount";
import SongHistory from "./(components)/SongHistory";
import { getCurrentUser } from "./me/route";

const Account = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <div className="flex justify-end gap-3 mb-6">
        <ManageAccount user={user} />
        <Logout />
      </div>
      <SongHistory />
    </>
  );
};

export default Account;
