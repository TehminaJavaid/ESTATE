import React, { Component } from "react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withNamespaces } from "react-i18next";

import { connect } from "react-redux";
import {
  changeLayout,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarType,
  changePreloader,
} from "../../store/actions";

class SidebarContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.initMenu();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.type !== prevProps.type) {
        this.initMenu();
      }
    }
  }

  initMenu() {
    new MetisMenu("#side-menu");

    var matchingMenuItem = null;
    var ul = document.getElementById("side-menu");
    var items = ul.getElementsByTagName("a");
    for (var i = 0; i < items.length; ++i) {
      if (this.props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }
  }

  activateParentDropdown = (item) => {
    item.classList.add("active");
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show");

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add("mm-active");
          }
        }
      }
      return false;
    }
    return false;
  };

  render() {
    return (
      <React.Fragment>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{this.props.t("Menu")}</li>

            <li>
              <Link to="/dashboard" className="waves-effect">
                <i className="ri-dashboard-line"></i>
                <span></span>
                <span className="ml-1">{this.props.t("Dashboard")}</span>
              </Link>
            </li>
            <li>
              <Link to="/property" className=" waves-effect">
                <i className="fas fa-home"></i>
                <span className="ml-1">{this.props.t("Property")}</span>
              </Link>
            </li>
            <li>
              <Link to="/project" className="waves-effect">
                <i className="fas fa-tasks"></i>

                <span className="ml-1">{this.props.t("Project")}</span>
              </Link>
            </li>

            <li>
              <Link to="/role" className=" waves-effect">
                <i className="ri-user-fill"></i>
                <span className="ml-1">{this.props.t("Role")}</span>
              </Link>
            </li>

            <li>
              <Link to="users" className=" waves-effect">
                <i className="ri-group-fill"></i>
                <span className="ml-1">{this.props.t("Users")}</span>
              </Link>
            </li>
            <li>
              <Link to="products" className=" waves-effect">
                <i className=" ri-file-list-fill"></i>
                <span className="ml-1">{this.props.t("Products")}</span>
              </Link>
            </li>
            <li>
              <Link to="invoices" className=" waves-effect">
                <i className=" ri-file-paper-2-fill"></i>
                <span className="ml-1">{this.props.t("Invoices")}</span>
              </Link>
            </li>
            <li>
              <Link to="salesorders" className=" waves-effect">
                <i className=" ri-file-copy-2-fill"></i>
                <span className="ml-1">{this.props.t("Salesorders")}</span>
              </Link>
            </li>

            <li>
              <Link to="leads" className=" waves-effect">
                <i className=" ri-article-fill"></i>
                <span className="ml-1">{this.props.t("Leads")}</span>
              </Link>
            </li>
            <li>
              <Link to="opportunitiess" className=" waves-effect">
                <i className="fas fa-money-bill"></i>
                <span className="ml-1">{this.props.t("Opportunities")}</span>
              </Link>
            </li>
            <li>
              <Link to="contacts" className=" waves-effect">
                <i className="ri-contacts-book-2-fill"></i>
                <span className="ml-1">{this.props.t("Contacts")}</span>
              </Link>
            </li>
            <li>
              <Link to="quotes" className=" waves-effect">
                <i className="ri-chat-1-line"></i>
                <span className="ml-1">{this.props.t("Quotes")}</span>
              </Link>
            </li>
            <li>
              <Link to="calls" className=" waves-effect">
                <i className="ri-phone-fill"></i>
                <span className="ml-1">{this.props.t("Calls")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  return { ...state.Layout };
};

export default withRouter(
  connect(mapStatetoProps, {
    changeLayout,
    changeSidebarTheme,
    changeSidebarType,
    changeLayoutWidth,
    changePreloader,
  })(withNamespaces()(SidebarContent))
);
