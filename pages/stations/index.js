import { getHomeLayout } from "@/layout/HomeLayout";
import StationHome from "@/modules/stations/StationHome";

function StationPage({ stations }) {
  return (
    <StationHome stations={stations}/>
  )
}

StationPage.getLayout = getHomeLayout;
export default StationPage;