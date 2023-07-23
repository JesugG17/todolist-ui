import { useAuthStore } from "../../../store/auth/authStore";
import { useUIStore } from "../../../store/ui/uiStore";
import { Cross } from "../../ui/Icons";

export const ModalInfo = () => {
  const user = useAuthStore((state) => state.user);
  const { isModalOpen, closeModal } = useUIStore();

  if (!isModalOpen) {
    return <></>;
  }

  return (
    <div className="absolute w-full min-h-screen bg-background-light bg-opacity-60 flex items-center justify-center z-40">
      <div className="bg-background w-3/4 flex flex-col md:w-2/5 xl:w-1/5 h-2/4 p-5 rounded-md">
        <div className="flex">
          <h3 className="text-center text-white font-medium text-2xl flex-1">
            Info
          </h3>
          <button onClick={closeModal}>
            <Cross />
          </button>
        </div>
        <div className="flex flex-col gap-5">
          <picture className="relative flex flex-col gap-3 self-center p-10 border-b-2 border-b-gray-600">
            <img
              className="rounded-full"
              src={user.photo}
              alt={`${user.userName} photo`}
            />
            <button className="border-2 text-xs md:text-base border-white p-2 text-white font-medium hover:bg-white hover:text-black transition-all duration-200 rounded-md">
              Upload image
            </button>
          </picture>
          <footer className="text-white text-xs md:text-base flex flex-col gap-5 p-5 ">
            <div className="flex flex-col gap-2 border-b-2 border-b-gray-700 mb-1">
              <strong className="text-orange-500">Email</strong>
              <p>{user.email}</p>
            </div>
            <div className="flex flex-col gap-2 border-b-2 border-b-gray-700 mb-1">
              <strong className="text-orange-500">Username</strong>
              <p>{user.userName}</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
