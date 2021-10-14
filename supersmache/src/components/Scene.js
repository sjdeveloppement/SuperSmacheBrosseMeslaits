import React from 'react';

const Scene = () => {
    return (
        <div className="scene">
            
                <div className="floor"></div>
                <div className="cube">
                    <div className="front">
                        <div className="frontplug">
                            <div className="frontpartplug">
                                <div className="usbport"><p>.</p></div>
                                <div className="usbport"><p>..</p></div>
                                <div className="usbport"><p>...</p></div>
                                <div className="usbport"><p class="j4">....</p></div>
                                <div className="memory"></div>
                                <div className="memory1"></div>
                            </div>
                        </div>
                    </div>
                    <div className="back"></div>
                    <div className="arc"></div>
                    <div className="arc2"></div>
                    <div className="arc3"></div>
                    <div className="left">
                        <div className="vents"></div>
                    </div>
                    <div className="right">
                        <div className="vents"></div>
                    </div>
                    <div className="top">
                        <div className="cvShadow"></div>
                        <div className="offbtn"></div>
                    </div>
                    <div className="bottom"></div>
                </div>

            </div>
    );
};

export default Scene;