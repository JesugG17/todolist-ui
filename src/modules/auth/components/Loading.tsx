
export const Loading = () => {
  return (
    <div className="absolute bg-black top-0 left-0 h-full w-full p-7 bg-opacity-30 rounded  flex items-center justify-center">
        <img 
            className="animate-spin w-10 h-10 invert"
            src="/img/loading.png"
            alt="Loading icon"
        />  
    </div>
  )
}
