import React, { Component } from 'react';
import './Boats.css';
import { Box } from 'react-bulma-components';
import { Boat } from "./boat/Boat";

interface BoatsProps {}

interface BoatsState {
    boats: any[],
    availableCommands: string[],
    loading: boolean,
    refreshing: boolean
    error: boolean,
}

export class Boats extends Component<BoatsProps, BoatsState> {
    constructor(props: BoatsProps) {
        super(props);

        this.state = {
            boats: [],
            availableCommands: [],
            loading: true,
            refreshing: false,
            error: false
        };
    }

    componentDidMount(): void {
        this.api('/api/boats')
            .then(response => this.setState({
                loading: false,
                boats: response
            }));

        this.api('/api/utility/commands')
            .then(response => this.setState({
                loading: false,
                availableCommands: response
            }));
    }

    api(url: string): Promise<any> {
        return fetch(url)
            .then(response => response.json())
            .catch(error => this.setState({
                loading: false,
                error: true
            }));
    }

    render() {
        let content = (!this.state.loading && Array.isArray(this.state.boats) && this.state.boats.length > 0)
            ? this.state.boats.map(boat => <Box key={boat.id}><Boat
                id={boat.id}
                name={boat.name}
                command={boat.command}
                coordinates={boat.coordinates}
                startPoint={boat.startPoint}
                speed={boat.speed}
                heading={boat.heading}
                wayPoints={boat.wayPoints}
                position={boat.position}
                availableCommands={this.state.availableCommands}
                key={boat.id}/></Box>)
            : 'Loading ..';

        return (
            <div className='boats'>
                {content}
            </div>
        )
    }
}