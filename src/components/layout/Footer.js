import React from 'react';

const Footer = () => {
    const getYear = () => {
        const d = new Date();
        return d.getFullYear();
    }

    return (
        <footer className="footer is-light">
            <div className="content has-text-centered">
                <p><strong>GreenLog</strong> &copy;{getYear()} Created by <a target="_blank" rel="noopener noreferrer" href="https://visionare.se/">Jing Liu</a></p>
            </div>
        </footer>
    );
};

export default Footer;