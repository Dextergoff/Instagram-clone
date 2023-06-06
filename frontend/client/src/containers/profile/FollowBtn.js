import { useManageFollowersMutation } from "endpoints/rtkQuery/profileEndpoints";
import MessageBtn from "components/buttons/MessageBtn";
const FollowBtn = ({ is_following, requested_user, userobj }) => {
  const [manage_followers] = useManageFollowersMutation();
  const requested_user_pk = requested_user.pk;
  const pk = userobj.pk;
  const is_self = Boolean(userobj?.pk == requested_user.pk);

  if (!is_self) {
    return (
      <>
        {!is_following ? (
          <div className="d-flex flex-row gap-2">
            <div
              onClick={() => manage_followers({ pk, requested_user_pk })}
              className="align-self-center btn btn-sm btn-primary"
            >
              Follow
            </div>

            <div className="align-self-center">
              <MessageBtn target={requested_user} size="sm" />
            </div>
          </div>
        ) : (
          <div className="d-flex flex-row gap-3">
            <div
              onClick={() => manage_followers({ pk, requested_user_pk })}
              className="align-self-center btn btn-sm btn-dark"
            >
              Following
            </div>

            <div className="align-self-center">
              <MessageBtn target={requested_user} size="sm" />
            </div>
          </div>
        )}
      </>
    );
  } else {
    <></>;
  }
};
export default FollowBtn;
