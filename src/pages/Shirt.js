import useSWR from "swr";
import { Card, Col, Row } from "antd";

import { AppstoreAddOutlined } from "@ant-design/icons";

const { Meta } = Card;

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Shirt() {
  const {
    data: shirts,
    error,
    isValidating,
  } = useSWR("https://60cfa5e34a030f0017f67e29.mockapi.io/shirts", fetcher);

  // Handles error and loading state
  if (error) return <div className="failed">failed to load</div>;
  if (isValidating) return <div className="Loading">Loading...</div>;

  return (
    <>
      <Row gutter={80}>
        {shirts &&
          shirts.map((value, index) => (
            <Col key={index} style={{ marginBottom: 50 }}>
              <Card
                style={{ width: 240 }}
                hoverable
                cover={
                  <img
                    style={{ width: 240, height: 200 }}
                    alt={value.name}
                    src={value.img}
                  />
                }
                actions={[<AppstoreAddOutlined key="buy" />]}
              >
                <Meta
                  title={value.name}
                  description={`Price: ${value.price}`}
                />
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
}

export default Shirt;
