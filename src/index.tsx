import './styles/style.css';

import React from 'react';
import ReactDOM from 'react-dom';
// import App from './components/App';
import {GameShop} from './pages/gameshop/gameshop';
// import {Inventory} from './pages/inventory/index';
import {mockShopItems} from './mocks/mockShopItems';

ReactDOM.render(<GameShop clothes={mockShopItems}/>, document.getElementById('app'));
