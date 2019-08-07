import React, {Component} from 'react';
import {connect} from 'react-redux';

export default (OriginalComponent) => {
    class MixedComponent extends Component {
        checkAUth() {
            if(!this.props.isAuth && !this.props.jwtToken) {
                this.props.history.push('/');
            }
        }
        componentDidMount() {
            this.checkAUth();
        }
        componentDidUpdate() {
            this.checkAUth();
        }        
        
        render() {
            return <OriginalComponent {... this.props}/>;
        }
    }

    function mapStateToProps(state) {
        return {
            isAuth: state.auth.isAuthenticated,
            jwtToken: state.auth.token,
        }
    }

    return connect(mapStateToProps)(MixedComponent);
};