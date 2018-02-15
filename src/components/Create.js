import React, {Component} from 'react';
import _ from 'lodash';
import {ToastContainer, toast} from 'react-toastify';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addProject} from '../actions/addProject';
import {addImg} from '../actions/addImg';
import { getProjects } from '../actions/getProjects'
import superagent from 'superagent';
import { Circle, Line } from 'progressbar.js';
//import FileInput from 'react-file-inut';

export class Create extends Component {
    constructor(props) {
        super(props);
        console.log("Props from Create.js", props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        const username = props.username;
        let fileToUp;
        this.state = {
            title: '',
            description: '',
            fileUploaded: false,
            username: username,
            errors: {
                title: '',
                description: '',
                file: ''
            }
        }

    }

    onSubmit(event) {
        event.preventDefault();
        if (!this.state.title || !this.state.description || !this.fileToUp || !this.state.fileUploaded) {
            toast.warning('Podaj wszystkie niezbędne dane');
            return;
        }

        const formToSend = {
            username: this.state.username,
            title: this.state.title,
            description: this.state.description,
            filename: this.fileToUp.name
        }

        this.setState({title: '', description: '', fileUploaded: false});

        const result = this.props.addProject(formToSend).then((res) => {
            console.log("Res from server", res);
            if (res.payload.data.status === 'OK') {
                toast.success('Pomyślnie dodano projekt!');
                this.setState({
                    title: '',
                    description: '',
                    fileUploaded: false
                });
                this.props.update();
                return;
            } else {
                toast.error('Wystąpił błąd, spróbuj ponownie');
                return;
            }
        });
    }

    onChange(event) {

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleChange(e) {

        let file = e.target.files[0];
        this.setState({
            errors: {
                file: ''
            }
        });

        const allowedExtension = [
            'jpeg',
            'jpg',
            'png',
            'gif',
            'PNG',
            'JPG',
            'JPEG'
        ];

        const arr = file.name.split('.');
        const extension = arr[1];
        let approved = false;
        console.log("File extension:", extension);
        _.forEach(allowedExtension, (ext) => {
            if (ext === extension) {
                approved = true;
            }
        });

        if (!approved) {
            this.setState({
                errors: {
                    file: 'Nieobsługiwany format pliku'
                }
            });
            return;
        } else {
            toast.info('Pomyślnie dodano obraz!');
            this.setState({
                fileUploaded: true
            });
            this.fileToUp = file;
        }

        const result = this.props.addImg(file, this.state.username);
    }

    handleImageChange(e) {
        e.preventDefault();

        // let reader = new FileReader();
        let file = e.target.files[0];
        let uploadRequest = superagent.post('http://engineershop.eu:4005/upload');
        uploadRequest.field('username', this.state.username);
        uploadRequest.attach('file', file);

        uploadRequest.end((err, res) => {
            if(err) {
                console.log("Error occurred", err);
            } else {
                console.log("Resp from server", res);
            }
        })


        // reader.onloadend = () => {
        //     console.log("File", file);
        // }

        this.fileToUp = file;
        // reader.readAsDataURL(file);
        // const result = this.props.addImg(file).then((res) => {
        //     console.log("Res from addImg", res);
        // });
    }

    // componentDidMount() {
    //     var startColor = '#FC5B3F';
    //     var endColor = '#6FD57F';
    //     const endColor1 = '#1E90FF';
    //
    //     var circle = new Circle('#lineDiv', {
    //         color: startColor,
    //         trailColor: '#eee',
    //         trailWidth: 5,
    //         duration: 2000,
    //         easing: 'bounce',
    //         strokeWidth: 5,
    //         text: {
    //             value: (79) + " % complete.",
    //             className: 'progressbar__label'
    //         },
    //         // Set default step function for all animate calls
    //         step: function (state, circle) {
    //             circle.path.setAttribute('stroke', state.color);
    //         }
    //     });
    //
    //     circle.animate(0.79, {
    //         from: {
    //             color: startColor
    //         },
    //         to: {
    //             color: endColor
    //         }
    //     });
    //
    //     var circle2 = new Circle('#lineDiv2', {
    //         color: startColor,
    //         trailColor: '#eee',
    //         trailWidth: 5,
    //         duration: 2000,
    //         easing: 'bounce',
    //         strokeWidth: 5,
    //         text: {
    //             value: '2 projekty do tej pory!',
    //             className: 'progressbar__label'
    //         },
    //         // Set default step function for all animate calls
    //         step: function (state, circle) {
    //             circle.path.setAttribute('stroke', endColor1);
    //         }
    //     });
    //
    //     circle2.animate(0.79, {
    //         from: {
    //             color: startColor
    //         },
    //         to: {
    //             color: endColor1
    //         }
    //     });
    // }

    render() {

        let fileUploaded = this.state.fileUploaded;
        let check;
        if (fileUploaded) {
            check = <i className="fa fa-check ml-4"></i>;
        } else {
            check = <i></i>;
        }

        return (<main className="col-sm-9 col-md-10 hidden-xs-down bg-white pt-3">
            <ToastContainer/>
            <h1 className="perfect-header">Nowy projekt</h1>
            {/* <div className="row text-center placeholders">
            <div id='lineDiv' className="col-4 col-sm-3 placeholder percentage-bar"></div>
            <div id='lineDiv2' className="col-4 col-sm-3 placeholder percentage-bar"></div>
            </div> */}
            <div className="justify-content-center align-items-center col-12 col-md-9 align-items-center">
                <form onSubmit={this.onSubmit}>
                    <div className="jumbotron card-position">
                        <div className="form-group">
                            <label htmlFor="Tytuł" className="form-control-label">Tytuł</label>
                            <input name="title" onChange={this.onChange} type="text" className="form-control col-6" value={this.state.title}/>
                        </div>
                        <div className="form-control-error text-danger error-text"></div>
                        <div className="form-group">
                            <label htmlFor="Opis" className="form-control-label">Opis</label>
                            <textarea name="description" onChange={this.onChange} type="text" className="form-control col-6" value={this.state.description}/>
                            <div className="form-control-error text-danger error-text"></div>
                        </div>
                        <div className="form-group">
                            <label className="btn btn-info btn-file form-control-label">
                                Dodaj zdjęcie
                                <input type="file" className="disp-none" onChange={this.handleChange}/>
                            </label>
                            {check}
                            <div className="form-control-error text-danger error-text">{this.state.errors.file}</div>
                        </div>
                        <button value="Dodaj" className="btn btn-success float-none">
                            <span className="form-control-name">Dodaj</span>
                        </button>
                    </div>
                </form>
            </div>
        </main>);
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addProject: addProject,
        addImg: addImg,
        getProjects: getProjects
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(Create);
