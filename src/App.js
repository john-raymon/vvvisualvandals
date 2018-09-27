import React, { Component, Fragment} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Routes from './routes'

import { initializeApplication } from './state/actions/applicationActions';

import get from './util/get'
import { IDLE, FULFILLED } from './constants/Status'

import './styles/app.css';

import Nav from './components/Nav'
import Footer from './components/Footer'


class App extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const {
      applicationStatus,
      actions: { initializeApplication }
    } = this.props;

    if (applicationStatus === IDLE) {
      initializeApplication();
    }
  }  

  render() {
    const { applicationStatus } = this.props;
    if (applicationStatus !== FULFILLED) {
      return ( <p>Loading</p> )
    } else {
      return(
        <Fragment>
          <Nav />
          <main className="container">
            <Routes location={get(this, 'props.location')} /> 
          </main>
          <Footer/>
        </Fragment>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    applicationStatus: get(state, 'status.initializeApplication'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        initializeApplication
      },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
