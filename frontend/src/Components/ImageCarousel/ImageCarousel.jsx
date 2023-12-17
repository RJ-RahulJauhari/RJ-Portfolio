import React from 'react'
import './ImageCarousel.scss'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const ImageCarousel = ({images,width,swipeble,axis, autoplay,transitionTime, interval,onItemClick,onChange,stopOnHover,infiniteLoop, centerMode}) => {
  return (
      <Carousel className='carousel' dynamicHeight={true} images={images} axis={axis} transitionTime={transitionTime} swipeable={swipeble} width={width} centerMode={centerMode} interval={interval} autoPlay={autoplay} stopOnHover={stopOnHover} infiniteLoop={infiniteLoop}>

        {
            images
            ? images.map((image,index) => {
                return <div className='images' key={index}>
                    <img src={image} onClick={() => {}} />
                    {/* {
                        image.caption
                        ?<p className="legend">Legend 1</p>
                        : ''
                    } */}
                </div>
            })
            : ''
        }
      </Carousel>
  )
}

export default ImageCarousel
