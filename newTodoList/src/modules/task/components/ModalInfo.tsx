import { useRef, ChangeEvent } from 'react';
import { useAuthStore } from "../../../store/auth/authStore";
import { useUIStore } from "../../../store/ui/uiStore";
import { Cross, UploadPhoto } from "../../ui/Icons";

export const ModalInfo = () => {

  const { user, updateProfilePhoto } = useAuthStore();
  const uploadPhotoInputRef = useRef<HTMLInputElement>(null);
  const { isModalOpen, closeModal } = useUIStore();

  const handleChange = async(event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    if (!event.target.files) return;
    const [ file ] = event.target.files;
    await updateProfilePhoto(file);
  }

  if (!isModalOpen) {
    return <></>;
  }
  return (
    <div className="absolute w-full min-h-screen bg-background-light bg-opacity-60 flex items-center justify-center z-40">
      <div className="bg-background w-3/4 flex flex-col md:w-2/5 xl:w-1/5 h-2/4 p-5 rounded-md">
        <div className="flex">
          <h3 className="text-center text-white font-medium text-2xl flex-1">
            INFO
          </h3>
          <button onClick={closeModal}>
            <Cross />
          </button>
        </div>
        <div className="flex flex-col gap-5">
          <picture className="relative flex flex-col gap-3 self-center p-5 border-b-2 border-b-gray-600">
            <img
              className="rounded-full w-20 h-20"
              src={user.photo}
              alt={`${user.userName} photo`}
            />
            <button
              onClick={() => uploadPhotoInputRef.current?.click()} 
              className="flex justify-center"
            >
              <UploadPhoto />
            </button>
            <input
              ref={uploadPhotoInputRef} 
              className="hidden" 
              type="file"
              accept="image/jpga"
              onChange={handleChange}

            />
          </picture>
          <footer className="text-white text-xs md:text-base flex flex-col gap-5 p-5 ">
            <div className="flex flex-col gap-2 border-b-2 border-b-gray-700 mb-1">
              <strong className="text-violet-500">Email</strong>
              <p>{user.email}</p>
            </div>
            <div className="flex flex-col gap-2 border-b-2 border-b-gray-700 mb-1">
              <strong className="text-violet-500">Username</strong>
              <p>{user.userName}</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
