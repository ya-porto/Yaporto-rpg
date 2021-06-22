import React from 'react';
import { useSelector } from 'react-redux'
import {NavLink} from 'react-router-dom';

import {RootState} from '../../redux/types';
import {ROUTES} from '../../client/routes';
import './menu.css';

export function Menu() {
	const isAuth = useSelector((state: RootState) => state.user.isAuth);

	const routes = Object.values(ROUTES).filter(path => !path.hasOwnProperty('AUTH') || path['AUTH'] === isAuth)
	return (
		<div className="menu absolute d-flex justify-center align-center">
			<ul className="d-flex justify-space-around">
				{
					routes.map(({NAME, INDEX}, i) => (
						<li key={i} className='mr-2'>
							<NavLink className='menu_link d-flex justify-center align-center' to={INDEX}><span className='menu-link-inner'>{NAME}</span></NavLink>
						</li>
					))
				}
			</ul>
		</div>
	);
}
