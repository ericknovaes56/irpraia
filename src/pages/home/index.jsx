import SearchBar from "../../components/searchhbar";
import '../../assets/css/app.css'
import CityReco from "../../components/citysreco";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
export default function Home(){


    const [cidades, setCidade] = useState([])
    const [load, setLoad] = useState(false)
    const setarEstados = (estado) =>{
        reqApi(estado)
    }

    const reqApi = async (estado) => {

        setCidade([])

        try {

            setLoad(true)

            const response = await fetch("http://localhost:3000/estados/"+estado)
            const data = await response.json()

            if (response.ok){
                if (data.length > 0){
                    toast.success("Achei... só mais um pouco !")
                    setCidade([...data])
                }else{
                    setLoad(false)
                    toast.error("Não achei essa !")
                }
            }else{
                setLoad(false)
                throw new Error(data)
            }

            setLoad(false)

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <main>
            <ToastContainer />
            <SearchBar load={load} setarEstados={setarEstados}/>
            <CityReco  cidades={cidades}/>
        </main>
    )
}