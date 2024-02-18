import { useMyContext } from "@/context/transitroute-context";
import InputForm from "@/components/InputForm";
import CurrentMap from "@/components/CurrentMap";

const Place = () => {
    const { state, updateState } = useMyContext();
    console.log(state);
    return(
        <>
        <div><InputForm/></div>
        <div><CurrentMap/></div>
        </>
    )
}

export default Place;