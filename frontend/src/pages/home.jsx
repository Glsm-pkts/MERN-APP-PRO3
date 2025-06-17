import { useEffect, useState } from "react";
import NotDetay from "./components/notDetay";
import NotForm from "./components/notForm";

const Home = () => {
    const [notlar, setNotlar] = useState([]);

    const fetchNotlar = async () => {
        try {
            const response = await fetch('/api/notlar');
            const json = await response.json();
            if (response.ok) {
                setNotlar(json);
            } else {
                console.error("Sunucu hatası:", json);
            }
        } catch (err) {
            console.error("Fetch hatası:", err);
        }
    };

    useEffect(() => {
        fetchNotlar();
    }, []);

    return (
        <div className='home'>
            <div className="not-form">
                <NotForm onNotEklendi={fetchNotlar} />
            </div>
            <h2>Notlar</h2>
            <div className="notlar">
                {notlar.length > 0 ? (
                    notlar.map((not) => (
                        <NotDetay key={not._id} not={not} />
                    ))
                ) : (
                    <p>Hiç not bulunamadı.</p>
                )}
            </div>
        </div>
    );
};

export default Home;
