import { useRef, ChangeEvent, useEffect, useState } from 'react';
import { useAuthUserStore } from "../../../store/auth/authUserStore";
import { useUIStore } from "../../../store/ui/uiStore";
import { CancelUpdateIcon, Cross, UpdateIcon, UploadPhoto } from "../../ui/Icons";
import { handleDeleteUser } from "../utils/display-alert-message";

export const ModalProfile = () => {
  const { user, updateProfilePhoto, setChecking, checking, deleteProfile, updateUserName } = useAuthUserStore();
  const { closeModal } = useUIStore();
  const uploadPhotoInputRef = useRef<HTMLInputElement>(null);
  const userNameInputRef = useRef<HTMLInputElement>(null);
  const [isInputActive, setIsInputActive] = useState(false);
  const [newUserName, setNewUserName] = useState(user.userName);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const [file] = files;
    setChecking();
    await updateProfilePhoto(file);
  };

  useEffect(() => {
    setChecking(false);
  }, []);

  useEffect(() => {
    if (isInputActive) userNameInputRef.current?.focus();
  }, [isInputActive]);


  
  return (
    <div className="absolute w-full min-h-screen bg-background-light bg-opacity-60 flex items-center justify-center z-40">
      <div className="bg-background w-3/4 flex flex-col md:w-2/5 xl:w-1/4 h-2/4 p-5 rounded-md">
        <div className="flex">
          <h3 className="text-center text-white font-medium text-2xl flex-1">
            PROFILE
          </h3>
          <button onClick={closeModal}>
            <Cross />
          </button>
        </div>
        <div className="flex flex-col gap-5">
          <picture className="relative flex flex-col gap-3 items-center self-center p-5 border-b-2 border-b-gray-600">
            {checking ? (
              <img
                className="w-8 h-8 animate-spin invert"
                src="/img/loading.png"
                alt="Loading"
              />
            ) : (
              <img
                className="rounded-full w-20 h-20"
                src={user.photo}
                alt={`${user.userName} photo`}
              />
            )}
            <button
              disabled={checking}
              onClick={() => uploadPhotoInputRef.current?.click()}
              className="flex justify-center disabled:pointer-events-none"
            >
              <UploadPhoto />
            </button>
            <input
              ref={uploadPhotoInputRef}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
          </picture>
          <footer className="text-white text-xs md:text-base flex flex-col gap-5 p-5 ">
            <div className="flex flex-col gap-2 border-b-2 border-b-gray-700 mb-1">
              <strong className="text-violet-500">Email</strong>
              <p>{user.email}</p>
            </div>
            <div className="flex flex-col gap-2 border-b-2 border-b-gray-700 mb-1">
              <div className="flex gap-3 items-center">
                <strong className="text-violet-500">Username</strong>
                <button
                  onClick={() => {
                    setIsInputActive(!isInputActive);
                    setNewUserName(user.userName);
                  }} 
                  className="hover:brightness-125 transition-all duration-200"
                >
                  {
                    isInputActive
                    ? <CancelUpdateIcon />
                    : <UpdateIcon />
                  }
                </button>
              </div>
              <form
                className='flex justify-between' 
                onSubmit={(event) => {
                  event.preventDefault();
                  if (newUserName.length === 0) return;
                  updateUserName(newUserName);
                  setIsInputActive(false);
                }}
              >
                <input
                  onFocus={(event) => event.target.select()}
                  ref={userNameInputRef}
                  className="bg-transparent focus:outline-none" 
                  value={newUserName}
                  onChange={(event) => setNewUserName(event.target.value)}
                  type="text" 
                  disabled={!isInputActive}
                />
                {
                  isInputActive &&
                  <button
                    type='submit' 
                    className='bg-violet-500 opacity-60 p-1 rounded font-medium hover:brightness-125 transition-all duration-200'
                  >
                    update
                  </button>
                }
              </form>
            </div>
            <button
              onClick={async () => {
                const isConfirmed = await handleDeleteUser();
                console.log(isConfirmed);
                if (isConfirmed) deleteProfile();
              }}
              className="bg-red-600 p-2 rounded w-3/4 md:w-3/5 lg:w-2/4 xl:w-3/5 self-center font-medium hover:brightness-125 transition-all duration-200"
            >
              Delete account
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};
