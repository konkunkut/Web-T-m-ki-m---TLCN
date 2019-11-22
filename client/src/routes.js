import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from './component/Home';
import Place from './component/Place';
import News from './component/News';
import Contact from './component/Contact';

import PlacesDetail from './component/DetailPage/Places-Detail';
import BlogsDetail from './component/DetailPage/Blogs-Detail';
import CusProfile from './component/DetailPage/CustommerPage';

const Routing = () =>(
    <div>
    <Switch>
    <Route exact path="/" component={Home} label="Trang chủ"/>
        <Route path="/places" component={Place}/>
        <Route path="/news" component={News} />
        <Route path="/contact" component={Contact} />

        <Route path="/detailPlaces/:name" component={PlacesDetail} />
        <Route path="/detailBlogs/:name" component={BlogsDetail} />
        <Route path="/profile/:id" component={CusProfile} />
    </Switch>
    </div>
)
export default Routing;