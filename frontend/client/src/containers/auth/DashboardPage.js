import Layout from "modules/Layout";
import {useSelector} from 'react-redux'
const DashboardPage = () => {
    const {userobj, loading} = useSelector(state => state.user)
    return(
        <Layout title='Dashboard' content='Dashboard page'>
            {loading || userobj === null ? (
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ):(
                <>
                <h1>Dashboard</h1>
                <p>user Details</p>
                <ul>
                    <li>{userobj.first_name}</li>
                    <li>{userobj.last_name}</li>
                </ul>
                </>
            )}
        </Layout>
    );
};

export default DashboardPage;