import React, { Component } from 'react';

import './../assets/css/components/Footer.css';

class Footer extends Component
{
    render() {
        return (
            <footer className="footer">
                <div className="container d-flex justify-content-between">
                    <ul class="nav">
                        <li class="nav-item">
                            <a class="nav-link text-white" href="#">Điều khoản bảo mật</a>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center text-white">
                        &copy; { this.props.year } Nam Vo's blog
                    </div>
                </div>
            </footer>
        )
    }
}

Footer.defaultProps = {
    year: new Date().getFullYear()
};

export default Footer;
