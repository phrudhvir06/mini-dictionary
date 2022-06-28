import React from "react";
import PropTypes from 'prop-types';
import "./styles.css";

const Result = (props) => {
    const {data} = props;
    // Displaying the resulted definitions here
    return (
        <div className="main_result_div">           
            {data.map((mean) =>
                mean.meanings.map((item) =>
                    item.definitions.map((def,index) => (
                        <ul key={index}>
                            <li className="li_item">{def.definition}</li>
                        </ul>
                    ))
                )
            )}
        </div>
    )
}

Result.propTypes ={
    data: PropTypes.array,
}

export default Result