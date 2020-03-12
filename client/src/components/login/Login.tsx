import React, { Component } from 'react';
import axios from "axios";
import './Login.css';
import SyncLoader from 'react-spinners/SyncLoader';

interface LoginProps {
    callback(token: string, user: any): void
}

interface LoginState {
    email: string,
    password: string,
    error: any,
    loading: boolean
}

export class Login extends Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: false,
            loading: false
        };

        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.login = this.login.bind(this);
    }

    handlePasswordInput(e: any) {
        this.setState({ password: e.target.value })
    }

    handleEmailInput(e: any) {
        this.setState({ email: e.target.value })
    }

    login(e: any) {
        e.preventDefault();
        this.setState({ loading: true, error: false });

        axios.post('/api/auth', { email: this.state.email, password: this.state.password }, { headers: { 'content-type': 'application/json'}})
            .then(res => {
                let token = res.data.token;

                axios.get('/api/auth', { headers: { 'x-auth-token': token }})
                    .then(res => {
                        this.setState({ loading: false, error: false });
                        this.props.callback(token, res.data);
                    });
            })
            .catch(err => {
                this.setState({ loading: false, error: 'Invalid Credentials' });
            });
    }

    render() {
        let notification = (this.state.error && !this.state.loading)
            ? <div className="notification is-danger">{ this.state.error }</div>
            : '';

        return (
            <section className="hero is-primary is-fullheight" style={{'background': '#222'}}>
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-6-tablet is-6-desktop is-6-widescreen">
                                <form action="" className="box" onSubmit={this.login}>
                                    <div className="field">
                                        <label htmlFor="" className="label">Email</label>
                                        <div className="control">
                                            <input type="email"
                                                   placeholder="bobsmith@seashepard.com"
                                                   className="input"
                                                   onInput={this.handleEmailInput}
                                                   required/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="" className="label">Password</label>
                                        <div className="control">
                                            <input type="password"
                                                   placeholder="*******"
                                                   className="input"
                                                   onInput={this.handlePasswordInput}
                                                   required/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <button className="button is-info login-button">
                                            { this.state.loading ? <SyncLoader loading={true} size={10} color={'#fff'} /> : 'Login' }
                                        </button>
                                    </div>
                                    { notification }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
};