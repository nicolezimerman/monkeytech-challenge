import "./HeaderInfo.css";
import ticketIcon from "../../assets/ticket.png";
import arrowIcon from "../../assets/arrow.png";
import clockIcon from "../../assets/clock.png";

import Icon from "../Icon/Icon";

const HeaderInfo = ({ src, text }) => {
  return (
    <div className="header-data">
      <div className="box">
        <Icon>
          <img className="big-icon" src={ticketIcon} />
        </Icon>
        Enter your park ticket #PIN number, then select the desired ride while
        nothing the stated return time
      </div>
      <div className="box">
        <Icon>
          <img className="big-icon" src={arrowIcon} />
        </Icon>
        Press 'submit' to confirm and retrieve your access code
      </div>
      <div className="box">
        <Icon>
          <img className="big-icon" src={clockIcon} />
        </Icon>
        When the time comes, use the special FastRider line to cut out a
        considerable wait time
      </div>
    </div>
  );
};

export default HeaderInfo;
