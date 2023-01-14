import React from 'react';
import { useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';

function Routes() {
    const routes = Object.values(useSelector(state => state.routes))

    return (
        <div>
            {routes.map(route => {
                return (
                    <li key={route.id}>
                        <NavLink to={`/routes/${route.id}`}>{route.title}</NavLink>
                    </li>
                )
            })}
        </div>
    )
}

export default Routes
