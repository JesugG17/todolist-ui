import { FC } from 'react';

export const AuthLayout: FC<Props> = ({ children, title }) => {
  return (
    <section className='w-full h-screen bg-background flex justify-center items-center'>
        <div className='w-3/4 relative md:w-2/4 lg:w-2/5 xl:w-1/4 rounded flex flex-col p-6 bg-background-light gap-5'>
            <h4 className='text-violet-500 font-bold text-xl mb-3'>{ title }</h4>
            { children}
        </div>
    </section>
  )
}

type Props = {
    children: React.ReactNode;
    title: string;
}
