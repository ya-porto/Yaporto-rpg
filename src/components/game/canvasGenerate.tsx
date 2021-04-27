import React, {PureComponent} from 'react';


interface elementMass{
    image: HTMLImageElement;
    start_x: number;
    start_y: number;
}


interface props{
    x_p: number;
    y_p: number;
    image: HTMLImageElement;
    mass: Array<elementMass>;
}



export default class GameCanvas extends PureComponent<props>{
    
    constructor(props: props){
        super(props);
      
    }

    render() {
        return (
            <canvas 
                ref="canvas" 
                id="canvas"
                style={{ 
                    backgroundImage: 'url(' + this.props.image.src + ')',
                    backgroundSize: 'cover'
                }} 
                width={this.props.x_p} 
                height={this.props.y_p}>
            </canvas>
        );
    }
    
}
