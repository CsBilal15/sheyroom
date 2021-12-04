import React,{useState} from 'react'
import HashLoader from "react-spinners/HashLoader";
const Loader = () => {
    let [loading, setLoading] = useState(true);
    return (
        <div>
        <div className="sweet-loading text-center " style={{marginTop:"150px"}}>
     <HashLoader color='#000' loading={loading} css='' size={60} />
      </div>
        </div>
    )
}

export default Loader
