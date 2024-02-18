import { useMyContext } from "@/context/transitroute-context";
import InputForm from "@/components/InputForm";
import CurrentMap from "@/components/CurrentMap";
import styles from "./place.module.css";


const Place = () => {
    const { state, updateState } = useMyContext();
    console.log(state);
    return(
      <div className={styles.container}>
            <div className={styles.left}>
                <InputForm/>
            </div>
            <div className={styles.right}>
                <CurrentMap/>
            </div>
        </div>
 
    )
}

export default Place;