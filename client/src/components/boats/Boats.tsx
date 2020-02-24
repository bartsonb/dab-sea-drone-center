import React, { Component } from 'react';
import './Boats.css';
import { BoatGrid } from "./boatsGrid/BoatGrid";

interface BoatsProps {}

interface BoatsState {
    boats: any[],
    loading: boolean,
    error: boolean
}

export class Boats extends Component<BoatsProps, BoatsState> {
    constructor(props: BoatsProps) {
        super(props);

        this.state = {
            boats: [],
            loading: true,
            error: false
        };
    }

    componentDidMount(): void {
        this.api('api/boats')
            .then((response: any) => this.setState({ loading: false, boats: response }));
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
        return (
            <div className='boats'>
                {(!this.state.loading)
                        ? <BoatGrid boats={this.state.boats} />
                        : 'Loading ...'}
            </div>
        )
    }
}