import React from 'react'
import { Button } from './ui/button'

const Header = () => {
  return (
    <header className='sticky top-0 left-0 w-full transparent z-50'>
        <div className='flex justify-between px-5 py-5'>
            <div>
                <h1 className='font-bold text-3xl'>📜 FormCraft</h1>
            </div>
            <div className='flex space-x-5'>
                <Button className='w-[150px]'>Creator Login</Button>
                <Button className='w-[150px]'>Participant Login</Button>
            </div>
        </div>

    </header>
  )
}

export default Header
