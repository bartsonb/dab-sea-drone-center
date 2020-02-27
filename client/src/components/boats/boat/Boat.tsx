import React, { Component } from 'react';
import './Boat.css';

import {
    MdKeyboardArrowDown,
    MdKeyboardReturn,
    MdLocationSearching, MdMenu, MdRefresh,
    MdRemoveCircleOutline, MdRoundedCorner,
    MdUpdate
} from "react-icons/md"
import Map from "../../map/Map";

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
    showDropdown: boolean,
    showMap: boolean,
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
            showDropdown: false,
            showMap: false,
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
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.toggleMap = this.toggleMap.bind(this);

        setInterval(this.liveUpdate, 5000);
    }

    componentDidMount() {
        this.setState({
            liveUpdates: (localStorage.getItem('liveUpdates-id-' + this.props.id) === 'true'),
            showMap: (localStorage.getItem('showMap-id-' + this.props.id) === 'true')
        })
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
                return <MdLocationSearching className={'commandButton__icon'} />;
            case 'RETURN':
                return <MdKeyboardReturn className={'commandButton__icon'} />;
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
            console.log( this.props.id + ' updated.');
            fetch('/api/boats/' + this.props.id)
                .then((response:any) => response.json())
                .then((response: any) => {
                    this.setState( {
                        ...response
                    });
                });
        }
    }

    toggleLiveUpdates() {
        localStorage.setItem('liveUpdates-id-' + this.props.id, '' + !this.state.liveUpdates);
        this.setState({ liveUpdates: !this.state.liveUpdates });
    }

    toggleDropdown() {
        this.setState({ showDropdown: !this.state.showDropdown });
    }

    toggleMap() {
        localStorage.setItem('showMap-id-' + this.props.id, '' + !this.state.showMap);
        this.setState({ showMap: !this.state.showMap });
    }

    render() {
        return (
            <div className='boat'>

                <div className="level">
                    <h2 className={'level-left'}>
                        {this.state.name}
                        <span title='Live Update active' className={'live-update-spinner ' + (this.state.liveUpdates ? 'is-active' : '')}><MdRefresh /></span>
                    </h2>
                    <div className="commandButtons level-right">
                        { this.getCommandButtons() }

                        <div className={'dropdown ' + (this.state.showDropdown ? 'is-active' : '')}>
                            <div className="dropdown-trigger">
                                <button onClick={this.toggleDropdown} className="button" aria-haspopup="true" aria-controls="dropdown-menu2">
                                    <span className="icon is-small"><MdMenu /></span>
                                </button>
                            </div>
                            <div className="dropdown-menu" id="dropdown-menu2" role="menu">
                                <div className="dropdown-content">
                                    <div className="my-dropdown-item">
                                        <MdRoundedCorner size={'1.2em'} className={'dropdown__icons'} />
                                        <p>Add or edit fence.</p>
                                    </div>
                                    <hr className="dropdown-divider" />
                                    <div className={'my-dropdown-item ' + (this.state.liveUpdates ? 'is-active' : '')} onClick={this.toggleLiveUpdates}>
                                        <MdUpdate size={'1.2em'} className={'dropdown__icons ' + (this.state.liveUpdates ? 'is-active' : '')} />
                                        <p>Live Updates</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="level">
                    <div className="stat level-right">
                        <div className="stat__card level-item has-text-centered">
                            <div>
                                <p className="heading">Speed</p>
                                <p className="title">{this.state.speed}</p>
                            </div>
                        </div>
                        <div className="stat__card level-item has-text-centered">
                            <div>
                                <p className="heading">Heading</p>
                                <p className="title">{this.state.heading}</p>
                            </div>
                        </div>
                        <div className="stat__card level-item has-text-centered">
                            <div>
                                <p className="heading">Position (<a target={'_blank'} href={'https://www.google.de/maps/place/' + this.state.position}>Maps</a>)</p>
                                <p className="title">{this.state.position[0] + ', ' + this.state.position[1]}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={'map-trigger ' + (this.state.showMap ? 'is-open' : '')} onClick={this.toggleMap}>
                    <p>{this.state.showMap ? 'Hide' : 'Show'} Map</p>
                    <MdKeyboardArrowDown style={{transform: 'rotate(' + (this.state.showMap ? 0 : 180) + 'deg)'}}/>
                </div>

                {this.state.showMap
                        ? <Map
                            latitude={this.state.position[0]}
                            longitude={this.state.position[1]}
                            coordinates={this.state.coordinates}
                            id={this.props.id} />
                        : ''}
            </div>
        )
    }
};