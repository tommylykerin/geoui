import React from 'react';
import Row from 'react-bootstrap/Row';

const CustomAlert = (props: any) => {
    let textColor = 'light';
    switch (props.type) {
        case 'warning':
        case 'light':
        case 'white':
        case 'transparent':
            textColor = 'dark';
            break;
        default:
            textColor = 'light';
    }
    return (
        <Row className={`bg-${props.type} text-${textColor}`}>
            <div className="col p-2 w-100 text-center font-weight-bold">
                {props.children || props.message}
            </div>
        </Row>
    )
}

export default CustomAlert;