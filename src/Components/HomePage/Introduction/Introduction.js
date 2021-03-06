import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './Introduction.css';
import introImg from '../../../assets/Frame.png';

const Introduction = () => {
    return (
        <div className="introduction">
            <Row className="m-0">
                <Col className="m-auto pr-md-5" xs={12} md={6} >
                    <h1 className="navy-blue-text font-weight-bold display-6">
                        Let’s Grow Your <br />
                        Brand To The <br />
                        Next Level
                    </h1>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut doloribus nam enim ipsa soluta officiis. Possimus quae autem sit magni at mollitia?
                    </p>
                    <button className="brand-btn">Hire Us</button>
                </Col>
                <Col xs={12} md={6} >
                    <img className="img-fluid" src={introImg} alt="Introduction" />
                </Col>
            </Row>
        </div>
    );
};

export default Introduction;