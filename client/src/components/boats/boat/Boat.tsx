import React, { Component } from 'react';
import './Boat.css';
// @ts-ignore
import { store } from 'react-notifications-component';

import {
    MdErrorOutline, MdHelpOutline,
    MdKeyboardArrowDown,
    MdKeyboardReturn,
    MdLocationSearching, MdMenu, MdRefresh,
    MdRemoveCircleOutline,
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
    lastSignOfLife: number,
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
    lastSignOfLife: number,
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
            lastSignOfLife: props.lastSignOfLife,
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
            case 'START':
                return <MdLocationSearching className={'commandButton__icon'} />;
            case 'RETURN':
                return <MdKeyboardReturn className={'commandButton__icon'} />;
            case 'TEST_FORWARD':
            case 'TEST_RIGHT':
            case 'TEST_LEFT':
            case 'RANDOM':
                return <MdHelpOutline className={'commandButton__icon'} />;
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
            fetch('/api/boats/' + this.props.id)
                .then((response:any) => response.json())
                .then((response: any) => {
                    this.setState( {
                        ...response
                    });
                });
        }
    }

    showNotification() {
        store.addNotification({
            title: this.props.name + " updated",
            message: "The coordinates of '" + this.props.name + "' have been updated.",
            type: "success",
            insert: "top",
            container: "top-center",
            slidingEnter: {
                duration: 800,
                timingFunction: 'ease-out',
                delay: 0
            },
            slidingExit: {
                duration: 800,
                timingFunction: 'ease-out',
                delay: 0
            },
            dismiss: {
                duration: 3000,
                onScreen: false
            }
        });
    };

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

    timePassed() {
        let diff: any = new Date(new Date().getTime() - this.state.lastSignOfLife);
        let daysPassed: any = diff / (1000 * 3600 * 24);

        return (daysPassed > 0)
            ?   (diff.getHours() - 1).toString().padStart(2, '0') + ':' +
                diff.getMinutes().toString().padStart(2, '0') + ':' +
                diff.getSeconds().toString().padStart(2, '0')
            : daysPassed + ' ago';
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

                        <div className={'button commandButton commandButton__LIVEUPDATES ' + (this.state.liveUpdates ? 'is-active' : '')} onClick={this.toggleLiveUpdates} title={'Live Updates'}>
                            <MdUpdate size={'1.2em'} className={'dropdown__icons ' + (this.state.liveUpdates ? 'is-active' : '')} />
                        </div>
                    </div>
                </div>

                <div className="level">
                    <div className="stat level-right">
                        <div className="stat__card level-item has-text-centered is-6-mobile is-6-touch is-6-tablet">
                            <div>
                                <p className="heading">Speed</p>
                                <p className="title">{this.state.speed}</p>
                            </div>
                        </div>
                        <div className="stat__card level-item has-text-centered is-6-mobile is-6-touch is-6-tablet">
                            <div>
                                <p className="heading">Heading</p>
                                <p className="title">{this.state.heading}</p>
                            </div>
                        </div>
                        <div className="stat__card level-item has-text-centered is-6-mobile is-6-touch is-6-tablet">
                            <div>
                                <p className="heading">Position (<a target={'_blank'} href={'https://www.google.de/maps/place/' + this.state.position}>Maps</a>)</p>
                                <p className="title">{this.state.position[0] + ', ' + this.state.position[1]}</p>
                            </div>
                        </div>
                        <div className="stat__card level-item has-text-centered is-6-mobile is-6-touch is-6-tablet">
                            <div>
                                <p className="heading">Last Sign Of Life</p>
                                <p className="title">{this.state.lastSignOfLife ? this.timePassed() : 'Never'}</p>
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
                            showNotification={this.showNotification}
                            id={this.props.id} />
                        : ''}
            </div>
        )
    }
}