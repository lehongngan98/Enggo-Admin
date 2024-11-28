import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div 
      // className='h-screen flex justify-center items-center' 
      style={{
        // width: '200vh',
        height: '100vh',        
        display: 'flex',  // thêm display:flex để hỗ trợ justifyContent và alignItems
        justifyContent: 'center', // canh giữa theo chiều ngang
        alignItems: 'center' // canh giữa theo chiều dọc
      }}
    >
      <SignIn />
    </div>
  )
}
