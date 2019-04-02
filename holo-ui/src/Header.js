import React, {Component} from 'react';

export default class Header extends Component {
    render() {
        return (
            <div className="header-color">
                <img className="logo"
                     src="https://d2i72ju5buk5xz.cloudfront.net/gsc/6DOQQI/d1/bb/a8/d1bba848968c464ea118cd47bcdfc315/images/home/u3.png?token=b5c0ce8c34ffba088981b44362615290"/>
                <ul className="menu-ul">
                    <span className="text_notification">Hologram Management</span>
                    <svg className="notification" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                         viewBox="0 0 18 18">
                        <path
                            d="M9 1C4.58 1 1 4.58 1 9s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 2.75c1.24 0 2.25 1.01 2.25 2.25S10.24 8.25 9 8.25 6.75 7.24 6.75 6 7.76 3.75 9 3.75zM9 14.5c-1.86 0-3.49-.92-4.49-2.33C4.62 10.72 7.53 10 9 10c1.47 0 4.38.72 4.49 2.17-1 1.41-2.63 2.33-4.49 2.33z"/>
                    </svg>
                    <svg className="notification" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                         viewBox="0 0 24 24">
                        <path
                            d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/>
                    </svg>
                    <svg className="notification" width="24" height="24" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                    </svg>
                </ul>
            </div>
        )
    }
}
