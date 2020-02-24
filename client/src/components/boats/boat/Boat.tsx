import React, { Component } from 'react';
import './Boat.css';

import {
    MdAndroid,
    MdKeyboardReturn,
    MdLocationSearching,
    MdRemoveCircle,
    MdRemoveCircleOutline,
    MdRssFeed
} from "react-icons/md"

interface BoatProps {
    id: number,
    name: string,
    command: string,
    wayPoints: number[][],
    startPoint: number[],
    coordinates: number[][],
    position: number[],
    speed: object,
    heading: object,
    availableCommands: string[]
}

interface BoatState {
    loading: boolean,
    liveUpdates: boolean,
    error: boolean,
    name: string,
    command: string,
    wayPoints: number[][],
    startPoint: number[],
    coordinates: number[][],
    position: number[],
    speed: object,
    heading: object,
}

export class Boat extends Component<BoatProps, BoatState> {
    constructor(props: BoatProps) {
        super(props);

        this.state = {
            loading: false,
            liveUpdates: false,
            error: false,
            command: props.command,
            coordinates: props.coordinates,
            heading: props.heading,
            name: props.name,
            position: props.position,
            speed: props.speed,
            startPoint: props.startPoint,
            wayPoints: props.wayPoints
        };

        this.liveUpdate = this.liveUpdate.bind(this);
        this.toggleLiveUpdates = this.toggleLiveUpdates.bind(this);

        setInterval(this.liveUpdate, 5000);
    }

    sendCommand(command: string) {
        return (event: React.MouseEvent) => {
            this.setState({ loading: true });

            fetch('/api/boats/' + this.props.id, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ command: command })
            })
                .then(res => this.setState({ loading: false, command: command }));
        }
    };

    getIcon(name: string) {
        switch(name) {
            case 'STOP':
                return <MdRemoveCircleOutline className={'commandButton__icon'} />;
            case 'SEARCH':
                return <MdLocationSearching size={'1em'} className={'commandButton__icon'} />;
            case 'RETURN':
                return <MdKeyboardReturn size={'1em'} className={'commandButton__icon'} />;
        }
    }

    getCommandButtons() {


        return (this.props.availableCommands.length > 0)
            ? this.props.availableCommands.map((command: string, index: number) =>
                <button className={'button commandButton commandButton__' + command + ((this.state.command === command) ? ' is-link' : '')}
                        onClick={this.sendCommand(command)}
                        key={index}>
                    {this.getIcon(command)}
                    {command}
                </button>)
            : 'Loading ..';
    };

    liveUpdate() {
        if (this.state.liveUpdates) {
            console.log('Boat with id: ' + this.props.id + ' updated.');

            fetch('/api/boats/' + this.props.id)
                .then((response:any) => response.json())
                .then((response: any) => {
                    console.log(response);
                    this.setState( {
                        ...response
                    });
                });
        }
    }

    toggleLiveUpdates(event: React.MouseEvent) {
        this.setState({ liveUpdates: !this.state.liveUpdates });
    }

    render() {
        return (
            <div className='boat'>
                <div className="level">
                    <h2 className={'level-left'}>{this.state.name}</h2>
                    <div className="commandButtons level-right">
                        <div className={'button commandButton__LIVEUPDATES commandButton__LIVEUPDATES' + (this.state.liveUpdates ? '--active' : '--inactive')}
                             onClick={this.toggleLiveUpdates}>
                            <label htmlFor="checkbox">
                                <input type="checkbox" />
                                Live Updates
                            </label>
                        </div>

                        { this.getCommandButtons() }
                    </div>
                </div>

                <div className="level">
                    <div className="level-right">
                        <div className="level-item has-text-centered">
                            <div>
                                <p className="heading">Speed</p>
                                <p className="title">{this.state.speed}</p>
                            </div>
                        </div>
                        <div className="level-item has-text-centered">
                            <div>
                                <p className="heading">Heading</p>
                                <p className="title">{this.state.heading}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/*
                        <ul>{this.state.coordinates.map(([lat, lng], index) => <li key={index}>{lat + ", " + lng}</li>)}</ul>
                */}

                <div className="map level">

                </div>
            </div>
        )
    }
};