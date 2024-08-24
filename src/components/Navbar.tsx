"use client"
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { Github } from 'lucide-react'
import { ModeToggle } from './ModeToggle'
import SearchDialog from './SearchDialog'

const Navbar = () => {
    const router = useRouter()
    return (
        <div className='w-full py-4 flex items-center justify-between'>
            <div className="left">

            </div>
            <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
                <SearchDialog />
                <div className="btn-group flex items-center gap-2">

                    <ModeToggle />
                    <Button onClick={() => router.push("https//github.com")} className='source-code flex items-center gap-2'>
                        <Github /> Source Code
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
