import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardBody,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
  Table,
  Col,
  Form,
  FormGroup,
  Label,
  CardTitle,
  CardSubtitle,
  Input,
  Button,
  ButtonGroup,
  CardHeader,
  Collapse,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import classnames from "classnames";

//Dropzone
import Dropzone from "react-dropzone";

//select
import Select from "react-select";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
const LoadingContainer = (props) => <div>Loading...</div>;
const AddProperty = (props) => {
  const [state, setState] = useState({
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    breadcrumbItems: [{ title: "Add Property", link: "#" }],
    activeTab: 1,
    selectedFiles: [],
    saleOption: true,
    rentOption: false,
    col1: false,
  });

  const [propertyform, setPropertyform] = useState({
    title: "",
    city: "",
    area: "",
    address: "",
    size: "",
    price: "",
    description: "",
    securitydeposit: "",
    maintenance: "",
  });
  const [residencelist, setResidencelist] = useState({
    residence: [
      "House",
      "Guest House",
      "Apartment",
      "Upper portion",
      "Lower portion",
      "Farm House",
      "Room",
      "Basement",
    ],
  });
  const [plotlist, setPlotlist] = useState({
    plot: [
      "Residencial Plot",
      "Commercial Plot",
      "Industrial Land",
      "Plot file",
      "Farm House plot",
    ],
  });
  const [commerciallist, setCommerciallist] = useState({
    commercial: [
      "Gym",
      "Food Court",
      "Hall",
      "Office",
      "Shop",
      "Ware House",
      "Factory",
      "Theater",
    ],
  });
  const [subtypeValue, setSubtype] = useState("Residential");
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [parkingplaces, setParkingplaces] = useState(0);
  const [countrows, setCountRows] = useState(1);
  const [contact, setContact] = useState({
    rows: [
      {
        phone_num: "",
      },
    ],
  });
  /*onMarkerClick = onMarkerClick.bind();
        toggleTab = toggleTab.bind();
        handleAcceptedFiles = handleAcceptedFiles.bind();*/

  const handleAcceptedFiles = (files) => {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );

    setState({ selectedFiles: files });
  };
  const handleChangePhone = (idx) => (e) => {
    const { name, value } = e.target;
    const rows = [...contact.rows];
    const temp = rows[idx];
    rows[idx][name] = value;
    setContact({
      rows,
    });
  };
  const handleAddRow = (idx) => {
    console.log("idx", idx);
    setCountRows(setCountRows + 1);
    const item = {
      phone_num: "",
    };
    setContact({
      rows: [...contact.rows, item],
    });
  };
  const handleRemoveRow = (idx) => {
    setCountRows(setCountRows + 1);
    const { rows } = contact;
    const updatedRows = rows.filter((row, index) => {
      return index !== idx;
    });
    setContact({
      rows: updatedRows,
    });
  };

  /**
   * Formats the size
   */
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const toggleTab = (tab) => {
    if (state.activeTab !== tab) {
      if (tab >= 1 && tab <= 3) {
        setState({
          activeTab: tab,
        });
      }
    }
  };
  const onMarkerClick = (props, marker, e) => {
    alert("You clicked in this marker");
  };
  const activateStreetView = (position) => {
    //const mapObj = mapRef.map.getStreetView();
    //mapObj.setPov({ heading: 34, pitch: 10 });
    //mapObj.setPosition(position);
    //mapObj.setVisible(true);
  };
  const handleChange = (evt) => {
    const value = evt.target.value;
    console.log("value", value);
    setPropertyform({
      ...propertyform,
      [evt.target.value]: value,
    });
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Add Property"
            breadcrumbItems={state.breadcrumbItems}
          />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div
                    id="addproperty-nav-pills-wizard"
                    className="twitter-bs-wizard"
                  >
                    <TabContent className="twitter-bs-wizard-tab-content">
                      <Form>
                        <FormGroup>
                          <div
                            className="btn-group btn-group-toggle"
                            data-toggle="buttons"
                          >
                            <Label
                              className={
                                state.saleOption
                                  ? "btn btn-primary active"
                                  : "btn btn-light"
                              }
                            >
                              <Input
                                type="radio"
                                name="options"
                                id="option1"
                                defaultChecked
                                onClick={() =>
                                  setState({
                                    ...state,
                                    saleOption: true,
                                    rentOption: false,
                                    col1: false,
                                  })
                                }
                              />{" "}
                              Sale
                            </Label>
                            <Label
                              className={
                                state.rentOption
                                  ? "btn btn-primary active"
                                  : "btn btn-light"
                              }
                            >
                              <Input
                                type="radio"
                                name="options"
                                id="option1"
                                onClick={() =>
                                  setState({
                                    ...state,
                                    saleOption: false,
                                    rentOption: true,
                                    col1: !state.col1,
                                  })
                                }
                              />{" "}
                              Rent
                            </Label>
                          </div>
                        </FormGroup>

                        <FormGroup style={{ marginTop: "15px" }}>
                          <Label
                            htmlFor="propertytittle"
                            style={{ color: "black", fontSize: "15px" }}
                          >
                            Property Tittle
                          </Label>
                          <Input
                            id="propertytittle"
                            name="propertytittle"
                            placeholder="Enter Tittle"
                            type="text"
                            value={propertyform.tittle}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </FormGroup>
                        <Row>
                          <Col md={6}>
                            <Label
                              htmlFor="propertytype"
                              style={{
                                marginTop: "5px",
                                color: "black",
                                fontSize: "15px",
                              }}
                            >
                              Property Type
                            </Label>
                          </Col>
                          <Col md={6}>
                            <Label
                              htmlFor="propertytype"
                              style={{ color: "black", fontSize: "15px" }}
                            >
                              Sub-Type
                            </Label>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={2}>
                            <div className="form-check mb-3">
                              <Input
                                className="form-check-input"
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios1"
                                value="Residential"
                                onChange={(value) =>
                                  setSubtype(value.target.defaultValue)
                                }
                                defaultChecked
                              />
                              <Label
                                className="form-check-label"
                                htmlFor="exampleRadios1"
                              >
                                Residential
                              </Label>
                            </div>
                          </Col>
                          <Col lg={2}>
                            <div className="form-check mb-3">
                              <Input
                                className="form-check-input"
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios2"
                                value="Plot"
                                onChange={(value) =>
                                  setSubtype(value.target.defaultValue)
                                }
                              />
                              <Label
                                className="form-check-label"
                                htmlFor="exampleRadios1"
                              >
                                Plot
                              </Label>
                            </div>
                          </Col>
                          <Col lg={2}>
                            <div className="form-check mb-3">
                              <Input
                                className="form-check-input"
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios3"
                                value="Commercial"
                                onChange={(value) =>
                                  setSubtype(value.target.defaultValue)
                                }
                              />
                              <Label
                                className="form-check-label"
                                htmlFor="exampleRadios1"
                              >
                                Commercial
                              </Label>
                            </div>
                          </Col>
                          <Col lg={6}>
                            {console.log("subtype", subtypeValue)}
                            <div style={{ marginTop: "8px" }}>
                              {subtypeValue === "Residential" ? (
                                <FormGroup style={{ marginTop: "-20px" }}>
                                  <select className="form-control select2">
                                    <option value="EL">House</option>
                                    <option value="FA">Apartment</option>
                                  </select>
                                </FormGroup>
                              ) : (
                                <span></span>
                              )}
                              {subtypeValue === "Plot" ? (
                                <FormGroup style={{ marginTop: "-20px" }}>
                                  <select className="form-control select2">
                                    <option value="EL">House Plot</option>
                                    <option value="FA">Apartment</option>
                                    <option value="FI">Farm House</option>
                                  </select>
                                </FormGroup>
                              ) : (
                                <span></span>
                              )}
                              {subtypeValue === "Commercial" ? (
                                <FormGroup style={{ marginTop: "-20px" }}>
                                  {console.log("yes")}
                                  <select className="form-control select2">
                                    <option value="EL">House Commercial</option>
                                    <option value="FA">Apartment</option>
                                    <option value="FI">Farm House</option>
                                    <option value="FA">Ware House</option>
                                    <option value="FI">Industrial Land</option>
                                  </select>
                                </FormGroup>
                              ) : (
                                <span></span>
                              )}
                            </div>
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
                              <Input
                                id="cityname"
                                name="cityname"
                                type="text"
                                placeholder="Enter City"
                                value={propertyform.city}
                                onChange={handleChange}
                                className="form-control"
                              />
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
                              <Input
                                id="areaname"
                                name="areaname"
                                type="text"
                                placeholder="Enter Area"
                                value={propertyform.area}
                                onChange={handleChange}
                                className="form-control"
                              />
                            </FormGroup>
                          </Col>
                        </Row>

                        <FormGroup>
                          <textarea
                            className="form-control"
                            id="propertydesc"
                            placeholder="Add Address"
                            value={propertyform.address}
                            onChange={handleChange}
                            rows="5"
                          ></textarea>
                        </FormGroup>
                        <Row>
                          <Col md={3}>
                            <FormGroup>
                              <Input
                                id="size"
                                name="size"
                                type="text"
                                placeholder="Size"
                                value={propertyform.size}
                                onChange={handleChange}
                                className="form-control"
                              />
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
                              <Input
                                id="price"
                                name="price"
                                type="text"
                                placeholder="Price"
                                value={propertyform.price}
                                onChange={handleChange}
                                className="form-control"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Label
                          htmlFor="propertytittle"
                          style={{ color: "black", fontSize: "15px" }}
                        >
                          Property Description
                        </Label>
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
                          onDrop={(acceptedFiles) =>
                            handleAcceptedFiles(acceptedFiles)
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
                          {state.selectedFiles.map((f, i) => {
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
                        <div
                          style={{
                            border: "1px solid grey",
                            borderRadius: "15px",
                            padding: "20px",
                          }}
                        >
                          <Row>
                            <Col md={6}>
                              <Label
                                htmlFor="additionalinfo"
                                style={{ color: "black", fontSize: "15px" }}
                              >
                                Add Additional Information
                              </Label>
                            </Col>

                            <Col md={6}>
                              <center>
                                <Label
                                  htmlFor="bedrooms"
                                  style={{ color: "black", fontSize: "15px" }}
                                >
                                  No of Bedrooms
                                </Label>
                              </center>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6}>
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

                            <Col md={6}>
                              <FormGroup>
                                <InputGroup>
                                  <InputGroupAddon
                                    addonType="prepend"
                                    onClick={(event) =>
                                      setBedrooms(bedrooms - 1)
                                    }
                                  >
                                    <Button type="button" color="primary">
                                      <i className="mdi mdi-minus"></i>
                                    </Button>
                                  </InputGroupAddon>
                                  <Input
                                    id="bedrooms"
                                    name="bedrooms"
                                    type="text"
                                    placeholder="No of Bedrooms"
                                    value={bedrooms}
                                    className="form-control"
                                  />
                                  <InputGroupAddon
                                    addonType="append"
                                    onClick={(event) =>
                                      setBedrooms(bedrooms + 1)
                                    }
                                  >
                                    <Button type="button" color="primary">
                                      <i className="mdi mdi-plus"></i>
                                    </Button>
                                  </InputGroupAddon>
                                </InputGroup>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6}>
                              <Label
                                htmlFor="bathrooms"
                                style={{ color: "black", fontSize: "15px" }}
                              >
                                No of Bathrooms
                              </Label>
                            </Col>

                            <Col md={6}>
                              <center>
                                <Label
                                  htmlFor="parkingplaces"
                                  style={{ color: "black", fontSize: "15px" }}
                                >
                                  Total Parking Places
                                </Label>
                              </center>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6}>
                              <FormGroup>
                                <InputGroup>
                                  <InputGroupAddon
                                    addonType="prepend"
                                    onClick={(event) =>
                                      setBathrooms(bathrooms - 1)
                                    }
                                  >
                                    <Button type="button" color="primary">
                                      <i className="mdi mdi-minus"></i>
                                    </Button>
                                  </InputGroupAddon>
                                  <Input
                                    id="bathrooms"
                                    name="bathrooms"
                                    type="text"
                                    placeholder="No of Bathrooms"
                                    value={bathrooms}
                                    className="form-control"
                                  />
                                  <InputGroupAddon
                                    addonType="append"
                                    onClick={(event) =>
                                      setBathrooms(bathrooms + 1)
                                    }
                                  >
                                    <Button type="button" color="primary">
                                      <i className="mdi mdi-plus"></i>
                                    </Button>
                                  </InputGroupAddon>
                                </InputGroup>
                              </FormGroup>
                            </Col>

                            <Col md={6}>
                              <FormGroup>
                                <InputGroup>
                                  <InputGroupAddon
                                    addonType="prepend"
                                    onClick={(event) =>
                                      setParkingplaces(parkingplaces - 1)
                                    }
                                  >
                                    <Button type="button" color="primary">
                                      <i className="mdi mdi-minus"></i>
                                    </Button>
                                  </InputGroupAddon>
                                  <Input
                                    id="parkingpspaces"
                                    name="parkingspaces"
                                    type="text"
                                    placeholder="Total Parking Spaces"
                                    value={parkingplaces}
                                    className="form-control"
                                  />
                                  <InputGroupAddon
                                    addonType="append"
                                    onClick={(event) =>
                                      setParkingplaces(parkingplaces + 1)
                                    }
                                  >
                                    <Button type="button" color="primary">
                                      <i className="mdi mdi-plus"></i>
                                    </Button>
                                  </InputGroupAddon>
                                </InputGroup>
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row>
                            <Col md={12}>
                              <div>
                                <Card className="mb-1">
                                  <CardHeader id="headingOne">
                                    <h6 className="m-0 font-14">
                                      Down Payment IN PKR
                                      <i
                                        className={
                                          state.col1
                                            ? "mdi mdi-minus float-right accor-plus-icon"
                                            : "mdi mdi-plus float-right accor-plus-icon"
                                        }
                                      ></i>
                                    </h6>
                                  </CardHeader>
                                  <Collapse isOpen={state.col1}>
                                    <CardBody>
                                      <FormGroup>
                                        <Row>
                                          <Col md={6}>
                                            <FormGroup>
                                              <Label
                                                htmlFor="securitydeposit"
                                                style={{
                                                  color: "black",
                                                  fontSize: "15px",
                                                }}
                                              >
                                                Security Deposit
                                              </Label>
                                              <Input
                                                id="securitydeposit"
                                                name="securitydeposit"
                                                placeholder="Security Deposit"
                                                type="text"
                                                value={
                                                  propertyform.securitydeposit
                                                }
                                                onChange={handleChange}
                                                className="form-control"
                                              />
                                            </FormGroup>
                                          </Col>
                                          <Col md={6}>
                                            <FormGroup>
                                              <Label
                                                htmlFor="maintenace"
                                                style={{
                                                  color: "black",
                                                  fontSize: "15px",
                                                }}
                                              >
                                                Maintenance Charges
                                              </Label>
                                              <Input
                                                id="maintenance"
                                                name="maintenance"
                                                placeholder="Maintenace Charges"
                                                type="text"
                                                value={propertyform.maintenance}
                                                onChange={handleChange}
                                                className="form-control"
                                              />
                                            </FormGroup>
                                          </Col>
                                        </Row>
                                      </FormGroup>
                                    </CardBody>
                                  </Collapse>
                                </Card>
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col md={6}>
                              <Label
                                htmlFor="propertyfeatures"
                                style={{ color: "black", fontSize: "15px" }}
                              >
                                Property Features
                              </Label>
                            </Col>
                            <Col md={6}>
                              <Label
                                htmlFor="utilities"
                                style={{ color: "black", fontSize: "15px" }}
                              >
                                Utilities
                              </Label>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  Central Heating
                                </Label>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  Central Cooling
                                </Label>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  Servant Quarter
                                </Label>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  Electricity
                                </Label>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  Tv Lounge
                                </Label>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  Lawn
                                </Label>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  Dirty Kitchen
                                </Label>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  Gas
                                </Label>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  Dining Room
                                </Label>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  Swimming Pool
                                </Label>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  Elevators
                                </Label>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  Maintenance
                                </Label>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  Drawing Room
                                </Label>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  Fully Furnished
                                </Label>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  Study Room
                                </Label>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  Water
                                </Label>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  Home Theatre
                                </Label>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  Semi Furnished
                                </Label>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  Powder Room
                                </Label>
                              </div>
                            </Col>
                            <Col md={3}></Col>
                          </Row>
                          <Row>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  Kitchen
                                </Label>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  Balcony
                                </Label>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  Accessible for Specially-Abled Persons
                                </Label>
                              </div>
                            </Col>
                            <Col md={3}></Col>
                          </Row>
                          <Label
                            htmlFor="facing"
                            style={{ color: "black", fontSize: "15px" }}
                          >
                            Facing
                          </Label>
                          <Row>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  North
                                </Label>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  North West
                                </Label>
                              </div>
                            </Col>
                            <Col md={6}></Col>
                          </Row>
                          <Row>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  North East
                                </Label>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  South
                                </Label>
                              </div>
                            </Col>
                            <Col md={6}></Col>
                          </Row>
                          <Row>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  South West
                                </Label>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  South East
                                </Label>
                              </div>
                            </Col>
                            <Col md={6}></Col>
                          </Row>
                          <Row>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  East
                                </Label>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  West
                                </Label>
                              </div>
                            </Col>
                            <Col md={6}></Col>
                          </Row>
                        </div>
                        <div
                          style={{
                            border: "1px solid grey",
                            borderRadius: "15px",
                            padding: "20px",
                            marginTop: "17px",
                          }}
                        >
                          <Label
                            htmlFor="contactinfo"
                            style={{ color: "black", fontSize: "15px" }}
                          >
                            Contact Information
                          </Label>
                          {contact.rows.map((item, idx) => (
                            <Row>
                              <Col md={2}></Col>
                              <Col md={7}>
                                <FormGroup>
                                  <Input
                                    id="contact"
                                    name="contact"
                                    type="text"
                                    className="form-control"
                                    value={contact.rows[idx].phone_num}
                                    onChange={handleChangePhone(idx)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md={3}>
                                <FormGroup>
                                  {idx === 0 ? (
                                    <Button
                                      color="primary"
                                      type="button"
                                      className="waves-effect waves-light mr-1"
                                      onClick={(event) => handleAddRow(idx)}
                                    >
                                      <i className="fas fa-plus fa-1x"></i>
                                    </Button>
                                  ) : (
                                    <Button
                                      color="primary"
                                      type="button"
                                      className="waves-effect waves-light mr-1"
                                      onClick={(event) => handleRemoveRow(idx)}
                                    >
                                      <i className="fas fa-minus fa-1x"></i>
                                    </Button>
                                  )}
                                </FormGroup>
                              </Col>
                            </Row>
                          ))}
                        </div>
                        <div style={{ marginTop: "20px" }}>
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
                                      google={props.google}
                                      style={{ width: "100%", height: "100%" }}
                                      zoom={14}
                                    >
                                      <Marker
                                        title={
                                          "The marker`s title will appear as a tooltip."
                                        }
                                        name={"SOMA"}
                                        position={{
                                          lat: 37.778519,
                                          lng: -122.40564,
                                        }}
                                      />
                                      <Marker name={"Dolores park"} />
                                      <InfoWindow>
                                        <div>
                                          <h1>{state.selectedPlace.name}</h1>
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
                            <Button
                              type="button"
                              size="lg"
                              block
                              className="waves-effect waves-light"
                              color="primary"
                            >
                              Submit
                            </Button>
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
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE",
  LoadingContainer: LoadingContainer,
  v: "3",
})(AddProperty);
