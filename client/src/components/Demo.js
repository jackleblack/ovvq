import React from 'react';
import { geolocated, geoPropTypes } from 'react-geolocated';

const getDirection = (degrees, isLongitude) =>
    degrees > 0 ? (isLongitude ? "E" : "N") : isLongitude ? "W" : "S";

// addapted from http://stackoverflow.com/a/5786281/2546338
const formatDegrees = (degrees, isLongitude) =>
    `${0 | degrees}° ${0 |
        (((degrees < 0 ? (degrees = -degrees) : degrees) % 1) * 60)}' ${0 |
        (((degrees * 60) % 1) * 60)}" ${getDirection(degrees, isLongitude)}`;

class Demo extends React.Component {
    render() {
        const { props } = this;
        return (
            <div
                style={{
                    fontSize: "large",
                    fontWeight: "bold",
                    margin: "2rem",
                }}
            >
                {!props.isGeolocationAvailable ? (
                    <div>Your browser does not support Geolocation.</div>
                ) : !props.isGeolocationEnabled ? (
                    <div>Geolocation is not enabled.</div>
                ) : props.coords ? (
                    <div>
                        You are at{" "}
                        <span className="coordinate">
                            {formatDegrees(props.coords.latitude, false)}
                        </span>,{" "}
                        <span className="coordinate">
                            {formatDegrees(props.coords.longitude, true)}
                        </span>
                        {props.coords.altitude ? (
                            <span>
                                , approximately {props.coords.altitude} meters
                                above sea level
                            </span>
                        ) : null}.
                    </div>
                ) : (
                    <div>Getting the location data&hellip;</div>
                )}
            </div>
        );
    }
}

Demo.propTypes = { ...Demo.propTypes, ...geoPropTypes };

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Demo);