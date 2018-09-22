import React, { Component } from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default class MainLayout extends Component
{
    render() {
        return (
            <div>
                <Navbar />
                <main>
                    { this.props.children }
                </main>
                <Footer />
            </div>
        )
    }
}
