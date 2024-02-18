import { useMyContext } from "@/context/transitroute-context";
import InputForm from "@/components/InputForm";
import CurrentMap from "@/components/CurrentMap";
import styles from "./place.module.css";
import DataDisplayComponent from "@/components/DataDisplayComponent";


const Place = () => {
    const { state, updateState } = useMyContext();
    console.log(state);
    return(
      <div className={styles.container}>
            <div className={styles.left}>
            <br/>
                <h1>High wait times due to snow?</h1>
                <h3>We've got you covered with an actual TTC shed all through your trip!</h3>
                <DataDisplayComponent data={state}/>
            </div>
            <div className={styles.right}>
                <CurrentMap/>
            </div>
        </div>
    )
}

export default Place;