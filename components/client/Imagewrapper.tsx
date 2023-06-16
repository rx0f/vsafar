"use client" 
import React from 'react';
import skikda from "@/assets/skikda plage.png"
import sahara from "@/assets/sahara-algerie.png"


const ImageWrapper = ({imageRef}:{imageRef:React.MutableRefObject<any>}) => {
  // const images = [
  //   sahara,
  //   skikda,
  // ];

  // const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // useEffect(() => {
  //   const changeImageWithAnimation = () => {
  //     if (imageRef.current?.style) imageRef.current.style.opacity = 0;

  //     setTimeout(() => {
  //       if (imageRef.current?.style) imageRef.current.style.opacity = 1;
  //       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        
  //     }, 400);
  //   };

  //   const intervalId = setInterval(changeImageWithAnimation, 4000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [images]);

  return (
    
    <figure className='bg-sky min-h-[360px] '>
      {/* <img
        ref={imageRef}
        src={images[currentImageIndex].src}
        
        className="w-full h-full min-h-[360px] max-h-[100vh] opacity-100 brightness-75 transition-opacity duration-300 ease-out"
      /> */}
   <div className="carousel w-full" ref={imageRef} onDrag={() => {}}>
  <div id="slide1" className="carousel-item relative w-full">
    <img src={sahara.src} className="w-full h-full min-h-[360px] max-h-[100vh] opacity-100 brightness-75 transition-opacity duration-300 ease-out" />
    <div className="hidden lg:flex absolute  justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a>
      <a href="#slide2" className="btn btn-circle">❯</a>
      
      
    </div>
  </div>
  <div id="slide2" className="carousel-item relative w-full">
    <img src={skikda.src} className="w-full h-full min-h-[360px] max-h-[100vh] opacity-100 brightness-75 transition-opacity duration-300 ease-out" />
    <div className="absolute hidden lg:flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
    <a href="#slide1" className="btn btn-circle">❮</a>
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div>
</div>
     
    </figure>
  );
};

export default ImageWrapper;