import { Progress } from "antd";

const ProgressProfile = ({ record }) => {
  switch (record.step) {
    case "new":
      return (
        <Progress
          type="circle"
          width={35}
          strokeWidth={15}
          strokeLinecap="square"
          percent={0}
          strokeColor={
            record.status === "failed"
              ? "#ff0000"
              : record.status === "passed"
              ? "rgb(82 196 26)"
              : "#FF9800"
          }
        />
      );
    case "test":
      return (
        <Progress
          type="circle"
          percent={40}
          width={35}
          strokeWidth={15}
          strokeLinecap="square"
          strokeColor={
            record.status === "failed"
              ? "#ff0000"
              : record.status === "passed"
              ? "rgb(82 196 26)"
              : "#FF9800"
          }
        />
      );

    case "interview":
      return (
        <Progress
          type="circle"
          percent={60}
          width={35}
          strokeWidth={15}
          strokeLinecap="square"
          strokeColor={
            record.status === "failed"
              ? "#ff0000"
              : record.status === "passed"
              ? "rgb(82 196 26)"
              : "#FF9800"
          }
        />
      );
    case "confirm":
      return (
        <Progress
          type="circle"
          percent={80}
          width={35}
          strokeWidth={15}
          strokeLinecap="square"
          strokeColor={
            record.status === "failed"
              ? "#ff0000"
              : record.status === "passed"
              ? "rgb(82 196 26)"
              : "#FF9800"
          }
        />
      );
    case "consider":
      return (
        <Progress
          type="circle"
          percent={90}
          width={35}
          strokeWidth={15}
          strokeLinecap="square"
          strokeColor={
            record.status === "failed"
              ? "#ff0000"
              : record.status === "passed"
              ? "rgb(82 196 26)"
              : "#FF9800"
          }
        />
      );
    case "employee":
      return (
        <Progress
          type="circle"
          percent={100}
          width={35}
          strokeWidth={15}
          strokeLinecap="square"
          strokeColor={
            record.status === "failed"
              ? "#ff0000"
              : record.status === "passed"
              ? "rgb(82 196 26)"
              : "#FF9800"
          }
        />
      );
    case "reject":
      return (
        <Progress
          type="circle"
          percent={100}
          width={35}
          strokeWidth={15}
          strokeLinecap="square"
          status="exception"
          strokeColor={
            record.status === "failed"
              ? "#ff0000"
              : record.status === "passed"
              ? "rgb(82 196 26)"
              : "#FF9800"
          }
        />
      );
    default:
      break;
  }
};

export default ProgressProfile;
