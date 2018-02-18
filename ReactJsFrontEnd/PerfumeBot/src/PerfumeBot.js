import React, { Component } from 'react';
import './PerfumeBot.css'
class PerfumeBot extends Component {
    render() {
        return (
            <iframe 
                src="https://console.dialogflow.com/api-client/demo/embedded/c1983775-8e70-418c-8e22-ab036842f1aa"
                className="bot-frame left-side" 
            />
        );
    }
}

export default PerfumeBot;