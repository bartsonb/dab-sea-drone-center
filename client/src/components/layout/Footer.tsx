import React from 'react';
import './Footer.css';

export interface FooterProps {

}

export const Footer = (props: FooterProps) => {
    return (
        <footer>
            <p>made with <span role={"img"}>❤</span>️</p>
        </footer>
    )
};