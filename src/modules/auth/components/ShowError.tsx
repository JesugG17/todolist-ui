import { FC } from 'react';

export const ShowError: FC<Props> = ({ error }) => {
  return (
    <div className="text-center bg-red-500 p-2 bg-opacity-70 text-white font-medium rounded">
        <span>{ error  }</span>
    </div>
  )
}

type Props = {
    error:  string;
}
