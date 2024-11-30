import React from "react";
import "./carrossel.css"
import Slider from 'react-slick'
import { MOVIE_DB_IMAGE_URL } from '../../constants'
import { useNavigate } from "react-router-dom";

const Carrossel = ({ movies }) => {
  const navigate = useNavigate()

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 912,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  }

  return (
    <div className="carrossel-container">
      <Slider {...settings}>
        {movies.map((movie, index) => (
          <div key={index} className="carrossel-card">
            <div className='card-filme'>
              <img className='card-image' src={`${MOVIE_DB_IMAGE_URL}${movie.poster_path}`} alt={movie.title} width={120} />
              <p className='card-title'>{movie.title}</p>
              <button className='card-button' onClick={() => navigate(`/detalhes/${movie.id}`)}>Ver detalhes</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Carrossel