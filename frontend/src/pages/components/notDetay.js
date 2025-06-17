import React from 'react';

const NotDetay = ({not}) => {
  return (
    <div className="not-detay">
      <h4>{not.baslik}</h4>
      <p>{not.aciklama}</p>
      <p><small>{new Date(not.createdAt).toLocaleDateString()}</small></p>
    </div>
  );
}

export default NotDetay;
