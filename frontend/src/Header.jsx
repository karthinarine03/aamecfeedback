import logo from './images/aamec_logo.jpg'
import nba from './images/NBA.png'
import naac from './images/naac.jpg'
function Header(){
    return (
        <>
      <header className='student_page_header'>
        <img src={logo} width='120px' height='105px'></img>
        <div className='clg_layout'>
          <img src={nba} width='100px' height='80px'></img>
          <div className='clg_name'>
          <h1>
            ANJALAI AMMAL MAHALINGAM ENGINEERING COLLEGE
        </h1>
        <h2>
        KOVILVENNI-614 403, THIRUVARUR DISTRICT
        </h2>
        <h3>
        NAAC Accredited with “B” Grade & NBA(ECE, IT, MECH)
        </h3>
          </div>
          <img src={naac} width='120px' height='105px'></img>
        </div>
      </header>
    </>
    )
}
export default Header;