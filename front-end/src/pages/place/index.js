import { useMyContext } from "@/context/transitroute-context";
import CurrentMap from "@/components/CurrentMap";
import styles from "./place.module.css";

const Place = () => {
    const { state, updateState } = useMyContext();
    console.log(state);
    return(
      <div className={styles.container}>
            <div className={styles.left}>
                <br/>
                <h1>High wait times due to snow?</h1>
                <h3>We've got you covered with an actual TTC shed all through your trip!</h3>
            </div>
            <div className={styles.right}>
                <CurrentMap route={state}/>
            </div>
        </div>
 
    )
}

export default Place;