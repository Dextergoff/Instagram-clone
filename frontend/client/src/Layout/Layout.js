import Navbar from 'Navbar/Navbar';
import {Helmet} from 'react-helmet'

const Layout = ({title, content, children}) => (
    <>
        <Helmet>
        <style>{'body { background-color: #000; }'}</style>
            <title>{title}</title>
            <meta name='description' content={content}/>
        </Helmet>
        <Navbar/>
        <div className='container mt-5'>{children}</div>
    </>
)
export default Layout;