import './App.css';

import { useEffect, useState } from 'react';

const App = () => {
  const [selectedMovie, setSelectedMovie] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const reservedSeats = [5, 10, 15]; // Örnek olarak 5., 10. ve 15. koltukları rezerve edilmiş olarak kabul edelim

    const seats = document.querySelectorAll('.seat:not(.reserved)');
    const container = document.querySelector('.container');
    const count = document.getElementById('count');
    const amount = document.getElementById('amount');
    const select = document.getElementById('movie');

    const calculateTotal = () => {
      const selectedSeats = container.querySelectorAll('.seat.selected');
      const selectedSeatsArr = Array.from(selectedSeats);
      const seatsArr = Array.from(seats);

      let selectedSeatIndexs = selectedSeatsArr.map(seat => seatsArr.indexOf(seat));

      let selectedSeatCount = selectedSeats.length;
      count.innerText = selectedSeatCount;
      amount.innerText = selectedSeatCount * select.value;

      saveToLocalStorage(selectedSeatIndexs);
    };

    const saveToLocalStorage = (indexs) => {
      localStorage.setItem('selectedSeats', JSON.stringify(indexs));
      localStorage.setItem('selectedMovieIndex', select.selectedIndex);
    };

    container.addEventListener('click', function (e) {
      if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected');
        calculateTotal();
      }
    });

    select.addEventListener('change', function (e) {
      seats.forEach(function (seat) {
        if (seat.classList.contains('selected')) {
          seat.classList.remove('selected');
        }
      });
      calculateTotal();
    });

    // Sayfa yüklendiğinde seçili koltukları temizle
    document.querySelectorAll('.seat.selected').forEach(seat => {
      seat.classList.remove('selected');
    });

    reservedSeats.forEach(seatNumber => {
      const seat = document.querySelector(`.seat:nth-child(${seatNumber})`);
      seat.classList.add('reserved');
    });
  }, []); // useEffect sadece bir kere çalışsın diye boş dependency array kullandık.

  return (
    <div>
      <h1>Sinema Rezervasyon</h1>
      <p>Devam etmek için koltuk seçiniz</p>

      <div className="container">
        <div className="screen"></div>
        {[...Array(5)].map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {[...Array(16)].map((_, seatIndex) => (
              <div key={seatIndex} className="seat"></div>
            ))}
          </div>
        ))}
      </div>

      <div className="movie-list">
        <select id="movie" value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)}>
          <option disabled>Film Seçiniz</option>
          <option value="20">Oppenheimer</option>
          <option value="22">Barbie</option>
          <option value="25">Mission Impossible</option>
        </select>
      </div>

      <ul className="info">
        <li>
          <div className="seat selected"></div>
          <small>Seçili</small>
        </li>
        <li>
          <div className="seat"></div>
          <small>Boş</small>
        </li>
        <li>
          <div className="seat reserved"></div>
          <small>Dolu</small>
        </li>
      </ul>

      <p className="text">
        <span id="count">3</span> adet koltuk için hesaplanan ücret <span id="amount">60</span> TL.
      </p>
    </div>
  );
};

export default App;
