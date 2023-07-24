export const Filters = () => {



  return (
    <div className="bg-secondary p-3 text-primary font-bold flex justify-center gap-5 rounded">
      <button className="text-blue-500 font-bold shadow border-b-2 border-b-blue-500 hover:brightness-200">
        All
      </button>
      <button className="hover:brightness-200">Active</button>
      <button className="hover:brightness-200">Completed</button>
    </div>
  );
};
