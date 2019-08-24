import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from './pages/main/main';
import Favorites from './pages/favorites/favorites';
import Details from './pages/details/details';
import About from './pages/about/about';

function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/favorites" component={Favorites} />
            <Route path="/details/:id" component={Details} />
            <Route path="/about" component={About} />
        </Switch>
    );
}

export default Routes;