
export const Google = () => {
  return (
    <img className="w-8 h-8" src="/img/googleIcon.svg" alt="Google Icon" />
  )
}

export const Cross = () => {
  return (
    <img className='w-3 h-3 hover:brightness-200' src="/img/icon-cross.svg" alt="Cross Icon" />
  )
}

export const Completed = () => {
  return (
    <picture className="bg-gradient-to-r from-blue-300 to-violet-500 w-full h-full rounded-full flex justify-center items-center">
      <img className="w-2 h-2 lg:w-3 lg:h-3 object-contain "  src="/img/icon-check.svg" alt="Completed Icon" />
    </picture>
  )
}

export const UploadPhoto = () => {
  return (
    <picture className="flex flex-col items-center">
      <img className="w-8 h-8 md:w-10 md:h-10 object-contain hover:brightness-150 transition-all duration-300" src="/img/gallery.png" alt="Upload Icon" />
      <p className="text-gray-500 text-xs">Upload photo</p>
    </picture>
  )
}

export const UpdateIcon = () => {
  return (
    <img className="w-6 h-6" src="/img/pencil.png" alt="Update Icon" />
  )
}

export const CancelUpdateIcon = () => {
  return (
    <img
      className="w-5 h-5" 
      src="/img/cancel.png" 
      alt="Cancel Icon" 
    />
  )
}
