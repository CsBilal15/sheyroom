import React from "react";

const Success = ({ messege }) => {
  return (
    <div>
      <div class="alert alert-success " role="alert">
        {messege}
      </div>
    </div>
  );
};

export default Success;
