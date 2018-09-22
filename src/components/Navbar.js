import React, { Component } from 'react';

import './../assets/css/components/Navbar.css';

export default class Navbar extends Component
{
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light shadow">
                <div className="container">
                    <a className="navbar-brand">
                        Nam Vo
                    </a>
                    <button className="navbar-toggler" type="button" 
                            data-toggle="collapse" data-target="#navbarNavDropdown" 
                            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Nhật ký</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Chuyện ngành</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Portfolio</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Thông tin</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Liên hệ</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
