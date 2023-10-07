import { getCurrentUser } from "../me/getCurrentUser";
import ManageAccount from "./(components)/ManageAccount";

const SettingsPage = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <ManageAccount initialData={user} />
    </>
  );
};

export default SettingsPage;
