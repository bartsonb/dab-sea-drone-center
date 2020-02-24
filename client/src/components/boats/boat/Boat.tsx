import React from 'react';
import './Boat.css';

export interface BoatProps {
    id: number,
    command: string,
    wayPoints: number[][],
    startPoint: number[],
    coordinates: number[][],
    position: number[],
    speed: object,
    heading: object
}

export const Boat = (props: BoatProps) => {
    const sendCommand = (event: any): void  => {
        event.preventDefault();

        fetch('/api/boats/' + props.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: props.id,
                command: props.command
            })
        })
    };

    return (
        <div className='boat'>
            <h2>Boat ({ props.id })</h2>
            <ul>
                <li>
                    <b>Position:</b><br/>
                    { props.position[0] + ", " + props.position[1] }
                </li>
                <li>
                    <b>Command:</b><br/>
                    { props.command }
                </li>
                <li>
                    <b>Speed:</b><br/>
                    { props.speed }
                </li>
                <li>
                    <b>Heading:</b><br/>
                    { props.heading }
                </li>
                <li>
                    <b>Waypoints:</b><br/>
                    <ul>{ props.wayPoints.map(([lat, lng], index) => <li key={index}>{lat + ", " + lng}</li>) }</ul>
                </li>
                <li>
                    <b>Coordinates:</b><br/>
                    <ul>{ props.coordinates.map(([lat, lng], index) => <li key={index}>{lat + ", " + lng}</li>) }</ul>
                </li>
            </ul>
        </div>
    )
};