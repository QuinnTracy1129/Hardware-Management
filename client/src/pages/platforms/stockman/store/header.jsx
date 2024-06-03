import React from "react";
import { MDBRow, MDBCol, MDBIcon, MDBInputGroup } from "mdbreact";
import { categories } from "../../../../services/fakeDb";

export const Header = ({ setShow, setIsViewProductInformation }) => {
  return (
    <MDBRow className=" d-flex align-items-center mt-3 p-3">
      <MDBCol md="2">
        <h6 style={{ fontWeight: 500 }}>Product List</h6>
      </MDBCol>
      <MDBCol className="d-flex justify-content-center">
        <MDBInputGroup material>
          <select
            className="form-control"
            style={{ height: 42, borderRadius: 20 }}
          >
            {categories.map((categorie, index) => (
              <option value={categorie} key={index}>
                {categorie}
              </option>
            ))}
          </select>
        </MDBInputGroup>
      </MDBCol>
      <MDBCol className="d-flex justify-content-end" md="4">
        <div className="cashier-search-cotaniner ">
          <form className="cashier-search">
            <input
              placeholder="Search..."
              autoCorrect="off"
              spellCheck={false}
            />
            <button type="submit">
              <MDBIcon icon={"search"} className="search-icon" />
            </button>
          </form>
        </div>
      </MDBCol>
    </MDBRow>
  );
};
