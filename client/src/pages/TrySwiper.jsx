import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// import home from '../assets/home.jpg';
// import more from '../assets/more.jpg';

export default function TrySwiper({listingData}) {
    console.log(listingData);

    if (!listingData || !listingData.imageUrls) {
        return <p>loading...</p>
        
    }
    
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      navigation={true}
      loop={true}
       autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      modules={[Navigation,Autoplay]}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      className='overflow-hidden rounded-xl shadow-lg'
    >
    
    {listingData.imageUrls.map((url,index)=>(

      <SwiperSlide key={index}>
        <img src={url} alt="image" className=' w-full object-cover h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px]' />
      </SwiperSlide>
    )
    )}
    
    </Swiper>
  );
}
