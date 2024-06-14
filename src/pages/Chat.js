import { useState } from "react";
import { Form, Input, Progress, Button } from "antd";
const { TextArea } = Input;

function Chat() {
  const [isTyping, setTyping] = useState(false);
  const [textCount, setTextCount] = useState(0);

  const twoColors = {
    "0%": "#00ff36",
    "100%": "#ff4747",
  };
  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <h1>Chat Page</h1>

      <Form layout="herizontal">
        <Form.Item label="Message">
          <TextArea
            maxLength="100"
            showCount
            placeholder="Say something...?"
            onChange={(e) => {
              setTextCount(e.target.value.length);
            }}
            onFocus={() => {
              setTyping(true);
            }}
            onBlur={() => {
              setTyping(false);
            }}
          />
        </Form.Item>
      </Form>

      {isTyping ? (
        <span style={{ color: "gray" }}>
          you are typing...
          <Progress percent={textCount} strokeColor={twoColors} />
        </span>
      ) : (
        ""
      )}
      <div style={{ textAlign: "right", marginTop: "10px" }}>
        <Button type="primary" disabled={textCount === 0 ? true : false}>
          Send
        </Button>
      </div>
    </div>
  );
}

export default Chat;
