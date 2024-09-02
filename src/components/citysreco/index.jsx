import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { toast } from "react-toastify";

export default function CityReco({ cidades }) {
    const [clima, setClima] = useState({});
    const [cidadesComClima, setCidadesComClima] = useState([]);

    const climaApi = async (cidade) => {


        try {
            const response = await fetch("https://serverirpraia.onrender.com/cidade/" + cidade);
            if (!response.ok) {
                throw new Error("Erro ao buscar dados do clima");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    useEffect(() => {

        setCidadesComClima([])

        const fetchClima = async () => {
            for (const cidade of cidades) {
                const climaInfo = await climaApi(cidade.nome);
                if (climaInfo) {
                    setClima(prevClima => ({ ...prevClima, [cidade.id]: climaInfo }));
                    setCidadesComClima(prevCidades => [...prevCidades, cidade]);
                }
            }
        };

        fetchClima();
    }, [cidades]);

    // Função para verificar se o clima é bom para praia
    const eBomParaPraia = (info) => {
        const temperaturaMinima = 20; // Exemplo: mínima ideal de 20°C
        const temperaturaMaxima = 30; // Exemplo: máxima ideal de 30°C
        return info.temperatura >= temperaturaMinima && info.temperatura <= temperaturaMaxima;
    };

    return (
        <div className="recomendados">
            {cidadesComClima.map((cidade, index) => (
                <motion.div
                    key={cidade.id}
                    initial={{ scale: 0 }} // Começa com o elemento invisível
                    animate={{ scale: 1 }} // Aumenta para o tamanho normal ao aparecer
                    transition={{
                        type: "tween",
                        stiffness: 300,
                        delay: index * 0.1 // Atraso crescente para cada item
                    }} // Transição com efeito de mola
                    className={`city ${eBomParaPraia(clima[cidade.id]) ? 'bom-para-praia' : ''}`}
                >
                    <h2>{cidade.nome}</h2>
                    <div className="infos">
                        <span>Temperatura: {clima[cidade.id].temperatura}</span>
                        <span>Descrição: {clima[cidade.id].descricao}</span>
                        <span>Vento: {clima[cidade.id].vento}</span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
