import React from 'react';

function BookNavigation(props){

    const {page, totalPages} = props;

    const prevPage = (e) => {
        e.preventDefault();
        if (page > 1){
            props.prevPage();
        }
    }
    const nextPage = (e) => {
        e.preventDefault();
        if (page <= totalPages){
            props.nextPage();
        }
    }
    return (
        <div className="form-row">
            <div className="form-group col-md-6">
                <button type="button" className="btn btn-primary" disabled={page===1} onClick={prevPage}>Prev</button>
            </div>
            <div className="form-group col-md-6">
                <button type="button" className="btn btn-primary" disabled={page===totalPages}  onClick={nextPage}>Next</button>
            </div>
        </div>
    );
}
export default BookNavigation;