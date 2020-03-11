import React, { Component } from 'react';
import {createNewUser} from "../../actions/SecurityActions"; 
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";

class SignUp extends Component {
    constructor (){
        super()
        this.state= {
            "username": "",
	        "fullName": "",
	        "password": "",
	        "confirmPassword": "",
            errors:{}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }
     }

    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit(e){
        e.preventDefault();

        const newUser = {
            username:this.state.username,
            fullName: this.state.fullName,
	        password: this.state.password,
	        confirmPassword: this.state.confirmPassword
        }
        this.props.createNewUser(newUser, this.props.history)
    }

    render() {
        const {errors} = this.state;
        return (
            <div className="register">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Sign Up</h1>
                    <p className="lead text-center">Create your Account</p>
                    <form onSubmit = {this.onSubmit}>
                        <div className="form-group">
                            <input type="text" className={classnames("form-control form-control-lg ", {"is-invalid":errors.fullName})} placeholder="Full Name" name="fullName" value ={this.state.fullName} onChange = {this.onChange}
                                />
                                {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                        </div>
                        <div className="form-group">
                            <input type="text" className={classnames("form-control form-control-lg ", {"is-invalid":errors.username})} placeholder="Email Address (username)" name="username" onChange = {this.onChange}
                            value ={this.state.username} />
                            {errors.username && <div className="invalid-feedback">{errors.username}</div>}

                        </div>
                        <div className="form-group">
                            <input type="password" className={classnames("form-control form-control-lg ", {"is-invalid":errors.password})} placeholder="Password" name="password" onChange = {this.onChange}
                            value ={this.state.password}/>
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <div className="form-group">
                            <input type="password" className={classnames("form-control form-control-lg ", {"is-invalid":errors.confirmPassword})} placeholder="Confirm Password"
                                name="confirmPassword" value ={this.state.confirmPassword}
                                onChange = {this.onChange}/>
                                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                        </div>
                        <input type="submit" className="btn btn-info btn-block mt-4" />
                    </form>
                </div>
            </div>
        </div>
    </div>


        )
    }
}

SignUp.propTypes = {
    createNewUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    errors: state.errors
})

export default connect(mapStateToProps, {createNewUser}) (SignUp);