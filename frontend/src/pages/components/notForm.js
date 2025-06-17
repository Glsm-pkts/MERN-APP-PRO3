import React from 'react';

const NotForm = ({ onNotEklendi }) => {
    const [baslik, setBaslik] = React.useState('');
    const [aciklama, setAciklama] = React.useState('');
    const [hata, setHata] = React.useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const not = { baslik, aciklama };

        try {
            const response = await fetch('/api/notlar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(not),
            });

            const json = await response.json();

            if (response.ok) {
                console.log('Not eklendi:', json);
                setBaslik('');
                setAciklama('');
                setHata(null);

                if (onNotEklendi) {
                    onNotEklendi(); // 🔄 Not eklendikten sonra listeyi güncelle
                }
            } else {
                console.error('Not eklenemedi:', json);
                setHata(json.error || 'Not eklenemedi');
            }
        } catch (error) {
            console.error('Fetch hatası:', error);
            setHata('Sunucuya bağlanılamadı');
        }
    };

    return (
        <div>
            <form className='create' onSubmit={handleSubmit}>
                <h3>Yeni Not Ekle</h3>
                <div className="create-group">
                    <div>
                        <label htmlFor="baslik">Başlık:</label>
                        <input
                            type="text"
                            id="baslik"
                            value={baslik}
                            onChange={(e) => setBaslik(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="aciklama">Açıklama:</label>
                        <textarea
                            id="aciklama"
                            value={aciklama}
                            onChange={(e) => setAciklama(e.target.value)}
                            required
                        ></textarea>
                    </div>
                </div>
                <button type="submit">Not Ekle</button>
                {hata && <p className="error">{hata}</p>}
            </form>
        </div>
    );
};

export default NotForm;
