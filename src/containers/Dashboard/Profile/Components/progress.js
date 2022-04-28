import { Progress } from "antd";

const ProgressProfile = ({ record }) => {
  switch (record) {
    case "cvnew":
      return (
        <Progress
          type="circle"
          width={35}
          strokeWidth={15}
          strokeLinecap="square"
          percent={0}
        />
      );
    case "phone":
      return (
        <Progress
          type="circle"
          percent={20}
          width={35}
          strokeWidth={15}
          strokeLinecap="square"
        />
      );
    case "test":
      return (
        <Progress
          type="circle"
          percent={50}
          width={35}
          strokeWidth={15}
          strokeLinecap="square"
        />
      );
    case "interview":
      return (
        <Progress
          type="circle"
          percent={80}
          width={35}
          strokeWidth={15}
          strokeLinecap="square"
        />
      );
    case "offer":
      return (
        <Progress
          type="circle"
          percent={100}
          width={35}
          strokeWidth={15}
          strokeLinecap="square"
          strokeColor="#ff0000"
        />
      );
    default:
      break;
  }
};

export default ProgressProfile;
