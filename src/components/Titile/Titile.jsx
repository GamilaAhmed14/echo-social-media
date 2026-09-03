import { Helmet } from "react-helmet";


export default function Titile({tit}) {
  return (
    <>
    <Helmet>
         <title>{tit}</title>
    </Helmet>
    </>
  )
}
