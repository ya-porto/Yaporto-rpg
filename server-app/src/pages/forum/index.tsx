import React from 'react'

import Threads from './forum';
import Thread from './ thread';


export function Forum ( {thread}: {thread: string | null} ) {
    return (
        <>
            {
                thread ? Thread : Threads
            }
        </>
    )
}

