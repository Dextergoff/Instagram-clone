const UserExists = ({loading, userobj}) => {
    
    const checkuser = Boolean(!(loading) && userobj)
    return(
        checkuser
    )
}

export default UserExists