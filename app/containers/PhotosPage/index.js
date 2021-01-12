/*
 * PhotosPage
 *
 * Show all the products/photos
 */
import React, { memo } from "react";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import axios from "axios";

import PropTypes from "prop-types";
import { makeSelectLoading, makeSelectError } from "containers/App/selectors";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { useInjectReducer } from "utils/injectReducer";

import H1 from "components/H1";
import messages from "./messages";
import { addItemToCart, removeItemFromCart } from "./actions";
import { makeSelectCart } from "./selectors";
import reducer from "./reducer";
import de from "react-intl/locale-data/de";

const key = "photos";

export function PhotosPage({ cart, onAddItemToCart, onRemoveItemFromCart }) {
  useInjectReducer({ key, reducer });
  console.log(cart);
  const [arrayOfPhotos, setArrayOfPhotos] = React.useState([]);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [openCart, setOpenCart] = React.useState(false);
  let device = "desktop";

  const fetch = (page) => {
    const pageForAxios = page || 1;
    return axios
      .get(`http://localhost:3000/photos?_page=${pageForAxios}&_limit=15`)
      .then(function(response) {
        // handle success
        setArrayOfPhotos(response.data);
      });
  };

  React.useEffect(() => {
    fetch();
  }, []);

  React.useEffect(() => {
    fetch(pageNumber);
  }, [pageNumber]);

  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    device = "mobile";
  }

  return (
    <div>
      {!openCart ? (
        <div
          onClick={() => setOpenCart(true)}
          style={{
            position: "absolute",
            top: device === "desktop" ? "40px" : "2px",
            right: device === "desktop" ? "40px" : "2px",
            borderRadius: "20px",
            backgroundColor: "white",
            boxShadow: "0 2px 6px 0 #333333",
            marginBottom: "20px",
            marginRight: "10px",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          <img
            src="https://image.flaticon.com/icons/png/512/126/126083.png"
            width="30"
            height="30"
          />
          <div
            style={{
              textAlign: "center",
            }}
          >
            {cart.length}
          </div>
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            top: device === "desktop" ? "40px" : "2px",
            right: device === "desktop" ? "40px" : "2px",
            borderRadius: "20px",
            backgroundColor: "white",
            boxShadow: "0 2px 6px 0 #333333",
            marginBottom: "20px",
            marginRight: "10px",
            padding: "10px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignContent: "center",
          }}
        >
          <img
            src="https://image.flaticon.com/icons/png/512/126/126083.png"
            width="30"
            height="30"
          />
          <div
            style={{
              textAlign: "center",
            }}
          >
            Compteur : {cart.length}
          </div>

          {cart.map((item, index) => (
            <div key={`${item.id}-${index}`}>
              <div
                style={{
                  minHeight: "10px",
                  borderBottom: "1px solid black",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {`Id : ${item.id}`}
                <div
                  style={{
                    cursor: "pointer",
                    fontWeight: "bold",
                    color: "red",
                  }}
                  onClick={() => onRemoveItemFromCart(index)}
                >
                  x
                </div>
              </div>
            </div>
          ))}
          <div
            onClick={() => setOpenCart(false)}
            style={{
              width: "5px",
              height: "5px",
              cursor: "pointer",
              position: "absolute",
              top: "0",
              right: "10px",
              fontWeight: "bold",
            }}
          >
            x
          </div>
        </div>
      )}
      <Helmet>
        <title>Photos Page</title>
        <meta name="description" content="Photos page" />
      </Helmet>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <H1>
          <div style={{ textAlign: "center" }}>
            <FormattedMessage {...messages.photos} />
          </div>
        </H1>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {arrayOfPhotos.map((photo) => (
            <div
              style={{
                borderRadius: "20px",
                backgroundColor: "white",
                boxShadow: "0 2px 6px 0 #333333",
                position: "relative",
                width: "200px",
                marginBottom: "20px",
                marginRight: "10px",
                padding: "10px",
              }}
              key={photo.id}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <img
                  src={photo.thumbnailUrl}
                  width="150"
                  height="150"
                  alt={photo.title}
                />
                <div
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  <FormattedMessage {...messages.description} />
                </div>
                <div
                  style={{
                    textAlign: "center",
                    width: "180px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {photo.title}
                </div>
              </div>
              <div
                style={{
                  height: "15px",
                  textAlign: "center",
                  cursor: "pointer",
                  position: "absolute",
                  top: "0",
                  right: "0",
                }}
                onClick={() => onAddItemToCart(photo)}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/OOjs_UI_icon_add.svg/1024px-OOjs_UI_icon_add.svg.png"
                  width="30"
                  height="30"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <button
          disabled={pageNumber === 1}
          onClick={() => {
            setPageNumber(pageNumber - 1);
          }}
          style={{ height: "30px", marginRight: "5px" }}
        >
          {"<"}
        </button>
        <div style={{ height: "30px", paddingTop: "2px" }}>{pageNumber}</div>
        <button
          onClick={() => {
            setPageNumber(pageNumber + 1);
          }}
          style={{ height: "30px", marginLeft: "5px" }}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

PhotosPage.propTypes = {
  cart: PropTypes.array,
  addItemToCart: PropTypes.func,
  onRemoveItemFromCart: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  cart: makeSelectCart(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onAddItemToCart: (evt) => dispatch(addItemToCart(evt)),
    onRemoveItemFromCart: (evt) => dispatch(removeItemFromCart(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(PhotosPage);
