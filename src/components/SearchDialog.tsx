"use client"
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { CommandIcon } from 'lucide-react'
import { useGlobalContext, useGlobalContextUpdate } from '@/lib/globalContext'
import { Command, CommandInput } from './ui/command'

const SearchDialog = () => {
    const { geoCodedList = [], inputValue, handleInput } = useGlobalContext();

    const { setActiveCityCoords } = useGlobalContextUpdate()

    const [hoveredIndex, setHoveredIndex] = useState<number>(0);

    return (
        <div className='search-btn'>
            <Dialog >
                <DialogTrigger asChild>
                    <Button
                        variant={'outline'}
                        className='border group inline-flex items-center justify-center text-sm font-medium hover:dark:bg-accent hover:bg-slate-100 ease-in-out duration-200'
                    >
                        <p className='text-sm text-muted-foreground group-hover:text-primary duration-200'>Search Here...</p>
                        <div className='command bg-accent py-[2px] pl-[5px] pr-[7px] rounded-sm ml-[10rem] flex items-center gap-2'>
                            <CommandIcon />
                            <span className='text-[9px]'>F</span>
                        </div>
                    </Button>
                </DialogTrigger>

                <DialogContent className='p-0'>
                    <Command className='rounded-lg border shadow-md'>
                        <input
                            placeholder='Type a command or search...'
                            value={inputValue}
                            onChangeCapture={handleInput}
                        />
                        <ul className='px-3 pb-2'>
                            <p className='p-2 text-sm text-muted-foreground'>
                                Suggestions
                            </p>
                            {geoCodedList.length === 0 || !geoCodedList && <p>No Results Found</p>}

                            {geoCodedList.map((item, i) => {
                                const { country, name, state } = item;
                                return (
                                    <li
                                        key={i}
                                        onMouseEnter={() => setHoveredIndex(i)}
                                        onClick={() => setActiveCityCoords({ lat: item.lat, lon: item.lon })} // Update the active city coordinates
                                        className={`p-3 px-2 text-sm cursor-default rounded-sm ${hoveredIndex === i ? 'bg-accent' : ''}`}
                                    >
                                        <p className='text'>
                                            {name}, {state ? state + "," : null} {country}
                                        </p>
                                    </li>
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
