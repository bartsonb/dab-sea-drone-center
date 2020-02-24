import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// CSS
import './App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';

// Components
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Home } from "./components/home/Home";
import { Boats } from "./components/boats/Boats";
import { Map } from "./components/map/Map";

const App: React.FC = () => {
  return (
    <Router>
        <Navbar />

        <section className={'container'}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/boats" component={Boats} />
                <Route exact path="/map" component={Map} />
            </Switch>
        </section>

        <Footer />
    </Router>
  );
};

export default App;
