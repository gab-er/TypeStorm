import { UserIcon } from "@heroicons/react/24/outline";
import useAuthStore from "@/app/stores/useAuthStore";

const ProfilePic = ({ profilePic, className = "" }) => {
  if (profilePic) {
    return <img className={className} src={profilePic} />;
  } else {
    return <UserIcon className={className} />;
  }
};

export default ProfilePic;
