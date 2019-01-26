import React, { Component } from "react";
import Axios from "axios";
import Picky from "react-picky";
import "react-picky/dist/picky.css";

const bigList = [];

for (var i = 1; i <= 10; i++) {
  // bigList.push({ id: i, name: `Item ${i}`, isSelected: true });
  bigList.push(`Item ${i}`);
}

export default class TypesInGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      selectedGroup: "",
      sendDocsArray: [],
      reviewDocsArray: []
    };
  }

  selectSendDocsMultipleOption = value => {
    console.log("Val", value);
    this.setState({ sendDocsArray: value });
  };

  selectReviewDocsMultipleOption = value => {
    console.log("Val", value);
    this.setState({ reviewDocsArray: value });
  };

  componentDidMount = () => {
    Axios.get("http://localhost:8080/api/groups")
      .then(res => {
        this.setState({ groups: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
  goBack = () => {
    this.props.history.goBack();
  };

  showAllGroups = () => {
    if (this.state.groups.length === 0) {
      return (
        <option value="" disabled>
          No available groups...
        </option>
      );
    } else {
      let groupList = this.state.groups.map(g => {
        return (
          <option key={g.title} value={g.title}>
            {g.title}
          </option>
        );
      });

      return groupList;
    }
  };

  onValueChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="panel panel-primary">
            <div className="panel-body">
              <h3 className="text-on-pannel text-primary">
                <strong className="text-uppercase">Group Types</strong>
              </h3>
              <div className="mx-1">
                <span className="input-group-text group">
                  All available groups
                </span>
                <div className="input-group mb-1">
                  <select
                    className="form-control"
                    size="5"
                    onChange={this.onValueChangeHandler}
                    name="selectedGroup"
                  >
                    {this.showAllGroups()}
                  </select>
                </div>
                {/*  */}

                <div className="row">
                  <div className="col">
                    <h3 className="text-primary">
                      <strong>Send docs</strong>
                    </h3>
                    <Picky
                      value={this.state.sendDocsArray}
                      options={bigList}
                      onChange={this.selectSendDocsMultipleOption}
                      open={false}
                      valueKey="id"
                      labelKey="name"
                      multiple={true}
                      includeFilter={true}
                      dropdownHeight={200}
                    />
                  </div>
                  <div className="col">
                    <h3 className="text-primary">
                      <strong>Review docs</strong>
                    </h3>
                    <Picky
                      value={this.state.reviewDocsArray}
                      options={bigList}
                      onChange={this.selectReviewDocsMultipleOption}
                      open={false}
                      valueKey="id"
                      labelKey="name"
                      multiple={true}
                      includeSelectAll={true}
                      includeFilter={true}
                      dropdownHeight={200}
                    />
                  </div>
                </div>
              </div>
              {/*  */}
              <br />
              <div className="input-group mb-1">
                <button
                  type="buton"
                  className="btn btn-warning"
                  onClick={() => this.goBack()}
                >
                  Go back
                </button>
              </div>
            </div>
            <div className="mx-1" />
          </div>
        </div>
      </div>
    );
  }
}
