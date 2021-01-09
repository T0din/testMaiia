/*
 * PhotosPage
 *
 * List all the features
 */
import React from "react";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import axios from "axios";

import H1 from "components/H1";
import messages from "./messages";
import List from "./List";
import ListItem from "./ListItem";
import ListItemTitle from "./ListItemTitle";

export default function PhotosPage() {
  const [arrayOfPhotos, setArrayOfPhotos] = React.useState([
    { photos: { title: "coucou" } },
  ]);
  const [pageNumber, setPageNumber] = React.useState(1);

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

  return (
    <div>
      <Helmet>
        <title>Photos Page</title>
        <meta
          name="description"
          content="Photos page of React.js Boilerplate application"
        />
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
              key={photo.title}
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
                <div style={{ fontWeight: "bold" }}>
                  <FormattedMessage {...messages.description} />
                </div>
                <div style={{ textAlign: "center" }}>{photo.title}</div>
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
          style={{ height: "30px" }}
        >
          {"<"}
        </button>
        <div style={{ height: "30px", paddingTop: "2px" }}>{pageNumber}</div>
        <button
          onClick={() => {
            setPageNumber(pageNumber + 1);
          }}
          style={{ height: "30px" }}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
