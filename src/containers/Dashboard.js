import React, {Component} from 'react';
import PropTypes from "prop-types";
import {ToastContainer, toast} from 'react-toastify';
import Modal from 'react-modal';
import { Circle, Line } from 'progressbar.js';
import _ from 'lodash';

export default class Dashboard extends Component {

    static contextTypes = {
        refresh: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.showProject = this.showProject.bind(this);
        this.customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-10%, -50%)',
                background: '#f2f2f2',
                'border-radius': '10px',
                border: '0.5px solid',
                padding: '4.5rem',
                'margin-left': '-150px',
                'margin-top': '14px'
            }
        };
        this.state = {
            modalIsOpen: false,
            currentProject: {
                description: '',
                id: 0,
                imgUrl: '',
                owner: '',
                title: ''
            },
            url: ''
        }
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    async onClick(e) {
        const project = _.find(this.props.projects, {title: e.target.id});
        console.log("Found project", project);
        const remove = _.remove(this.props.projects, {title: e.target.id});
        const response = await this.props.removeProject(project);
        console.log("Response in Dashboard.js", response);
        if (response.payload.data.status === 'OK') {
            toast.info('Usunięto projekt!');
        }
    }

    showProject(e) {
        const project = _.find(this.props.projects, {title: e.target.id});
        console.log("Found project", project);
        const url = `http://engineershop.eu:4005/assets/img/${this.props.username}/${project.imgUrl}`;
        this.setState({currentProject: project, url});
        this.openModal();
    }

    render() {
        var i = 0;
        console.log("This.props.projects", this.props.projects);
        var projs = _.map(this.props.projects, (proj) => {
            console.log("Project in projs", proj);
            const url = `http://engineershop.eu:4005/assets/img/${this.props.username}/${proj.imgUrl}`;
            if (!proj.owner) {
                return;
            } else {
                return (<div key={i++} className="col-6 col-sm-3 placeholder">
                    <i id={proj.title} className="fa fa-window-close icon-pos" onClick={this.onClick}></i>
                    <img id={proj.title} style={{cursor: 'pointer'}} src={url} width="200" height="200" className="img-fluid placeholder imgSizing" alt="Generic placeholder thumbnail" onClick={this.showProject}></img>
                    <h4>{proj.title}</h4>
                    <div className="text-muted" style={{'word-break': 'break-all'}}>{proj.description}</div>
                </div>);
            }
        });

        return (<main className="col-sm-9 col-md-10 hidden-xs-down bg-white pt-3 overflow">
            <ToastContainer/>
            <h1 className="perfect-header">Twoje projekty</h1>
            <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={this.customStyles} contentLabel="Example Modal">
                <div className="my-modal rounded border border-primary">
                    <form>
                        <div className="form-group mb-2">
                            <h3 className="text-center">{this.state.currentProject.title}</h3>
                        </div>
                        <div className="form-group">
                            <img id={this.state.currentProject.id} src={this.state.url} width="200" height="200" className="text-center"/>
                        </div>
                        <div className="form-group">
                            <p>{this.state.currentProject.description}</p>
                        </div>
                    </form>
                </div>
            </Modal>
            <section className="row text-center placeholders bg-white">
                {projs}
            </section>
        </main>);
    }
}
