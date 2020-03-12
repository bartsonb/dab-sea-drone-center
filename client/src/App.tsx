import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// @ts-ignore
import ReactNotification from 'react-notifications-component'

// CSS
import './App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import 'react-notifications-component/dist/theme.css'

// Components
import { Navbar } from "./components/layout/Navbar";
import { Login } from "./components/login/Login";
import { Footer } from "./components/layout/Footer";
import { Boats } from "./components/boats/Boats";

interface AppProps {}

interface AppState {
    authenticated: boolean,
    token: any,
    user: any
}

class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);


        this.state = {
            authenticated: false,
            token: localStorage.getItem('token') ?? null,
            user: JSON.parse(localStorage.getItem('user') as string) ?? null
        };

        this.setUserCredentials = this.setUserCredentials.bind(this);
        this.removeUserCredentials = this.removeUserCredentials.bind(this);
    }

    componentDidMount(): void {
        if (
            this.state.token &&
            this.state.token !== 'undefined' &&
            this.state.user &&
            this.state.user !== 'undefined'
        ) {
            this.setState({ authenticated: true });
        }
    }

    setUserCredentials(token: string, user: any): void {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        this.setState({ token, user, authenticated: true });
    }

    removeUserCredentials(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        this.setState({ token: null, user: null, authenticated: false });
    }

    render() {
        let content = this.state.authenticated
            ? <Router>
                <ReactNotification />
                <Navbar callback={this.removeUserCredentials} user={ this.state.user ? this.state.user.name : 'Anonymous'} />

                <section className={'container'}>
                    <Switch>
                        <Route exact path="/" component={Boats} />

                        <Route path="/">
                            <Redirect to="/" />
                        </Route>
                    </Switch>
                </section>

                <Footer />
            </Router>
            : <Login callback={this.setUserCredentials} />;

        return ( content );
    }
}

export default App;
