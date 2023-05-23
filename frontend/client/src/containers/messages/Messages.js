import UserDetails from "components/posts/UserDetails";
import { useGetMessagesQuery } from "endpoints/rtkQuery/messageEnpoints";
import LoadContent from "components/posts/LoadContent";
import { useState } from "react";
import DisplayPfp from "components/Image/DisplayPfp";
import { splitApi } from "endpoints/rtkQuery/splitApi";
const Messages = ({ calc_room }) => {
  const [state, setState] = useState({
    page: 1,
  });
  const { page } = state;
  const { data = [] } = useGetMessagesQuery({ calc_room, page });

  if (data.data) {
    return (
      <div style={{ maxHeight: "95vw", height: "90vh" }}>
        <LoadContent data={data} states={{ state, setState }} />
        {data.data.map((message) => (
          <div key={message.pk} className="d-flex justify-content-start">
            <div
              style={{ width: "fit-content" }}
              className="p-2 text-light pl-2"
            >
              <div className="d-flex align-items-center gap-1 ">
                <DisplayPfp
                  style={{
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "100%",
                  }}
                  pfp={process.env.REACT_APP_API_URL + message.user.pfp}
                />
                <div>
                  <div className="text-center text-light ">
                    {message.user.username}
                  </div>
                  <div className="">{message.message}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
};
export default Messages;
