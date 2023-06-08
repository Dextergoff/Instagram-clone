import { useManageFollowersMutation } from "endpoints/rtkQuery/profileEndpoints";
import MessageBtn from "components/buttons/MessageBtn";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { splitApi } from "endpoints/rtkQuery/splitApi";
import UpdateFollowing from "./UpdateFollowing";
const FollowBtn = ({
  is_following,
  requested_user,
  userobj,
  page,
  queryName,
  queryArg,
  secondQueryArg,
}) => {
  const dispatch = useDispatch();
  const [manage_followers, result] = useManageFollowersMutation();
  const requested_user_pk = requested_user.pk;
  const pk = userobj.pk;
  const is_self = Boolean(userobj?.pk == requested_user.pk);
  useEffect(() => {
    if (result.data)
      UpdateFollowing({
        queryArg: queryArg,
        result: result,
        dispatch: dispatch,
        secondQueryArg: secondQueryArg,
        queryName: queryName,
        page: page,
        requested_user_pk: requested_user_pk,
      });
  }, [result]);

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
