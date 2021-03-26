import React, { Component } from 'react';
import { Container, Card, CardBody, Row, Nav, NavItem, NavLink, TabPane, TabContent, Col, Form, FormGroup, Label, CardTitle, CardSubtitle,Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import classnames from 'classnames';

//Dropzone
import Dropzone from "react-dropzone";

//select
import Select from 'react-select';
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
const LoadingContainer = props => <div>Loading...</div>;
class AddPropertyclass extends Component {
    constructor(props) {
        super(props);
        this.state={
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            breadcrumbItems : [
                { title : "Add Property", link : "#" },
            ],
            activeTab: 1,
            selectedFiles: [],
        }
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.toggleTab = this.toggleTab.bind(this);
        this.handleAcceptedFiles = this.handleAcceptedFiles.bind(this);
    }

    handleAcceptedFiles = files => {
        files.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            formattedSize: this.formatBytes(file.size)
          })
        );
    
        this.setState({ selectedFiles: files });
      };
    
      /**
       * Formats the size
       */
      formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
      };

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            if(tab >= 1 && tab <=3 ){
                this.setState({
                    activeTab: tab
                });
            }
        }
    }
    onMarkerClick(props, marker, e) {
        alert("You clicked in this marker");
      }
      activateStreetView = (position) => {
        const mapObj = this.mapRef.map.getStreetView();
        mapObj.setPov({ heading: 34, pitch: 10 });
        mapObj.setPosition(position);
        mapObj.setVisible(true);
      }

    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                    <Breadcrumbs title="Add Property" breadcrumbItems={this.state.breadcrumbItems} />
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <CardBody>
                                        
                                        <div id="addproperty-nav-pills-wizard" className="twitter-bs-wizard">
                                            <TabContent className="twitter-bs-wizard-tab-content">
                                                <Button type="button" color="primary" className="w-sm waves-effect waves-light mr-1">Sale</Button>
                                                <Button type="button" color="primary" style={{marginLeft: '-3px'}} className="w-sm waves-effect waves-light mr-1">Rent</Button>
                                                    <Form>
                                                        <FormGroup style={{marginTop: '15px'}}>
                                                            <Label htmlFor="propertytittle" style={{color: 'black', fontSize:'15px'}}>Property Tittle</Label>
                                                            <Input id="propertytittle" name="propertytittle" placeholder="Enter Tittle" type="text" className="form-control"/>
                                                        </FormGroup>
                                                        <Label htmlFor="propertytype" style={{marginTop: '10px', color: 'black', fontSize:'15px'}}>Property Type</Label>
                                                        <Row>
                                                            <Col lg={2}>   
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" defaultChecked />
                                                                    <Label className="form-check-label" htmlFor="exampleRadios1">
                                                                        Residential
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            <Col lg={2}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" defaultChecked />
                                                                    <Label className="form-check-label" htmlFor="exampleRadios1">
                                                                        Plot
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            <Col lg={2}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" defaultChecked />
                                                                    <Label className="form-check-label" htmlFor="exampleRadios1">
                                                                        Commercial
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <FormGroup style={{marginTop: '-20px'}}>
                                                                    <select className="form-control select2">
                                                                            <option>Sub-Type</option>
                                                                            <option value="EL">House</option>
                                                                            <option value="FA">Apartment</option>
                                                                            <option value="FI">Farm House</option>
                                                                            <option value="FA">Ware House</option>
                                                                            <option value="FI">Industrial Land</option>
                                                                    </select>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={6}>
                                                                <FormGroup>
                                                                    <select className="form-control select2">
                                                                        <option>Select City</option>
                                                                        <option value="EL">Lahore</option>
                                                                        <option value="FA">Islamabad</option>
                                                                        <option value="FI">Karachi</option>
                                                                    </select>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md={6}>
                                                                <FormGroup>
                                                                <Input id="cityname" name="cityname" type="text" placeholder="Enter City" className="form-control"/>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={6}>
                                                                <FormGroup>
                                                                    <select className="form-control select2">
                                                                        <option>Select Area</option>
                                                                        <option value="EL">Gulberg</option>
                                                                        <option value="FA">Bahria</option>
                                                                        <option value="FI">Jinnah Garden</option>
                                                                    </select>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md={6}>
                                                                <FormGroup>
                                                                <Input id="areaname" name="areaname" type="text" placeholder="Enter Area" className="form-control"/>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>

                                                        <FormGroup>
                                                            <textarea className="form-control" id="propertydesc" placeholder="Add Address" rows="5"></textarea>
                                                        </FormGroup>
                                                        <Row>
                                                            <Col md={3}>
                                                                <FormGroup>
                                                                    <Input id="size" name="size" type="text" placeholder="Size" className="form-control"/>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md={3}>
                                                                <FormGroup>
                                                                    <select className="form-control select2">
                                                                        <option>Select Unit</option>
                                                                        <option value="EL">Marla</option>
                                                                        <option value="FA">Acre</option>
                                                                        <option value="FI">Yard</option>
                                                                    </select>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md={6}>
                                                                <FormGroup>
                                                                    <Input id="price" name="price" type="text" placeholder="Price" className="form-control"/>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <Card>
                                                                <CardBody>
                                                                    <Form method="post">
                                                                    <Editor
                                                                        toolbarClassName="toolbarClassName"
                                                                        wrapperClassName="wrapperClassName"
                                                                        editorClassName="editorClassName"
                                                                    />
                                                                    </Form>
                                                                </CardBody>
                                                                </Card>
                                                            </Col>
                                                        </Row>
                                                        <Dropzone
                                                            onDrop={acceptedFiles =>
                                                            this.handleAcceptedFiles(acceptedFiles)
                                                            }
                                                        >
                                                            {({ getRootProps, getInputProps }) => (
                                                            <div className="dropzone">
                                                                <div
                                                                className="dz-message needsclick mt-2"
                                                                {...getRootProps()}
                                                                >
                                                                <input {...getInputProps()} />
                                                                <div className="mb-3">
                                                                    <i className="display-4 text-muted ri-upload-cloud-2-line"></i>
                                                                </div>
                                                                <h4>Drop photos here or click to upload.</h4>
                                                                </div>
                                                            </div>
                                                            )}
                                                        </Dropzone>
                                                        <div
                                                            className="dropzone-previews mt-3"
                                                            id="file-previews"
                                                        >
                                                            {this.state.selectedFiles.map((f, i) => {
                                                            return (
                                                                <Card
                                                                className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                                key={i + "-file"}
                                                                >
                                                                <div className="p-2">
                                                                    <Row className="align-items-center">
                                                                    <Col className="col-auto">
                                                                        <img
                                                                        data-dz-thumbnail=""
                                                                        height="80"
                                                                        className="avatar-sm rounded bg-light"
                                                                        alt={f.name}
                                                                        src={f.preview}
                                                                        />
                                                                    </Col>
                                                                    <Col>
                                                                        <Link
                                                                        to="#"
                                                                        className="text-muted font-weight-bold"
                                                                        >
                                                                        {f.name}
                                                                        </Link>
                                                                        <p className="mb-0">
                                                                        <strong>{f.formattedSize}</strong>
                                                                        </p>
                                                                    </Col>
                                                                    </Row>
                                                                </div>
                                                                </Card>
                                                            );
                                                            })}
                                                        </div>
                                                        <div style={{border: '1px solid grey', borderRadius: '15px', padding: '20px'}}>
                                                            <Label htmlFor="additionalinfo" style={{color: 'black', fontSize:'15px'}}>Add Additional Information</Label>
                                                            <Row>
                                                            <Col md={3}>
                                                                <FormGroup>
                                                                    <select className="form-control select2">
                                                                        <option>Year Built</option>
                                                                        <option value="EL">2000</option>
                                                                        <option value="FA">2005</option>
                                                                        <option value="FI">2010</option>
                                                                        <option value="EL">2015</option>
                                                                        <option value="FA">2020</option>
                                                                        <option value="FI">2021</option>
                                                                    </select>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md={3}>

                                                            </Col>
                                                            <Col md={6}>
                                                                <FormGroup>
                                                                    <Row>
                                                                        <Col md={1}>
                                                                            <i className="fas fa-minus-square fa-2x" style={{marginTop: '5px'}}></i>
                                                                        </Col>
                                                                        <Col md={4}>
                                                                            <Input id="bedrooms" name="bedrooms" type="text" placeholder="No of Bedrooms" className="form-control"/>
                                                                        </Col>
                                                                        <Col md={1}>
                                                                            <i className="fas fa-plus-square fa-2x" style={{marginTop: '5px'}}></i>
                                                                        </Col>
                                                                    </Row>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={6}>
                                                                <FormGroup>
                                                                        <Row>
                                                                            <Col md={1}>
                                                                                <i className="fas fa-minus-square fa-2x" style={{marginTop: '5px'}}></i>
                                                                            </Col>
                                                                            <Col md={4}>
                                                                                <Input id="bathrooms" name="bathrooms" type="text" placeholder="No of Bathrooms" className="form-control"/>
                                                                            </Col>
                                                                            <Col md={1}>
                                                                                <i className="fas fa-plus-square fa-2x" style={{marginTop: '5px'}}></i>
                                                                            </Col>
                                                                        </Row>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md={6}>
                                                                    <FormGroup>
                                                                        <Row>
                                                                            <Col md={1}>
                                                                                <i className="fas fa-minus-square fa-2x" style={{marginTop: '5px'}}></i>
                                                                            </Col>
                                                                            <Col md={4}>
                                                                                <Input id="parkingpspaces" name="parkingspaces" type="text" placeholder="Total Parking Spaces" className="form-control"/>
                                                                            </Col>
                                                                            <Col md={1}>
                                                                                <i className="fas fa-plus-square fa-2x" style={{marginTop: '5px'}}></i>
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={6}>
                                                                <Label htmlFor="propertyfeatures" style={{color: 'black', fontSize:'15px'}}>Property Features</Label>
                                                            </Col>
                                                            <Col md={6}>
                                                                <Label htmlFor="utilities" style={{color: 'black', fontSize:'15px'}}>Utilities</Label>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        Central Heating
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        Central Cooling
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        Servant Quarter
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        Electricity
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        Tv Lounge
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        Lawn
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        Dirty Kitchen
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        Gas
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        Dining Room
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        Swimming Pool
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        Elevators
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        Maintenance
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        Drawing Room
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        Fully Furnished
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        Study Room
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        Water
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        Home Theatre
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        Semi Furnished
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        Powder Room
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            <Col md={3}>

                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        Kitchen
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        Balcony
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        Accessible for Specially-Abled Persons
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            <Col md={3}>

                                                            </Col>
                                                        </Row>
                                                        <Label htmlFor="facing" style={{color: 'black', fontSize:'15px'}}>Facing</Label>
                                                        <Row>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        North
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        North West
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            <Col md={6}>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        North East
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        South
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            <Col md={6}>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        South West
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        South East
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            <Col md={6}>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        East
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            <Col md={3}>
                                                                <div className="form-check mb-3">
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        West
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            <Col md={6}>
                                                            </Col>
                                                        </Row>
                                                        </div>
                                                        <div style={{border: '1px solid grey', borderRadius: '15px', padding: '20px', marginTop: '17px'}}>
                                                            <Label htmlFor="contactinfo" style={{color: 'black', fontSize:'15px'}}>Contact Information</Label>
                                                            <Row>
                                                            <Col md={2}>
                                                            </Col>
                                                            <Col md={7}>
                                                                <FormGroup>
                                                                    <Input id="contact" name="contact" type="text" className="form-control"/>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md={3}>
                                                                <FormGroup>
                                                                <i className="ri-add-box-fill ri-2x"></i>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                        </div>
                                                        <div style={{marginTop:'20px'}}>
                                                        <Row>
                                                        <Col md={12}>
                                                            <Card>
                                                            <CardBody>
                                                                <div
                                                                id="gmaps-markers"
                                                                className="gmaps"
                                                                style={{ position: "relative" }}
                                                                >
                                                                <Map
                                                                    google={this.props.google}
                                                                    style={{ width: "100%", height: "100%" }}
                                                                    zoom={14}
                                                                >
                                                                    <Marker
                                                                    title={"The marker`s title will appear as a tooltip."}
                                                                    name={"SOMA"}
                                                                    position={{ lat: 37.778519, lng: -122.40564 }}
                                                                    />
                                                                    <Marker name={"Dolores park"} />
                                                                    <InfoWindow>
                                                                    <div>
                                                                        <h1>{this.state.selectedPlace.name}</h1>
                                                                    </div>
                                                                    </InfoWindow>
                                                                </Map>
                                                                </div>
                                                            </CardBody>
                                                            </Card>
                                                        </Col>
                                                        </Row>
                                                        </div>
                                                        <Row>
                                                            <Col md={12}>
                                                                <Button type="button"  size="lg" block className="waves-effect waves-light" color="primary" >Submit</Button>
                                                            </Col>
                                                        </Row>
                                                    </Form>
                    
                                              
                                                
                                            </TabContent>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE",
    LoadingContainer: LoadingContainer,
    v: "3"
  })(AddPropertyclass);