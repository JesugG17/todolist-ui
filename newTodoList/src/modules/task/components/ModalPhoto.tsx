import { useAuthStore } from "../../../store/auth/authStore";
import { useUIStore } from "../../../store/ui/uiStore";

export const ModalPhoto = () => {
  const { photo, userName } = useAuthStore();
  const { isModalOpen, closeModal } = useUIStore();

  if (!isModalOpen) {
    return <></>;
  }

  return (
    <div
        onClick={closeModal} 
        className="absolute w-full min-h-screen bg-background-light bg-opacity-60 flex items-center justify-center z-50 cursor-pointer "
    >
      <picture className="w-1/4 h-2/4 rounded-full bg-black">
        <img
          className="w-full h-full rounded-full opacity-100 object-contain"
          src={`${photo ? photo : "/img/user.png"}`}
          alt={`${userName} photo`}
        />
      </picture>
    </div>
  );
};
