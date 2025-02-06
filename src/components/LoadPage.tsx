import NextNProgress from 'nextjs-progressbar';

export default function LoadPage (props: any){

    return (
        <div className='flex w-[100vw] h-[100vh] justify-center items-center'>
        <h1>carregando</h1>
        <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
        </div>
    );
}