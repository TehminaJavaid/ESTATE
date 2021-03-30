import React, { useState, useEffect, useDebugValue } from "react";
import {
  Container,
  Card,
  CardBody,
  Row,
  Nav,
  NavItem,
  NavLink,
  Progress,
  TabPane,
  TabContent,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Image from "./Image";
import api from "../../apiCalls/api";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import classnames from "classnames";

//Dropzone
import Dropzone from "react-dropzone";

//select
import Select from "react-select";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const LoadingContainer = (props) => <div>Loading...</div>;
const AddProject = (props) => {
  const [state, setState] = useState({
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    breadcrumbItems: [
      { title: "Project", link: "#" },
      { title: "Add Prroject", link: "#" },
    ],
    activeTab: 1,
    progressValue: 25,
  });
  const instance = axios.create();
  const [activeTabProgress, setActivetabprogress] = useState(1);
  const [projectID, setProjectID] = useState(0);
  const [countfloors, setcountFloors] = useState(1);
  const [countunits, setcountUnits] = useState(1);
  const [countcompanies, setcountCompany] = useState(1);
  const [regionslist, setRegionslist] = useState({});
  const [placeslist, setPlaceslist] = useState({});
  const [citieslist, setCitieslist] = useState({});
  const [changedropvalue, setDropvalue] = useState(false);
  const [changecitydropvalue, setCityDropvalue] = useState(false);
  const [changeplacedropvalue, setPlaceDropvalue] = useState(false);
  const [changeblockdropvalue, setBlockDropvalue] = useState(false);
  const [test, setTest] = useState([]);
  const [projectform, setProjectform] = useState({
    code: "",
    name: "",
    description: "",
    address: "",
    type: "",
    video: "",
    city_id: "",
    region_id: "",
    area_id: "",
    lat: 37.778519,
    lng: -122.40564,
    proimage: [],
  });
  useEffect(() => {
    debugger;
    api.login().then((response) => {
      console.log("kkk", response.data);
      setRegionslist(response.data.message);
    });
  }, []);
  useEffect(() => {}, [regionslist]);
  const handleChange = (evt) => {
    const value = evt.target.value;
    console.log("value", value);
    setProjectform({
      ...projectform,
      [evt.target.name]: value,
    });
  };
  const [floors, setFloors] = useState({
    rows: [
      {
        floor_type: "",
      },
    ],
  });
  const [units, setUnits] = useState({
    rows: [
      {
        unit_num: "",
        unit_type: "",
        unit_size: "",
        unit_price: "",
      },
    ],
  });
  const [companies, setCompany] = useState({
    rows: [
      {
        company_name: "",
      },
    ],
  });

  useEffect(() => {
    setProjectID("A" + Math.floor((1 + Math.random()) * 0x10000) + "c");
  }, []);
  useEffect(() => {}, [projectID]);

  const handleAcceptedFiles = (files) => {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    debugger;
    setTest(files);
    //setProjectform({ ...projectform, proimage: files });
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
      if (tab >= 1 && tab <= 6) {
        setState({
          ...state,
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
  //Floors
  const handleAddFloorRow = (idx) => {
    console.log("idx", idx);
    setcountFloors(countfloors + 1);
    const item = {
      floor_type: "",
    };
    setFloors({
      rows: [...floors.rows, item],
    });
  };
  const handleChangeFloor = (idx) => (e) => {
    const { name, value } = e.target;
    const rows = [...floors.rows];
    const temp = rows[idx];
    rows[idx][name] = value;
    setFloors({
      rows,
    });
  };
  const handleRemoveFloorRow = (idx) => {
    setcountFloors(countfloors + 1);
    const { rows } = floors;
    const updatedRows = rows.filter((row, index) => {
      return index !== idx;
    });
    setFloors({
      rows: updatedRows,
    });
  };

  //Units
  const handleAddUnitRow = (idx) => {
    console.log("idx", idx);
    setcountUnits(countunits + 1);
    const item = {
      unit_num: "",
      unit_type: "",
      unit_size: "",
      unit_price: "",
    };
    setUnits({
      rows: [...units.rows, item],
    });
  };
  const handleChangeUnit = (idx) => (e) => {
    const { name, value } = e.target;
    const rows = [...units.rows];
    const temp = rows[idx];
    rows[idx][name] = value;
    setUnits({
      rows,
    });
  };
  const handleRemoveUnitRow = (idx) => {
    setcountUnits(countunits + 1);
    const { rows } = units;
    const updatedRows = rows.filter((row, index) => {
      return index !== idx;
    });
    setUnits({
      rows: updatedRows,
    });
  };
  //Companies
  const handleAddCompanyRow = (idx) => {
    console.log("idx", idx);
    setcountCompany(countcompanies + 1);
    const item = {
      company_name: "",
    };
    setCompany({
      rows: [...companies.rows, item],
    });
  };
  const handleChangeCompany = (idx) => (e) => {
    const { name, value } = e.target;
    const rows = [...companies.rows];
    const temp = rows[idx];
    rows[idx][name] = value;
    setCompany({
      rows,
    });
  };
  const handleRemoveCompanyRow = (idx) => {
    setcountCompany(countcompanies + 1);
    const { rows } = companies;
    const updatedRows = rows.filter((row, index) => {
      return index !== idx;
    });
    setCompany({
      rows: updatedRows,
    });
  };
  function setCityDropdown(dropvalue) {
    console.log("selectedvalue", dropvalue);
    setDropvalue(dropvalue);
    setCityDropvalue(false);
    setPlaceDropvalue(false);
    console.log("changedrop", changedropvalue);
    api.city(dropvalue).then((response) => {
      console.log("kkk", response.data);
      setCitieslist(response.data.message);
      setCityDropvalue(response.data.message);
    });
    // .then((response) =>response.json())
    // .then((json) => {
    //   console.log("ppp",json)
    //   setCitieslist(json.message);
    //   setCityDropvalue(json.message);
    // });
  }
  function setPlaceDropdown(dropvalue) {
    setCityDropvalue(dropvalue);
    setPlaceDropvalue(false);
    console.log("selectedvalue", dropvalue);
    api.area(dropvalue).then((response) => {
      console.log("kkk", response.data);
      setPlaceslist(response.data.message);
      setPlaceDropvalue(response.data.message);
    });
  }
  function setBlockDropdown(dropvalue) {
    setBlockDropvalue(dropvalue);
    setProjectform({
      ...projectform,
      code: projectID,
      area_id: dropvalue,
    });
    console.log("projectform", projectform);
  }
  const fileSelectedHandler = (e) => {
    setProjectform({
      ...projectform,
      files: [...projectform.files, e.target.files],
    });
  };
  const getUploadParams = ({ meta }) => {
    const url = "https://estate92.herokuapp.com/api/test";
    return {
      url,
      meta: { fileUrl: `${url}/${encodeURIComponent(meta.name)}` },
    };
  };

  function handleChangeStatus({ meta }, status) {
    console.log("picture");
    console.log(status, meta);
  }

  const handleSubmit = (files, allFiles) => {
    console.log(files && files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
  };
  const onFileChange = event => {
    
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  
  };
  async function projectSubmit() {
    /*Object.keys(projectform).forEach((key) => {
      formdata.append(key, projectform[key]);
    });*/
    /*console.log("projectform", projectform);
    const formdata = new FormData();
    formdata.append("code", projectform.code);
    formdata.append("name", projectform.name);
    formdata.append("description", projectform.description);
    formdata.append("address", projectform.address);
    formdata.append("type", projectform.type);
    formdata.append("video", projectform.video);
    formdata.append("city_id", projectform.city_id);
    formdata.append("region_id", projectform.region_id);
    formdata.append("area_id", projectform.area_id);
    formdata.append("lat", projectform.lat);
    formdata.append("lng", projectform.lng);
    formdata.append("projectimage", projectform.proimage);
    console.log("formdata", formdata);*/
    const formdata = new FormData();
    formdata.append("value", test);
    console.log("formdata1", formdata);

    await api.addproject(formdata).then((response) => {
      console.log("kkk", response.status);
    });
  }
  const toggleTabProgress = (tab) => {
    console.log("toggletab", tab);
    if (activeTabProgress !== tab) {
      if (tab >= 1 && tab <= 6) {
        console.log("insideif");
        setActivetabprogress(tab);
        console.log("tab", tab);
        console.log("activetab", activeTabProgress);
        if (tab === 1) {
          setState({ ...state, progressValue: 5 });
        }
        if (tab === 2) {
          setState({ ...state, progressValue: 25 });
        }

        if (tab === 3) {
          setState({ ...state, progressValue: 40 });
        }
        if (tab === 4) {
          setState({ ...state, progressValue: 60 });
        }
        if (tab === 5) {
          setState({ ...state, progressValue: 80 });
        }
        if (tab === 6) {
          setState({ ...state, progressValue: 100 });
        }
      }
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Add Project"
            breadcrumbItems={state.breadcrumbItems}
          />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div id="progrss-wizard" className="twitter-bs-wizard">
                    <ul className="twitter-bs-wizard-nav nav-justified nav nav-pills">
                      <NavItem>
                        <NavLink
                          onClick={() => {
                            toggleTabProgress(1);
                          }}
                          className={classnames({
                            active: activeTabProgress === 1,
                          })}
                        >
                          <span className="step-number">01</span>
                          <span className="step-title">Project Details</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          onClick={() => {
                            toggleTabProgress(2);
                          }}
                          className={classnames({
                            active: activeTabProgress === 2,
                          })}
                        >
                          <span className="step-number">02</span>
                          <span className="step-title">Project Features</span>
                        </NavLink>
                      </NavItem>

                      <NavItem>
                        <NavLink
                          onClick={() => {
                            toggleTabProgress(3);
                          }}
                          className={classnames({
                            active: activeTabProgress === 3,
                          })}
                        >
                          <span className="step-number">03</span>
                          <span className="step-title">Floors</span>
                        </NavLink>
                      </NavItem>

                      <NavItem>
                        <NavLink
                          onClick={() => {
                            toggleTabProgress(4);
                          }}
                          className={classnames({
                            active: activeTabProgress === 4,
                          })}
                        >
                          <span className="step-number">04</span>
                          <span className="step-title">Units</span>
                        </NavLink>
                      </NavItem>

                      <NavItem>
                        <NavLink
                          onClick={() => {
                            toggleTabProgress(5);
                          }}
                          className={classnames({
                            active: activeTabProgress === 5,
                          })}
                        >
                          <span className="step-number">05</span>
                          <span className="step-title">Floors Plan</span>
                        </NavLink>
                      </NavItem>

                      <NavItem>
                        <NavLink
                          onClick={() => {
                            toggleTabProgress(6);
                          }}
                          className={classnames({
                            active: activeTabProgress === 6,
                          })}
                        >
                          <span className="step-number">06</span>
                          <span className="step-title">Developers</span>
                        </NavLink>
                      </NavItem>
                    </ul>
                    <div id="bar" className="mt-4">
                      <Progress
                        color="primary"
                        striped
                        animated
                        value={state.progressValue}
                      />
                    </div>
                    <TabContent
                      activeTab={activeTabProgress}
                      className="twitter-bs-wizard-tab-content"
                    >
                      <TabPane tabId={1}>
                        <Form>
                          <Row>
                            <Col md={2}>
                              <FormGroup>
                                <Label htmlFor="Projectid">Project ID</Label>
                                <Input
                                  id="Projectid"
                                  name="Projectid"
                                  type="text"
                                  className="form-control"
                                  value={projectID}
                                />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label htmlFor="Projectname">
                                  Project Name
                                </Label>
                                <Input
                                  id="name"
                                  name="name"
                                  type="text"
                                  className="form-control"
                                  value={projectform.name}
                                  onChange={handleChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <Label className="control-label">Type</Label>
                                <select
                                  className="form-control select2"
                                  onChange={(value) => {
                                    setProjectform({
                                      ...projectform,
                                      type: value.target.value,
                                    });
                                  }}
                                >
                                  <option>Select</option>
                                  <option value="Commercial">Commercial</option>
                                  <option value="Residencial">
                                    Residencial
                                  </option>
                                  <option value="Plot">plot</option>
                                </select>
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row>
                            <Col lg={6}>
                              <FormGroup>
                                <Label htmlFor="Projectdesc">Description</Label>
                                <textarea
                                  className="form-control"
                                  id="description"
                                  name="description"
                                  rows="5"
                                  value={projectform.description}
                                  onChange={handleChange}
                                ></textarea>
                              </FormGroup>
                            </Col>
                            <Col lg={6}>
                              <FormGroup>
                                <Label htmlFor="projectaddress">Address</Label>
                                <textarea
                                  className="form-control"
                                  id="address"
                                  name="address"
                                  rows="5"
                                  value={projectform.address}
                                  onChange={handleChange}
                                ></textarea>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={4}>
                              <FormGroup>
                                <Label className="control-label">Region</Label>
                                <select
                                  className="form-control select2"
                                  placeholder="Select Region"
                                  value={changedropvalue}
                                  onChange={(value) => {
                                    setCityDropdown(value.target.value);
                                    setProjectform({
                                      ...projectform,
                                      region_id: value.target.value,
                                    });
                                  }}
                                >
                                  {<option value="0">Select Region</option>}
                                  {Object.entries(regionslist).map(
                                    ([key, val]) => (
                                      <option value={val.id}>
                                        {val.region_name}
                                      </option>
                                    )
                                  )}
                                </select>
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <Label className="control-label">City</Label>

                                {!(citieslist === "No Cities Found") ? (
                                  <select
                                    className="form-control select2"
                                    value={changecitydropvalue}
                                    onChange={(value) => {
                                      setPlaceDropdown(value.target.value);
                                      setProjectform({
                                        ...projectform,
                                        city_id: value.target.value,
                                      });
                                    }}
                                  >
                                    <option value="0">Select City</option>
                                    {Object.entries(citieslist).map(
                                      ([key, val]) => (
                                        <option value={val.id}>
                                          {val.city_name}
                                        </option>
                                      )
                                    )}
                                  </select>
                                ) : (
                                  <select
                                    className="form-control select2"
                                    value={changecitydropvalue}
                                    onChange={(value) =>
                                      setPlaceDropdown(value.target.value)
                                    }
                                  >
                                    <option value="1">No Cities Found</option>
                                  </select>
                                )}
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <Label className="control-label">Area</Label>
                                {changeplacedropvalue === false ? (
                                  <select
                                    className="form-control select2"
                                    onChange={(value) =>
                                      setBlockDropdown(value.target.value)
                                    }
                                  >
                                    <option value="0">Select Area</option>
                                  </select>
                                ) : (
                                  <span>
                                    {console.log("yooo")}
                                    {!(placeslist === "No Places Found") ? (
                                      <select
                                        className="form-control select2"
                                        onChange={(value) =>
                                          setBlockDropdown(value.target.value)
                                        }
                                      >
                                        <option value="1">Select Area</option>
                                        {Object.entries(placeslist).map(
                                          ([key, val]) => (
                                            <option value={val.id}>
                                              {val.name}
                                            </option>
                                          )
                                        )}
                                      </select>
                                    ) : (
                                      <select
                                        className="form-control select2"
                                        onChange={(value) =>
                                          setBlockDropdown(value.target.value)
                                        }
                                      >
                                        <option value="0">
                                          No Places Found
                                        </option>
                                      </select>
                                    )}
                                  </span>
                                )}
                              </FormGroup>
                            </Col>
                          </Row>

                        

                          {/* <Dropzone
                            //getUploadParams={getUploadParams}
                            //onChangeStatus={handleChangeStatus}
                            //onSubmit={handleSubmit}
                            //accept="image/*,audio/*,video/*"
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
                                  <h4>Drop files here or click to upload.</h4>
                                </div>
                              </div>
                            )}
                          </Dropzone> */}
                          {/*<div
                            className="dropzone-previews mt-3"
                            id="file-previews"
                          >
                            {projectform.proimage.map((f, i) => {
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
                          </div>*/}
                          <input type="file" name="myImage" onChange={onFileChange} />

                          <Row>
                            <Col md={12}>
                              <FormGroup>
                                <Label htmlFor="videourl">Video URL</Label>
                                <Input
                                  id="video"
                                  name="video"
                                  type="text"
                                  className="form-control"
                                  value={projectform.video}
                                  onChange={handleChange}
                                />
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row>
                            <Col md={12}>
                              <div style={{ marginTop: "25px" }}>
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
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={12}>
                              <Button
                                type="button"
                                size="lg"
                                block
                                className="waves-effect waves-light"
                                color="primary"
                                style={{ marginTop: "20px" }}
                                onClick={projectSubmit}
                              >
                                Submit
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      </TabPane>
                      <TabPane tabId={2}>
                        <Form>
                          <div style={{ borderBottom: "1px solid black" }}>
                            <Label
                              htmlFor="plotfeatures"
                              style={{ color: "black", fontSize: "15px" }}
                            >
                              Plot Features
                            </Label>
                          </div>
                          <Row>
                            <Col md={4}>
                              <div
                                className="form-check mb-3"
                                style={{ marginTop: "20px" }}
                              >
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
                                  Electric Backup
                                </Label>
                              </div>
                            </Col>
                            <Col md={4}>
                              <div
                                className="form-check mb-3"
                                style={{ marginTop: "20px" }}
                              >
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
                                  Elevator or Lift
                                </Label>
                              </div>
                            </Col>
                            <Col md={4}></Col>
                          </Row>
                          <div
                            style={{
                              borderBottom: "1px solid black",
                              marginTop: "20px",
                            }}
                          >
                            <Label
                              htmlFor="plotfeatures"
                              style={{ color: "black", fontSize: "15px" }}
                            >
                              Main Features
                            </Label>
                          </div>
                          <Row>
                            <Col md={4}>
                              <div
                                className="form-check mb-3"
                                style={{ marginTop: "20px" }}
                              >
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
                                  Sewerage
                                </Label>
                              </div>
                            </Col>
                            <Col md={4}>
                              <div
                                className="form-check mb-3"
                                style={{ marginTop: "20px" }}
                              >
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
                            <Col md={4}>
                              <div
                                className="form-check mb-3"
                                style={{ marginTop: "20px" }}
                              >
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
                                  Water Supply
                                </Label>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={4}>
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
                                  Accessible by road
                                </Label>
                              </div>
                            </Col>
                            <Col md={4}>
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
                            <Col md={4}></Col>
                          </Row>
                          <div
                            style={{
                              borderBottom: "1px solid black",
                              marginTop: "20px",
                            }}
                          >
                            <Label
                              htmlFor="plotfeatures"
                              style={{ color: "black", fontSize: "15px" }}
                            >
                              Business and Communication
                            </Label>
                          </div>
                          <Row>
                            <Col md={4}>
                              <div
                                className="form-check mb-3"
                                style={{ marginTop: "20px" }}
                              >
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
                                  Broad Band Internet Access
                                </Label>
                              </div>
                            </Col>
                            <Col md={4}>
                              <div
                                className="form-check mb-3"
                                style={{ marginTop: "20px" }}
                              >
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
                                  Satellite ior Cable Tv
                                </Label>
                              </div>
                            </Col>
                            <Col md={4}></Col>
                          </Row>
                          <div
                            style={{
                              borderBottom: "1px solid black",
                              marginTop: "20px",
                            }}
                          >
                            <Label
                              htmlFor="plotfeatures"
                              style={{ color: "black", fontSize: "15px" }}
                            >
                              Community Feature
                            </Label>
                          </div>
                          <Row>
                            <Col md={4}>
                              <div
                                className="form-check mb-3"
                                style={{ marginTop: "20px" }}
                              >
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
                                  Kids Play area
                                </Label>
                              </div>
                            </Col>
                            <Col md={4}></Col>
                            <Col md={4}></Col>
                          </Row>
                          <div
                            style={{
                              borderBottom: "1px solid black",
                              marginTop: "20px",
                            }}
                          >
                            <Label
                              htmlFor="plotfeatures"
                              style={{ color: "black", fontSize: "15px" }}
                            >
                              Healthcare
                            </Label>
                          </div>
                          <Row>
                            <Col md={4}>
                              <div
                                className="form-check mb-3"
                                style={{ marginTop: "20px" }}
                              >
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
                                  Gym
                                </Label>
                              </div>
                            </Col>
                            <Col md={4}>
                              <div
                                className="form-check mb-3"
                                style={{ marginTop: "20px" }}
                              >
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
                            <Col md={4}></Col>
                          </Row>
                          <div
                            style={{
                              borderBottom: "1px solid black",
                              marginTop: "20px",
                            }}
                          >
                            <Label
                              htmlFor="plotfeatures"
                              style={{ color: "black", fontSize: "15px" }}
                            >
                              Near By Locations and Facilities
                            </Label>
                          </div>
                          <Row>
                            <Col md={4}>
                              <div
                                className="form-check mb-3"
                                style={{ marginTop: "20px" }}
                              >
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
                                  Schools
                                </Label>
                              </div>
                            </Col>
                            <Col md={4}>
                              <div
                                className="form-check mb-3"
                                style={{ marginTop: "20px" }}
                              >
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
                                  Hospitals
                                </Label>
                              </div>
                            </Col>
                            <Col md={4}>
                              <div
                                className="form-check mb-3"
                                style={{ marginTop: "20px" }}
                              >
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
                                  Shopping Malls
                                </Label>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={4}>
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
                                  Restaurants
                                </Label>
                              </div>
                            </Col>
                            <Col md={4}>
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
                                  Public Transport Service
                                </Label>
                              </div>
                            </Col>
                            <Col md={4}></Col>
                          </Row>
                          <div
                            style={{
                              borderBottom: "1px solid black",
                              marginTop: "20px",
                            }}
                          >
                            <Label
                              htmlFor="plotfeatures"
                              style={{ color: "black", fontSize: "15px" }}
                            >
                              Other Facilities
                            </Label>
                          </div>
                          <Row>
                            <Col md={4}>
                              <div
                                className="form-check mb-3"
                                style={{ marginTop: "20px" }}
                              >
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
                                  Maintenance Staff
                                </Label>
                              </div>
                            </Col>
                            <Col md={4}>
                              <div
                                className="form-check mb-3"
                                style={{ marginTop: "20px" }}
                              >
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
                                  Security Staff
                                </Label>
                              </div>
                            </Col>
                            <Col md={4}>
                              <div
                                className="form-check mb-3"
                                style={{ marginTop: "20px" }}
                              >
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
                                  CCTV Security
                                </Label>
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      </TabPane>
                      <TabPane tabId={3}>
                        <div style={{ marginTop: "50px" }}>
                          <Form>
                            {floors.rows.map((item, idx) => (
                              <Row>
                                <Col md={2}></Col>
                                <Col md={7}>
                                  <FormGroup>
                                    <Input
                                      id="floortype"
                                      name="floortype"
                                      type="text"
                                      placeholder="Floor Type"
                                      className="form-control"
                                      value={floors.rows[idx].floor_type}
                                      onChange={handleChangeFloor(idx)}
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
                                        onClick={(event) =>
                                          handleAddFloorRow(idx)
                                        }
                                      >
                                        <i className="fas fa-plus fa-1x"></i>
                                      </Button>
                                    ) : (
                                      <Button
                                        color="primary"
                                        type="button"
                                        className="waves-effect waves-light mr-1"
                                        onClick={(event) =>
                                          handleRemoveFloorRow(idx)
                                        }
                                      >
                                        <i className="fas fa-minus fa-1x"></i>
                                      </Button>
                                    )}
                                  </FormGroup>
                                </Col>
                              </Row>
                            ))}
                          </Form>
                        </div>
                      </TabPane>
                      <TabPane tabId={4}>
                        <div style={{ marginTop: "50px" }}>
                          <Form>
                            {units.rows.map((item, index) => (
                              <Row>
                                <Col md={1}></Col>
                                <Col md={1}>
                                  <FormGroup>
                                    <Input
                                      id="unit"
                                      name="unit"
                                      type="text"
                                      placeholder="Unit #"
                                      className="form-control"
                                      value={units.rows[index].unit_num}
                                      onChange={handleChangeUnit(index)}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md={2}>
                                  <FormGroup>
                                    <Input
                                      id="type"
                                      name="type"
                                      type="text"
                                      placeholder="Type"
                                      className="form-control"
                                      value={units.rows[index].unit_type}
                                      onChange={handleChangeUnit(index)}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md={2}>
                                  <FormGroup>
                                    <Input
                                      id="size"
                                      name="size"
                                      type="text"
                                      placeholder="Size"
                                      className="form-control"
                                      value={units.rows[index].unit_type}
                                      onChange={handleChangeUnit(index)}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md={2}>
                                  <FormGroup>
                                    <Input
                                      id="price"
                                      name="price"
                                      type="text"
                                      placeholder="Price"
                                      className="form-control"
                                      value={units.rows[index].unit_price}
                                      onChange={handleChangeUnit(index)}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md={2}>
                                  <FormGroup>
                                    <Input
                                      id="image"
                                      name="image"
                                      type="text"
                                      placeholder="upload Image"
                                      className="form-control"
                                    />
                                  </FormGroup>
                                </Col>

                                <Col md={2}>
                                  <FormGroup>
                                    {index === 0 ? (
                                      <Button
                                        color="primary"
                                        type="button"
                                        className="waves-effect waves-light mr-1"
                                        onClick={(event) =>
                                          handleAddUnitRow(index)
                                        }
                                      >
                                        <i className="fas fa-plus fa-1x"></i>
                                      </Button>
                                    ) : (
                                      <Button
                                        color="primary"
                                        type="button"
                                        className="waves-effect waves-light mr-1"
                                        onClick={(event) =>
                                          handleRemoveUnitRow(index)
                                        }
                                      >
                                        <i className="fas fa-minus fa-1x"></i>
                                      </Button>
                                    )}
                                  </FormGroup>
                                </Col>
                              </Row>
                            ))}
                          </Form>
                        </div>
                      </TabPane>
                      <TabPane tabId={5}>
                        <Form>
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
                                  <h4>Drop images here or click to upload.</h4>
                                </div>
                              </div>
                            )}
                          </Dropzone>
                          <div
                            className="dropzone-previews mt-3"
                            id="file-previews"
                          >
                            {projectform.proimage.map((f, i) => {
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
                        </Form>
                      </TabPane>
                      <TabPane tabId={6}>
                        <div style={{ marginTop: "50px" }}>
                          <Form>
                            {companies.rows.map((item, idex) => (
                              <Row>
                                <Col md={1}></Col>
                                <Col md={4}>
                                  <FormGroup>
                                    <Input
                                      id="companyname"
                                      name="companyname"
                                      type="text"
                                      placeholder="Company Name"
                                      value={companies.rows[idex].company_name}
                                      onChange={handleChangeCompany(idex)}
                                      className="form-control"
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md={4}>
                                  <FormGroup>
                                    <Input
                                      id="companylogo"
                                      name="companylogo"
                                      type="text"
                                      placeholder="Company Logo"
                                      className="form-control"
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md={3}>
                                  <FormGroup>
                                    {idex === 0 ? (
                                      <Button
                                        color="primary"
                                        type="button"
                                        className="waves-effect waves-light mr-1"
                                        onClick={(event) =>
                                          handleAddCompanyRow(idex)
                                        }
                                      >
                                        <i className="fas fa-plus fa-1x"></i>
                                      </Button>
                                    ) : (
                                      <Button
                                        color="primary"
                                        type="button"
                                        className="waves-effect waves-light mr-1"
                                        onClick={(event) =>
                                          handleRemoveCompanyRow(idex)
                                        }
                                      >
                                        <i className="fas fa-minus fa-1x"></i>
                                      </Button>
                                    )}
                                  </FormGroup>
                                </Col>
                              </Row>
                            ))}
                          </Form>
                          <div className="text-center mt-4">
                            <Button
                              color="primary"
                              type="submit"
                              className="mr-2 waves-effect waves-light"
                            >
                              Save Changes
                            </Button>
                            <Button
                              color="light"
                              type="submit"
                              className="waves-effect ml-1"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </TabPane>
                    </TabContent>
                    <ul className="pager wizard twitter-bs-wizard-pager-link">
                      <li
                        className={
                          activeTabProgress === 1
                            ? "previous disabled"
                            : "previous"
                        }
                      >
                        <Link
                          to="#"
                          onClick={() => {
                            toggleTabProgress(activeTabProgress - 1);
                          }}
                        >
                          Previous
                        </Link>
                      </li>
                      <li
                        className={
                          activeTabProgress === 6 ? "next disabled" : "next"
                        }
                      >
                        <Link
                          to="#"
                          onClick={() => {
                            toggleTabProgress(activeTabProgress + 1);
                          }}
                        >
                          Next
                        </Link>
                      </li>
                    </ul>
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
})(AddProject);
