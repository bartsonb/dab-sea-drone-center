import React, { Component } from 'react'
import './Map.css';

// @ts-ignore
// import DeckGL from '@deck.gl/react';
// @ts-ignore
// import { EditableGeoJsonLayer } from '@nebula.gl/layers';
// import { StaticMap } from 'react-map-gl';

export interface MapProps {

}

type MapState = {
    accessToken: any|string,
    geojson: {
        type: any,
        features: any[]
    },
    initialViewState: object
}

export class Map extends Component<MapProps, MapState> {
    constructor(props: MapProps) {
        super(props);

        this.state = {
            accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
            geojson: {
                type: 'FeatureCollection',
                features: []
            },
            initialViewState: {
                width: '100%',
                height: '500px',
                latitude: 52.438162,
                longitude: 13.649550,
                zoom: 12
            }
        };
    }

    render() {
        // let { accessToken, initialViewState } = this.state;

        {/*
        const editableLayer = new EditableGeoJsonLayer({
            id: 'geojson',
            data: this.state.geojson,
            mode: 'drawPoint',
            onEdit: ({ updatedData }: { updatedData: any }) => {
                this.setState({ geojson: updatedData });
            }
        });
        */}

        return (
            <div className="map">
                <button className="button btn">Add Fence</button>
                {/*
                <DeckGL
                    initialViewState={initialViewState}
                    controller={true}
                    layers={[editableLayer]}
                >
                    <StaticMap
                        mapboxApiAccessToken={accessToken}
                        height="500px"
                        width="500px"/>
                </DeckGL>
                */}
            </div>
        )
    }
}