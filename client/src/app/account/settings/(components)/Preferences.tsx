import Heading from "@/components/Heading";
import useToggleEmailNotifications from "@/hooks/useToggleEmailNotifications";
import Switch from "react-switch";

type Props = {
  emailNotifications: boolean;
  className?: string;
};

const Preferences = ({ emailNotifications, className = "" }: Props) => {
  const { mutate, isPending } = useToggleEmailNotifications();

  return (
    <div
      className={`flex flex-row items-center justify-between gap-3 ${className}`}
    >
      <div>
        <Heading level={4}>Email Notifications</Heading>
        <p className="mb-3">
          Do you want to receive notifications via email? Currently turned{" "}
          {emailNotifications ? "on" : "off"}.
        </p>
      </div>
      <Switch
        disabled={isPending}
        checked={emailNotifications}
        onChange={(checked) => mutate({ areOn: checked })}
        checkedIcon={false}
        uncheckedIcon={false}
        onColor="#17bf3e"
      />
    </div>
  );
};

export default Preferences;
