import CurrentMap from "@/components/CurrentMap";
import InputForm from "@/components/InputForm";
import { GoogleMap, useLoadScript, DirectionsRenderer } from "@react-google-maps/api";

export default function Maps() {
    return(
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: '100',
        }}>
          <InputForm />
        </div>
        <CurrentMap />
      </div>   
    )
  }