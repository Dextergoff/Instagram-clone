import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const MessageBtn = ({ target, size }) => {
  return (
    <Link
      className="comments-link text-muted fw-light text-decoration-none"
      to={`/dm/`}
      state={{
        target_user: target,
      }}
    >
      <FontAwesomeIcon
        size={size}
        className="text-light"
        icon="fa-regular fa-paper-plane"
      />
    </Link>
  );
};

export default MessageBtn;
