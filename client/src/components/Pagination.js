import '../style/pagination.css'
const { Link } = require("react-router-dom");

const Pagination = ({ count, page, per_page_post }) => {

    // console.log(page);
    const totalPage = Math.ceil((count / per_page_post));
    let start = page;
    const diff = totalPage - page;
    console.log(totalPage);
    if (diff <= 3) {
        start = totalPage - 3;
    }
    let end = start + 3;
    if (start <= 0) {
        start = 1;
    }
    // console.log(end);
    // console.log(start);
    const styles = {
        B1: "page",        
      }
    const makePageLink = () => {
        const storePage = [];
        for (let i = start; i <= end; i++) {
            storePage.push(<li className={`${styles.B1} ${ i == page ? 'activeLink' : '' }`} key={i}><Link className="linkTag" to={`/dashboard/${parseInt(i)}`}>{i}</Link></li>)
        }
        return storePage
    }
    return (
        <div className="pagination">
            {page ? makePageLink() : ''}
        </div>
    )
}

export default Pagination