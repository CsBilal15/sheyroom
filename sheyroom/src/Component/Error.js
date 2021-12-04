import React from "react";

const Error = ({ messege }) => {
  return (
    <div>
      <div class="alert alert-danger text-capitalize" role="alert">
        {messege}
      </div>
    </div>
  );
};

export default Error;
