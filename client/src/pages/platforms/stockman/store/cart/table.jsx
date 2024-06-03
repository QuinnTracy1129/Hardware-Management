import { MDBBtn, MDBIcon, MDBTable } from "mdbreact";
import React from "react";
import { ENDPOINT } from "../../../../../services/utilities";
import "./table.css";

const Table = ({ cart }) => {
  return (
    <MDBTable>
      <thead>
        <tr>
          <th>Product </th>
          <th>Quantity/Kilo </th>
          <th>Action </th>
        </tr>
      </thead>
      <tbody>
        {cart.length > 0 &&
          cart.map((obj, index) => {
            const { product } = obj;
            const { media } = product;

            return (
              <tr key={index}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={`${ENDPOINT}/assets/products/${product._id}/${media.product[0].label}.jpg`}
                      height={"80px"}
                    />
                    <h6 className="multiline-ellipsis">{product.name}</h6>
                    <h6 className="ml-3">Variations:</h6>
                  </div>
                  <div></div>
                </td>
                <td>2</td>
                <td>
                  <MDBBtn color="danger" size="sm" rounded>
                    <MDBIcon icon="trash" />
                  </MDBBtn>
                </td>
              </tr>
            );
          })}
      </tbody>
    </MDBTable>
  );
};

export default Table;
