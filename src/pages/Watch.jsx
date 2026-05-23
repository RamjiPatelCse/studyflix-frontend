import { useRouter } from "next/router";

export default function Watch(){

  const router = useRouter();

  const { url } = router.query;

  if(!url){

    return <h1>Loading...</h1>;

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
