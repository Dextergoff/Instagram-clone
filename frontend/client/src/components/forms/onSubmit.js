const onSubmit = ({username, email, password, dispatch, e, endpoint}) => {
    e.preventDefault();
    try{ 
        dispatch(endpoint({ username, password, email }));
    }catch(err){
        return(err)
    }
}
export default onSubmit