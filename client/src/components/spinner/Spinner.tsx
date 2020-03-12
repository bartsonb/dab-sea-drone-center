import React from 'react';
import './Spinner.css';
import { MdCached } from "react-icons/md"

interface SpinnerProps {
    show: boolean
}

export const Spinner = (props: SpinnerProps) => {
    return (
        <MdCached className={'Spinner'} />
    )
};