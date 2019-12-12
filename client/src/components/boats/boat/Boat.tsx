import React from 'react';
import './Boat.css';

export interface BoatProps {
    id: number,
    commands: String[]
}

export const Boat = (props: BoatProps) => {
    return (
        <div className='boat'>
            <h3>Boat ({ props.id })</h3>
            <div>commands: { props.commands.map((command, index) => <p key={index}>{command}</p>) }</div>
        </div>
    )
};