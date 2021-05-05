import React, {Component} from 'react';

import './errorBoundary.css'

export class ErrorBoundary extends Component< {},{hasError: boolean}> {
    constructor(props: {children: React.ReactChild}) {
        super(props);
        this.state = { hasError: false };
      }

      static getDerivedStateFromError() {
        return { hasError: true };
      }
    
      render() {
        if (this.state.hasError) {
          return <h1 className="ma-16">Что-то пошло не так.</h1>;
        }
    
        return this.props.children; 
      }
}