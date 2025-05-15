import {Link} from 'react-router-dom';
function Dashboard_header(){
    return (
        <>
        <header className="dashboard_header">
            <h1><span>Dash</span>Board</h1>
            <ul>
                <li><Link to={'/staff/dashboard'} className='dash_list'>Home</Link></li>
                <li><Link to={'/staff/dashboard'} className='dash_list'>Report</Link></li>
                <li><Link to={'/staff/dashboard'} className='dash_list'>update</Link></li>
            </ul>
        </header>
        </>
    )
}

export default Dashboard_header;