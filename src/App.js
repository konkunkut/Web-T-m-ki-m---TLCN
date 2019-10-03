import React from 'react';
import logo from './logo.svg';
import './App.scss';

import {Router} from 'react-router-dom';
import Routing from './routes';

import MyHeader from './Layout/Header';
import MyFooter from './Layout/Footer';
import history from './history';

import { Layout } from 'antd';
const { Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout className="layout">
        <Router history={history}>
        <MyHeader/>
          <Content className="Content-app">
            <div>
              <Routing />
            </div>
          </Content>
        <MyFooter/>
        </Router>
      </Layout>

    </div>
  );
}

export default App;
