import React, {Component} from 'react';

import './errorBoundary.css'


export class ErrorBoundary extends Component< {},{error: null | Error}> {
    constructor(props: {children: React.ReactChild}) {
        super(props);
        this.state = { error: null };
      }

      static getDerivedStateFromError(error: Error) {
        return { error: error };
      }

      componentDidCatch(error: Error) {
        this.setState({
          error: error,
        })
      }
    
      render() {
        if (this.state.error) {
          return <h1 className="ma-16">Что-то пошло не так.</h1>;
        }
    
        return this.props.children; 
      }
}