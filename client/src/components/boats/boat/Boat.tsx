import React from 'react';
import './Boat.css';

export interface BoatProps {
    id: number,
    commands: String[]
}

export const Boat = (props: BoatProps) => {
    return (
        <div className='boat'>
            <h2>Boat ({ props.id })</h2>
            <ul>{ props.commands.map((command, index) => <li key={index}>{command}</li>) }</ul>
        </div>
    )
};