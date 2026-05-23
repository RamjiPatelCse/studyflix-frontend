import { useLocation } from "react-router-dom";

export default function Watch() {

  const location = useLocation();

  const params =
    new URLSearchParams(
      location.search
    );

  const url =
    params.get("url");

  if(!url){

    return (
      <h1
        style={{
          color:"#fff"
        }}
      >
        Loading...
      </h1>
    );

  }

  return(

    <iframe

      src={decodeURIComponent(url)}

      width="100%"

      height="100%"

      style={{
        position:"fixed",
        top:0,
        left:0,
        border:"none",
        background:"#000"
      }}

      allowFullScreen

    />

  );
}
