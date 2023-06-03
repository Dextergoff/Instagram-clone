import { useGetMessagesQuery } from "endpoints/rtkQuery/messageEnpoints";
import LoadContent from "containers/posts/LoadContent";
import DisplayPfp from "components/Image/DisplayPfp";
import MessageWS from "./MessageWS";

const Messages = ({ states, room_name, userobj }) => {
  const state = states.state;
  const setState = states.setState;
  const { page } = state;
  const { data = [] } = useGetMessagesQuery({ room_name, page });

  if (data.data) {
    return (
      <div
        style={{
          overflow: "scroll",
          height: "100%",
        }}
      >
        <LoadContent data={data} states={{ state, setState }} />
        {data.data.map((message) => (
          <div
            key={message.pk}
            className={
              message.user.pk == userobj.pk
                ? "d-flex justify-content-end text-light mb-2 p-2"
                : "d-flex justify-content-start text-light mb-2 p-2"
            }
          >
            <div style={{ width: "fit-content" }} className="text-light">
              <div className="d-flex flex-row  gap-1 ">
                <div>
                  <div
                    className={
                      message.user.pk == userobj.pk
                        ? "bg-primary p-2 rounded-5 "
                        : "bg-dark p-2 rounded-5"
                    }
                  >
                    {message.message}
                  </div>
                  {/* TODO add dates */}
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
