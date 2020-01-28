import React, { Component } from 'react';
import './Boats.css';
import { Box } from 'react-bulma-components';
import { Boat } from "./boat/Boat";

interface BoatsProps {

}

interface BoatsState {
    boats: any[],
    command: any,
    id: any,
    availableCommands: string[],
    loading: boolean,
    error: boolean
}

export class Boats extends Component<BoatsProps, BoatsState> {
    state: BoatsState;

    constructor(props: BoatsProps) {
        super(props);

        this.state = {
            boats: [],
            command: 'SEARCH',
            id: 1,
            availableCommands: [],
            loading: true,
            error: false
        };

        this.changeId = this.changeId.bind(this);
        this.changeCommand = this.changeCommand.bind(this);
        this.sendCommand = this.sendCommand.bind(this);
    }

    componentDidMount(): void {
        this.api('api/boats')
            .then(response => this.setState({
                loading: false,
                boats: response
            }));

        this.api('api/utility/commands')
            .then(response => this.setState({
                loading: false,
                availableCommands: response
            }))
    }

    api(url: string): Promise<any> {
        return fetch(url)
            .then(response => response.json())
            .catch(error => this.setState({
                loading: false,
                error: true
            }));
    }

    sendCommand(event: any): void {
        event.preventDefault();
        fetch('/api/boats/' + this.state.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id,
                command: this.state.command
            })
        })
            .then(response => {
                this.api('api/boats')
                .then(response => this.setState({
                    boats: response
                }));
            })
            .catch(error => this.setState({
                error: true
            }))
    }

    changeId(event: any): void {
        this.setState({id: event.target.value})
    }

    changeCommand(event: any): void {
        this.setState({command: event.target.value})
    }

    render() {
        let content = !this.state.loading
            ? this.state.boats.map(boat => <Boat id={boat.id} commands={boat.commands} key={boat.id}/>)
            : 'Loading ..';

        let optionsForIds = !this.state.loading
            ? this.state.boats.map((boat, index) => <option key={index}>{boat.id}</option>)
            : <option>Loading ..</option>;

        let optionsForCommands = !this.state.loading
            ? this.state.availableCommands.map((command, index) => <option key={index}>{command}</option>)
            : <option>Loading ..</option>;

        return (
            <div className='boats'>
                <h1>Send new command</h1>
                <Box>
                    <form onSubmit={this.sendCommand}>
                        <div className="field">
                            <label className="label">Boat ID</label>
                            <div className="control">
                                <div className="select">
                                    <select onChange={this.changeId}>
                                        {optionsForIds}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Command</label>
                            <div className="control">
                                <div className="select">
                                    <select onChange={this.changeCommand}>
                                        {optionsForCommands}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link">Submit</button>
                            </div>
                        </div>
                    </form>
                </Box>

                <h1>Boats</h1>
                <Box>
                    {content}
                </Box>
            </div>
        )
    }
}