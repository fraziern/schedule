import React from "react";
import PropTypes from "prop-types";

function ErrorBar(props) {
  const { errors } = props;
  const errorList = errors.map((err, idx) => {
    return (
      <div className="errorbar-item" key={idx}>
        {err.message}
      </div>
    );
  });

  return <div className="errorbar">{errorList}</div>;
}

ErrorBar.propTypes = {
  errors: PropTypes.array
};

export default ErrorBar;
