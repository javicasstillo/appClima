import { useState } from "react"
import '../App.css'
import temperatura from '../assets/temperatura.png';
import humedad from '../assets/humedad.png';
import viento from '../assets/viento.png';
import icono from '../assets/icono.png';



function Clima(){

    const [clima, setClima] = useState({
        weather: [],
        name: "",
        main: {},
        wind: {}
    });

    const [error, setError] = useState("")
    const [inputValor, setInputValor] = useState("")

    const apiKey = "32968dc17635ac0ac7a57f6a411c6860"

    const valorExtraer = (e)=>{
        setInputValor(e.target.value)
    }

    const obtenerClima = async (e)=>{
        e.preventDefault()
        const respuestaClima = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValor}&appid=${apiKey}&lang=es&units=metric`);
        if (respuestaClima.status === 200){
            const respuestaFinalClima = await respuestaClima.json()
            setClima(respuestaFinalClima)
            setError("")
            setInputValor("")
        } else if (respuestaClima.status === 404){
            setError("Ciudad inexistente")
            setClima({
                weather: [],
                name: "",
                main: {},
                wind: {}
            })
            setInputValor("")
        } else{
            setError("Ocurrio un error inesperado. Intente de nuevo mas tarde.")
            setClima({
                weather: [],
                name: "",
                main: {},
                wind: {}
            })
            setInputValor("")
        }
    }

    return <main className="bg-white fondo d-flex flex-column align-items-center justify-content-center text-center py-5">
        <div className="container transparencia sombra py-3">
            
            <div className="d-flex justify-content-center mb-3 gap-3">
                <h1 className="text-center titulo">Clima App </h1>

            </div>

            <p className="lead">¡Ingrese una ciudad para obtener su clima!</p>
            
        <form className="d-flex justify-content-center gap-3">
            <input type="text" onChange={valorExtraer} value={inputValor} />
            <button className="btn btn-dark titulo" onClick={obtenerClima}>Consultar</button>
        </form>

        {error && (
            <p className= "mt-3">{error}</p>
        )}

        {clima.name && (
            <div className=" mb-3">
        
            <h3 className="w-100 mt-3 mb-3">{clima.name}</h3>
       
            <div className="row justify-content-center gy-3">
                <div className="col-12">
                    <div className="redondeado border-0">
                        <div className="d-flex justify-content-center py-3 align-items-center">
                            <img src={temperatura} className="imagen" alt="termometro" />
                            <h3 className="mb-0 mt-3">{clima.main.temp}º</h3>
                        </div>
                    </div>
                </div>

                <div className="col-6">
                    <div className="redondeado border-0">
                        <div className="d-flex flex-column justify-content-center py-3 align-items-center">
                            <p>Humedad</p>
                            <img src={humedad} className="imagen2" alt="humedad" />
                            <p className="mb-0 mt-3">{clima.main.humidity}%</p>
                        </div>
                    </div>
                </div> 

                <div className="col-6">
                    <div className="redondeado border-0">
                        <div className="d-flex flex-column justify-content-center py-3 align-items-center">
                            <p>Viento</p>
                            <img src={viento} className="imagen2" alt="viento" />
                            <p className="text-subtle mb-0 mt-3">{clima.wind.speed}m/s</p>
                        </div>
                    </div>
                </div>
            </div>

            {clima.weather.map((item, i)=>{
                return <div key={i} className="mt-4 text-center">
                    <p>{"Descripcion: " + item.description}</p>
                </div>

            })}
        </div>
        )}
        
            <hr />
            <p className="text-center mb-0">&copy; Desarrollado por: Javier Castillo</p>
        
        </div>
        
    </main>
        
}

export default Clima