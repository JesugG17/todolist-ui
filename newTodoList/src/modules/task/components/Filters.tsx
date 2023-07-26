import { Filter } from "../types/filter.interface";
import { FC } from 'react';

export const Filters: FC<Props> = ({ filter, setFilter }) => {



  return (
    <div className="bg-secondary p-3 text-primary font-bold flex justify-center gap-5 rounded">
      <button
        onClick={() => setFilter({ all: true, type: 'none', value: 'none' })} 
        className={`font-bold shadow hover:brightness-200 ${ filter.all && 'border-b-2 border-b-blue-500 text-blue-500' }`}
      >
        All
      </button>
      <button 
        onClick={() => setFilter({ type: 'completed', value: false, all: false })}
        className={`font-bold shadow hover:brightness-200 ${ !filter.all && !filter.value && 'border-b-2 border-b-blue-500 text-blue-500' }`}
      >
        Active
      </button>
      <button 
        onClick={() => setFilter({ type: 'completed', value: true, all: false })}
        className={`font-bold shadow hover:brightness-200 ${ !filter.all && filter.value && 'border-b-2 border-b-blue-500 text-blue-500' }`}
      >
        Completed
      </button>
    </div>
  );
};

type Props = {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}
