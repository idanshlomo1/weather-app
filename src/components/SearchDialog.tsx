"use client"
import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { CommandIcon } from 'lucide-react'
import { Command, CommandInput } from './ui/command'

const SearchDialog = () => {
    return (
        <div className='search-btn'>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant={'outline'}
                        className='border group inline-flex items-center justify-center text-sm font-medium hover:dark:bg-[#131313] hover:bg-slate-100  ease-in-out duration-200'
                    >
                        <p className='text-sm text-muted-foreground group-hover:text-primary duration-200'>Search Here...</p>
                        <div className='command dark:bg-[#262626] bg-slate-200  py-[2px] pl-[5px] pr-[7px] rounded-sm ml-[10rem] flex items-center gap-2'>
                            <CommandIcon />
                            <span className='text-[9px]'>F</span>
                        </div>
                    </Button>
                </DialogTrigger>

                <DialogContent className='p-0'>
                    <Command className='rounded-lg border shadow-md'>
                        <CommandInput placeholder='Type a command or search...' />
                        <ul className='px-3 pb-2 '>
                            <p className='p-2 text-sm text-muted-foreground'>
                                Suggestions
                            </p>
                        </ul>
                    </Command>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default SearchDialog
