import React from "react";
import Tasks from "./components/Tasks";
import Header from "./components/Header";
import { Card } from "antd";

const App: React.FC = () => {
  return (
    <div className="w-full flex flex-col mt-10 gap-10 items-center justify-center">
      <Card title="Todo" style={{ width: 800 }}>
        <div className="flex flex-col gap-10">
          <Header />
          <Tasks />
        </div>
      </Card>
    </div>
  );
};

export default App;
