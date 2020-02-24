import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// CSS
import './App.css';
import Container from '@material-ui/core/Container';

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

        <Container maxWidth={"lg"}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/boats" component={Boats} />
                <Route exact path="/map" component={Map} />
            </Switch>
        </Container>

        <Footer />
    </Router>
  );
};

export default App;
