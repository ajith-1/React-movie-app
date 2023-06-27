import React from 'react'
import ReactPaginate from 'react-paginate';
import './Pagination.css';
import Content from '../Content/Content';

function Pagination({setPage,pageCount}) {

    const handlePageClick = (event) => {
       let currentPage=event.selected+1
       setPage(currentPage);
      };


  return (
    <>
    <Content>
    <div className='pagination-box'>
    <ReactPaginate
      nextLabel=" >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      previousLabel="< "
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-next"
      previousLinkClassName="page-link"
      nextClassName="page-next"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
      renderOnZeroPageCount={null}
    />
    </div>
    </Content>
  </>
  )
}

export default Pagination