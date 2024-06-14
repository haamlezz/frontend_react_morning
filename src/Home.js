import { Input, Button } from "antd";

function Home() {
  return (
    <>
      <h1>Home Page</h1>
      <Input
        placeholder="Enter your email"
        disabled={false}
        size="large"
        showCount={true}
        maxLength="5"
      />

      <Button type="primary">Save</Button>
    </>
  );
}

export default Home;
