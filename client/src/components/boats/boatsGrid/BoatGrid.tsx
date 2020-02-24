import React from 'react';
import './BoatGrid.css';
import { Boat, BoatProps } from "../boat/Boat";

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

interface BoatGridProps {
    boats: BoatProps[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);

export const BoatGrid = (props: BoatGridProps) => {
    const classes = useStyles();

    const boats = (props.boats.length > 0)
        ? props.boats.map((boat: BoatProps, index: number) => (
            <Grid item xs={12} md={6} key={index}>
                <Paper className={classes.paper} key={index}>
                    <Boat
                        id={boat.id}
                        command={boat.command}
                        coordinates={boat.coordinates}
                        startPoint={boat.startPoint}
                        speed={boat.speed}
                        heading={boat.heading}
                        wayPoints={boat.wayPoints}
                        position={boat.position}
                        key={index}
                    />
                </Paper>
            </Grid>
        ))
        : '';

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {boats}
            </Grid>
        </div>
    )
};