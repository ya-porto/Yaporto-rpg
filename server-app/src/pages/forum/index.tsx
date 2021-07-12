import React, {Component} from 'react';

import Threads from './forum';
import Thread from './ thread';




class Forum extends Component<{thread?: string | null}> {
    render() {
        return (
            <div>
                {
                    this.props.thread ? <Thread /> : <Threads/>
                }
            </div>
        )
    }
}

export {Forum, Threads}

