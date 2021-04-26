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
       
        if(props.mass != []){
            props.mass.forEach((element:elementMass) => {
                const ctx = this.refs.canvas.getContext('2d');
                const image = element.image;
                image.width = element.image.width;
                image.height = element.image.height;
    
                setTimeout(() => {
                    if(ctx){
                        ctx.beginPath();
                        ctx.drawImage(image, element.start_x, element.start_y, image.width, image.height)
                        ctx.closePath();
                    }
                })
            })
        }
      
    }

    render() {
        return (
            <canvas 
                ref="canvas" 
                id="canvas"
                style={{ 
                    backgroundImage: 'url(' + this.props.image.src + ')',
                }} 
                width={this.props.x_p} 
                height={this.props.y_p}>
            </canvas>
        );
    }
    
}
