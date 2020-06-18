import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";

class DatatablePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateCases: props.items,
    };
  }

  setData = () => {
    let data2 = {
      columns: [
        {
          label: "Place",
          field: "name",
          sort: "asc",
          width: 150,
        },
        {
          label: "Cases Reported",
          field: "casesReported",
          sort: "asc",
          width: 200,
        },
        {
          label: "Range",
          field: "range",
          sort: "asc",
          width: 270,
        },
        // {
        //   label: "Community Transmission",
        //   field: "communityTransmission",
        //   sort: "asc",
        //   width: 270,
        // },
      ],
      rows: this.state.stateCases,
    };
    // console.log(data2);

    return data2;
  };

  render() {
    return (
      <div>
        <h3>COVID-19 Cases Information Table</h3>
        <p>Updated every 5 mins</p>
        <MDBDataTable bordered small data={this.setData()}></MDBDataTable>
      </div>
    );
  }
}

export default DatatablePage;
