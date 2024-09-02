import { useState } from "react"

export default function SearchBar({setarEstados , load}){


    const [estado, setEstado] = useState('')

    return (
        <div className="search">
            <input value={estado} onChange={(e)=> {setEstado(e.target.value)}} type="text" placeholder="Estado" />
            <button onClick={() => {    

                if (estado.trim() == '') return

                setarEstados(estado)}

            }>{load ? <i className='bx bx-loader-alt bx-spin' ></i> : <i className='bx bx-search'></i>}</button>
        </div>
    )
}