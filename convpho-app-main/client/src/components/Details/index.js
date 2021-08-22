import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

// components
import Labels from "./Labels";
import Faces from "./Faces";
import Objects from "./Objects";
import Colors from "./Colors";
import PhotoScore from "./PhotoScoring";
import Text from "./Text";
import app from "../../firebase";

import { CSVLink } from "react-csv";
import { useAuth } from "../../contexts/AuthContext";

const Details = ({ location }) => {
  const db = app.firestore();
  const { currentUser } = useAuth();

  const [data, setData] = useState();
  const [csvData, setCsvData] = useState();

  const history = useHistory();

  const trackDownload = async () => {
    console.log("Click on download");

    const downloadRef = db.collection("csv_downloads").doc();
    await downloadRef.set({
      download_by: currentUser.email,
      download_date: new Date(),
    });
  };

  useEffect(() => {
    if (!location.data) {
      history.push("/search");
    } else {
      console.log("location data -> ", location.data);
      console.log("csvData data -> ", location.csvData);
      setData(location.data);
      setCsvData(location.csvData);
    }
  }, [history, location]);
  return (
    <Container>
      <Row>
        <Col>
          {data && (
            <Container className="mt-3">
              <Row>
                <Col>
                  <CSVLink
                    data={csvData}
                    filename="stats.csv"
                    className="float-right"
                  >
                    <Button onClick={trackDownload}>Download CSV</Button>
                  </CSVLink>
                  {data && data.score && (
                    <PhotoScore photo_score={data.score} />
                  )}
                  {data && data.labels && (
                    <Labels labels={data.labels.labels_data} />
                  )}
                  {data && data.colors && (
                    <Colors colors={data.colors.colors_data} />
                  )}
                  {data && data.objects && (
                    <Objects objects={data.objects.objects_data} />
                  )}
                  {data && data.faces && (
                    <Faces
                      faces={data.faces.face_data}
                      faces_image_url={data.faces.face_image_url}
                    />
                  )}
                  {data && data.texts && (
                    <Text
                      texts={data.texts.text_data}
                      texts_image_url={data.texts.text_image}
                    />
                  )}
                </Col>
              </Row>
            </Container>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Details;
