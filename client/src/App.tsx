import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// @ts-ignore
import ReactNotification from 'react-notifications-component'

// CSS
import './App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import 'react-notifications-component/dist/theme.css'

// Components
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Home } from "./components/home/Home";
import { Boats } from "./components/boats/Boats";

const App: React.FC = () => {
  return (
    <Router>
        <ReactNotification />
        <Navbar />

        <section className={'container'}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/boats" component={Boats} />
                <Route exact path="/contact" component={Home} />
            </Switch>
        </section>

        <Footer />
    </Router>
  );
};

export default App;
