"use client";
import { Col, Row } from "antd";
import { RevenueChart, UpcomingEvents } from "@/components";

const Dashboard = () => {
  return (
    <div>
      <Row gutter={[32, 32]} className="mt-8">
        <Col xs={24} sm={24} xl={8} className="h-115">
          <UpcomingEvents />
        </Col>
        <Col xs={24} sm={24} xl={8} className="h-115">
          <RevenueChart />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
