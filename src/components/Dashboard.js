import React, { Component } from 'react';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="perfect-row-dashboard">
            <main className="col-sm-9 col-md-10 hidden-xs-down bg-white pt-3">
                <h1 class="perfect-header">Twoje projekty</h1>
                <section className="row text-center placeholders">
                    <div className="col-6 col-sm-3 placeholder">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Aurora_australis_20050911.jpg" width="200" height="200" className="img-fluid rounded-circle placeholder" alt="Generic placeholder thumbnail"></img>
                        <h4>Label</h4>
                        <div className="text-muted">Something else</div>
                    </div>
                    <div className="col-6 col-sm-3 placeholder">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Aurora_australis_20050911.jpg" width="200" height="200" className="img-fluid rounded-circle placeholder"></img>
                        <h4>Label</h4>
                        <div className="text-muted">Something else</div>
                    </div>
                    <div className="col-6 col-sm-3 placeholder">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Aurora_australis_20050911.jpg" width="200" height="200" className="img-fluid rounded-circle placeholder"></img>
                        <h4>Label</h4>
                        <div className="text-muted">Something else</div>
                    </div>
                    <div className="col-6 col-sm-3 placeholder">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Aurora_australis_20050911.jpg" width="200" height="200" className="img-fluid rounded-circle placeholder"></img>
                        <h4>Label</h4>
                        <div className="text-muted">Something else</div>
                    </div>
                </section>
            </main>
        </div>
        );
    }
}
