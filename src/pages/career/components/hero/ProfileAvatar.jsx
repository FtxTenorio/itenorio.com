import { PROFILE_IMAGE_URL } from "../../../../data/config";

export const ProfileAvatar = () => (
  <img
    src={PROFILE_IMAGE_URL}
    alt="Paulo Tenório"
    width="144"
    height="144"
    className="w-36 h-36 mb-6 rounded-full object-cover border-4 border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)] bg-white/5"
  />
);
