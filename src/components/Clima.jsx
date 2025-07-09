import { useState } from "react"
import '../App.css'

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

    return <main className="bg-white d-flex flex-column align-items-center justify-content-center text-center py-5">
        <div className="container  bg-body-tertiary sombra py-3">
            
            <div className="d-flex justify-content-center mb-3 gap-3">
                <h1 className="text-center titulo">Clima App </h1>
                <img src="./src/assets/icono.png" alt="icono" className="icono" />

            </div>

            <p className="lead">¡Ingrese una ciudad para obtener su clima!</p>
            

        <form className="d-flex justify-content-center gap-3">
            <input type="text" onChange={valorExtraer} value={inputValor} />
            <button className="btn btn-primary titulo" onClick={obtenerClima}>Consultar</button>
        </form>

        <div className=" mb-3">

            <p className="text-danger mt-3">{error}</p>
            <h3 className="w-100 mb-4">{clima.name}</h3>
       
            <div className="row justify-content-center gy-3">
                <div className="col-auto">
                    <div className="card redondeado border-0">
                        <div className="d-flex flex-column justify-content-center py-3 align-items-center">
                            <img src="./src/assets/temperatura.png" className="imagen" alt="termometro" />
                            <p className="text-danger mb-0 mt-3">{clima.main.temp}º</p>
                        </div>
                    </div>
                </div>

                <div className="col-auto">
                    <div className="card redondeado border-0">
                        <div className="d-flex flex-column justify-content-center py-3 align-items-center">
                            <img src="./src/assets/humedad.png" className="imagen" alt="termometro" />
                            <p className="text-primary mb-0 mt-3">{clima.main.humidity}%</p>
                        </div>
                    </div>
                </div> 

                <div className="col-auto">
                    <div className="card redondeado border-0">
                        <div className="d-flex flex-column justify-content-center py-3 align-items-center">
                            <img src="./src/assets/viento.webp" className="imagen" alt="termometro" />
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
            <hr />
            <p className="text-center mb-0">&copy; Desarrollado por: Javier Castillo</p>
        
        </div>
        
    </main>
        
}

export default Clima