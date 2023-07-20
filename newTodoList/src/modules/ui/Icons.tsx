
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
      <img className="w-2 h-2 object-contain "  src="/img/icon-check.svg" alt="Completed Icon" />
    </picture>
  )
}
