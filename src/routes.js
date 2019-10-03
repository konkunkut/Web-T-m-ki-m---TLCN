import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from './component/Home';
import Place from './component/Place';
import News from './component/News';
import Contact from './component/Contact';

const Routing = () =>(
    <div>
    <Switch>
    <Route exact path="/" component={Home} label="Trang chủ"/>
        <Route path="/places" component={Place}/>
        <Route path="/news" component={News} />
        <Route path="/contact" component={Contact} />
    
    </Switch>
    </div>
)
export default Routing;