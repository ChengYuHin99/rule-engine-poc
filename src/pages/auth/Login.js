import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { Container, Row, Col, 
    Card, CardBody, Label, 
    FormGroup, Button, Alert,
    CardImg, CardTitle, 
    CardHeader, CardSubtitle} from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import { loginUser } from '../../redux/actions';
import { isUserAuthenticated } from '../../helpers/authUtils';
import LoaderWidget from '../../components/Loader';
import logo from '../../assets/images/logo.png';
import ReactCaptchaGenerator from './captcha'; // https://www.npmjs.com/package/react-captcha-generator

class Login extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.state = {
            username: 'admin',
            password: 'YLHX@#XY',
            captcha:'',
            verifyError: false,
        };

        this.RCGElement = React.createRef()

        this.check = this.check.bind(this)
        this.result = this.result.bind(this)
        this.verifyTextChanged = this.verifyTextChanged.bind(this)
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    /**
     * Handles the submit
     */
    handleValidSubmit = (event, values) => {
        //event.preventDefault();
        let checked = this.check()

        if(checked)
        {
            this.props.loginUser(values.username, values.password, this.props.history);
        }
    };

    /**
     * Redirect to root
     */
    renderRedirectToRoot = () => {
        const isAuthTokenValid = isUserAuthenticated();
        if (isAuthTokenValid) {
            return <Redirect to="/" />;
        }
    };

    result(text) {
        this.setState({
          captcha: text
        })
    }

    check() {
        console.log("**CAPCHA**", this.state.captcha, this.captchaEnter.value, this.state.captcha === this.captchaEnter.value)
        if(this.state.captcha.toLowerCase() !== this.captchaEnter.value.toLowerCase()) 
        {
            // this.state.verifyError = true;
            this.setState({verifyError: true})
            this.RCGElement.current.setData()
            return false;
        }
        this.setState({verifyError: false})
        return true;
    }

    verifyTextChanged() {
        this.setState({verifyError: false})
    }

    render() {
        const isAuthTokenValid = isUserAuthenticated();
        return (
            <React.Fragment>
                {this.renderRedirectToRoot()}

                {(this._isMounted || !isAuthTokenValid) && (
                    <div className="account-pages mt-5 mb-5">
                        <Container>
                            <Row className="justify-content-center">
                                <Col lg={4} style={{alignSelf:'center'}}>
                                    <CardImg src={require('../../assets/images/img/login-pic.png')} />
                                </Col>
                                <Col lg={4} style={{alignSelf:'center'}}>
                                    <Card inverse style={{background:'transparent', width:'100%', height:'100%', boxShadow:'none'}}>
                                        <CardHeader style={{background:'transparent', borderColor:'#00c3ae'}}>
                                            <CardTitle tag='h3' className="pl-3">????????????</CardTitle>
                                            <CardSubtitle tag='h4' className="pl-5 pb-3">???????????????????????????????????????</CardSubtitle>
                                        </CardHeader>
                                        <CardBody>
                                            ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                            ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg={4}>
                                    <Card style={{backgroundColor:'transparent', borderColor:'#0a72cd', borderWidth:'2px', color:'white'}}>
                                        {/* <div className="card-header pt-4 pb-4 text-center bg-primary">
                                            <Link to="/">
                                                <span>
                                                    <img src={logo} alt="" height="18" />
                                                </span>
                                            </Link>
                                        </div> */}

                                        <CardBody className="p-4 position-relative">
                                            {/* preloader */}
                                            {this.props.loading && <LoaderWidget />}

                                            <div className="text-center w-75 m-auto">
                                                <h4 className="text-dark-50 text-center mt-0 font-weight-bold mb-4">
                                                ?????????????????????
                                                </h4>
                                                {/* <p className="text-muted mb-4">
                                                    Enter your username and password to access admin panel.
                                                </p> */}
                                            </div>

                                            {this.props.error && (
                                                <Alert color="danger" isOpen={this.props.error ? true : false}>
                                                    <div>{this.props.error}</div>
                                                </Alert>
                                            )}

                                            <AvForm onValidSubmit={this.handleValidSubmit}>
                                                {/* <AvField
                                                    name="username"
                                                    label="???????????????/?????????"
                                                    placeholder="???????????????/?????????"
                                                    value={this.state.username}
                                                    required
                                                /> */}
                                                <AvGroup>
                                                    <Label for="username">???????????????/?????????</Label>
                                                    <AvInput
                                                        type="username"
                                                        name="username"
                                                        id="username"
                                                        placeholder="???????????????/?????????"
                                                        value={this.state.username}
                                                        required
                                                        style={{ backgroundImage:'none', border: 'none'}}
                                                    />
                                                    <AvFeedback>???????????????</AvFeedback>
                                                </AvGroup>

                                                <AvGroup>
                                                    <Label for="password">???????????????</Label>
                                                    {/* <Link
                                                        to="/account/forget-password"
                                                        className="text-muted float-right">
                                                        <small>Forgot your password?</small>
                                                    </Link> */}
                                                    <AvInput
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                        placeholder="???????????????"
                                                        value={this.state.password}
                                                        required
                                                        style={{ backgroundImage:'none', border: 'none'}}
                                                    />
                                                    <AvFeedback>???????????????</AvFeedback>
                                                </AvGroup>

                                                <AvGroup>
                                                    <Label for="verification">??????????????????</Label>
                                                    {/* <Link
                                                        to="/account/forget-password"
                                                        className="text-muted float-right">
                                                        <small>Forgot your password?</small>
                                                    </Link> */}
                                                    <div style={{flexDirection:'row', display:'flex'}}>
                                                        <AvInput
                                                            ref={ref => this.captchaEnter = ref}
                                                            type="text"
                                                            name="verification"
                                                            id="verification"
                                                            placeholder="??????????????????"
                                                            value=''
                                                            required
                                                            autoComplete="off"
                                                            list=''
                                                            style={{borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRight:'none', 
                                                                backgroundImage:'none', border: 'none'}}
                                                            onChange={ this.verifyTextChanged }
                                                        />
                                                        <ReactCaptchaGenerator 
                                                            ref={this.RCGElement}
                                                            result={this.result} 
                                                            // height="38px" width="100px" paddingTop="0px"
                                                            background="white" borderRightRadius="0.25rem" borderLeftWidth="0"/>
                                                    </div>
                                                    {this.state.verifyError && <Label style={{color:'#fa5c7c', fontSize: '0.75rem'}}>????????????</Label>}
                                                </AvGroup>

                                                <FormGroup>
                                                    <Button className="btn-rounded mt-4 font-18" block color="success">??????</Button>
                                                </FormGroup>

                                                {/* <p>
                                                    <strong>Username:</strong> test &nbsp;&nbsp;{' '}
                                                    <strong>Password:</strong> test
                                                </p> */}
                                            </AvForm>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            {/* <Row> */}
                                
                            {/* </Row> */}
                            {/* <Row className="mt-1">
                                <Col className="col-12 text-center">
                                    <p className="text-muted">
                                        Don't have an account?{' '}
                                        <Link to="/account/register" className="text-muted ml-1">
                                            <b>Register</b>
                                        </Link>
                                    </p>
                                </Col>
                            </Row> */}
                        </Container>                        
                    </div>
                   
                )}
                {/* <div>
                    <CardImg src={require('../../assets/images/img/android-qrcode.png')} 
                    style={{position:'fixed', left: '20px',bottom: '0',width:'50px', height:'50px'}}/>
                </div> */}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
};

export default connect(
    mapStateToProps,
    { loginUser }
)(Login);
