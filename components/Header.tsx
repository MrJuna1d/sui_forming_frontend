import React from 'react'
import { Button } from './ui/button'

const Header = () => {
  return (
    <header>
        <div className='flex justify-between px-5 py-5'>
            <div>
                <h1>📜 Forming</h1>
            </div>
            <div className='flex space-x-5'>
                <Button>Creator Login</Button>
                <Button>Participant Login</Button>
            </div>
        </div>

    </header>
  )
}

export default Header
