import React, { Component } from 'react';
import MapGL, { Source, Layer } from 'react-map-gl';
import { Editor, EditorModes } from 'react-map-gl-draw';
import { getFeatureStyle, getEditHandleStyle } from './style';

const TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || '';

export default class Map extends Component {
    constructor(props) {
        super(props);

        this._editorRef = null;
        this.state = {
            viewport: {
                longitude: this.props.longitude,
                latitude: this.props.latitude,
                zoom: 15,
            },
            features: [],
            coordinatesExist: false,
            mode: EditorModes.EDITING
        };
    }

    componentDidMount() {
        let initialFeatures = [];

        if (this.props.coordinates !== 'undefined') {
            initialFeatures.push({
                type: 'Feature',
                properties: { renderType: 'Polygon', title: 'fence' },
                geometry: { type:'Polygon', coordinates: [ this.props.coordinates ] }
            })
        }

        this.setState({
            // Used for displaying the save button
            coordinatesExist: (this.props.coordinates !== 'undefined'),
            features: initialFeatures
        });
    }

    _updateViewport = viewport => {
        this.setState({ viewport });
    };

    _onSelect = options => {
        this.setState({selectedFeatureIndex: options && options.selectedFeatureIndex});
    };

    _onDelete = () => {
        const selectedIndex = this.state.selectedFeatureIndex;

        if (selectedIndex !== null && selectedIndex >= 0) {
            this._editorRef.deleteFeatures(selectedIndex);
        }
    };

    _onUpdate = ({ editType, data: { features }}) => {
        if (editType === 'addFeature') {
            this.setState({
                mode: EditorModes.EDITING
            });
        }

        this.setState({
            features: features
        });
    };

    _renderDrawTools = () => {
        return (
            <div className="mapboxgl-ctrl-top-left">
                <div className="mapboxgl-ctrl-group mapboxgl-ctrl">
                    {
                        this.state.coordinatesExist
                            ? <button
                                className="mapbox-gl-draw_ctrl-draw-btn"
                                title="Save fence"
                                onClick={this._saveFence}
                                disabled={!this.state.coordinatesExist}>Save</button>
                            : ''
                    }
                    <button
                        className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_polygon"
                        title="Add or edit fence"
                        onClick={() => this.setState({mode: EditorModes.DRAW_POLYGON})}
                    />
                    <button
                        className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_trash"
                        title="Delete the fence"
                        onClick={this._onDelete}
                    />
                </div>
            </div>
        );
    };

    _getFeatures = () => this._editorRef && this._editorRef.getFeatures();

    _saveFence = () => {
        let polygon = this._getFeatures().find(feature => feature.hasOwnProperty('properties') && feature.properties.hasOwnProperty('title') && feature.properties.title === 'fence');

        if (
            Array.isArray(polygon?.geometry?.coordinates) &&
            Array.isArray(polygon?.geometry?.coordinates[0]) &&
            polygon.geometry.coordinates[0].length > 0
        ) {
            console.log(polygon.geometry.coordinates[0]);

            fetch('/api/boats/' + this.props.id, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ coordinates: polygon.geometry.coordinates[0] })
            })
                .then(response => {
                    this.props.showNotification();
                })
                .catch(error => console.log(error));
        }
    };

    render() {
        const { viewport, mode } = this.state;

        let DroneLayer = (this.props.latitude && this.props.longitude)
            ? <React.Fragment>
                <Source id="points" type="geojson" data={{ type: 'FeatureCollection', features: [{
                        type: 'Feature',
                        properties: { renderType: 'Point' },
                        geometry: { type:'Point', coordinates: [ this.props.longitude, this.props.latitude ] }
                    }] }} />
                <Layer
                    id="points"
                    type="circle"
                    source="points"
                    paint={{
                        "circle-stroke-width": 2,
                        "circle-stroke-color": '#3cb2d0',
                        "circle-opacity": 0.1,
                        'circle-radius': 4,
                        'circle-color': '#fff'
                    }}
                />
            </React.Fragment>
            : '';

        return (
            <MapGL
                {...viewport}
                width="100%"
                height="450px"
                mapOptions={{controls: true}}
                mapStyle={"mapbox://styles/mapbox/dark-v9"}
                mapboxApiAccessToken={TOKEN}
                onViewportChange={this._updateViewport}
            >
                <Editor
                    ref={_ => (this._editorRef = _)}
                    style={{width: '100%', height: '100%'}}
                    clickRadius={12}
                    mode={mode}
                    features={this.state.features}
                    onSelect={this._onSelect}
                    onUpdate={this._onUpdate}
                    editHandleShape={'circle'}
                    featureStyle={getFeatureStyle}
                    editHandleStyle={getEditHandleStyle}
                />

                { DroneLayer }
                { this._renderDrawTools() }
            </MapGL>
        );
    }
}