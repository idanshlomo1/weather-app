"use client"
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger, DialogClose } from './ui/dialog'
import { Button } from './ui/button'
import { CommandIcon } from 'lucide-react'
import { useGlobalContext, useGlobalContextUpdate } from '@/lib/globalContext'
import { Command, CommandGroup, CommandInput } from './ui/command'
import { Input } from './ui/input'

const SearchDialog = () => {
    const { geoCodedList = [], inputValue, handleInput } = useGlobalContext();

    const { setActiveCityCoords } = useGlobalContextUpdate()

    return (
        <div className='search-btn'>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant={'outline'}
                        className='border group inline-flex items-center justify-center text-sm font-medium hover:dark:bg-accent hover:bg-slate-100 ease-in-out duration-200'
                    >
                        <p className='text-sm text-muted-foreground group-hover:text-primary duration-200'>Search Here...</p>
                        <div className='command  py-[2px] pl-[5px] pr-[7px] rounded-sm ml-[10rem] flex items-center gap-2'>
                            {/* <CommandIcon />
                            <span className='text-[9px]'>F</span> */}
                        </div>
                    </Button>
                </DialogTrigger>

                <DialogContent className='p-0'>
                    <Command className='rounded-lg border shadow-md'>
                        <input
                            className="px-4 flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder='Search a location...'
                            value={inputValue}
                            onChangeCapture={handleInput}
                        />

                        <ul className='px-3 pb-2'>
                            <p className='p-2 text-sm text-muted-foreground'>
                                Suggestions
                            </p>
                            {geoCodedList.length === 0 && <p>No Results Found</p>}

                            {geoCodedList.map((item, i) => {
                                const { country, name, state } = item;
                                return (
                                    <DialogClose asChild key={i}>
                                        <li
                                            onClick={() => setActiveCityCoords({ lat: item.lat, lon: item.lon })} // Update the active city coordinates
                                            className={`p-3 px-2 text-sm cursor-pointer rounded-sm hover:bg-accent`}
                                        >
                                            <p className='text'>
                                                {name}, {state ? state + "," : null} {country}
                                            </p>
                                        </li>
                                    </DialogClose>
                                )
                            })}
                        </ul>

                    </Command>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SearchDialog;
