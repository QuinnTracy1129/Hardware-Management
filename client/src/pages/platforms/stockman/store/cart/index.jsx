import React, { useEffect, useState } from "react";
import { BROWSE } from "../../../../../services/redux/slices/cart";
import {
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBBtn,
  MDBIcon,
  MDBModalFooter,
} from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import Table from "./table";

const Cart = ({ show, toggle }) => {
  const { token } = useSelector(({ auth }) => auth),
    { collections } = useSelector(({ cart }) => cart),
    [cart, setCart] = useState([]),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(BROWSE({ token }));
  }, [dispatch, token]);

  useEffect(() => {
    setCart(collections);
  }, [collections]);
  return (
    <MDBModal
      isOpen={show}
      toggle={() => toggle()}
      size="lg"
      className="modal-notify modal-primary"
      fullHeight
      position="right"
    >
      <MDBModalHeader tag="p" toggle={() => toggle()} titleClass="heading lead">
        <MDBIcon icon="shopping-cart" className="mr-2" />
        Shoppping Cart
      </MDBModalHeader>
      <MDBModalBody>
        <Table cart={cart} />
      </MDBModalBody>
      <MDBModalFooter className="d-flex justify-content-end">
        <MDBBtn color="primary" outline>
          <span>
            Check Out
            <i className="fas fa-long-arrow-alt-right ms-2"></i>
          </span>
        </MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  );
};

export default Cart;
