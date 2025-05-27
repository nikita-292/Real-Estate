// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import 'swiper/css/bundle';
// import { FaShare, FaMapMarkerAlt, FaBed, FaBath, FaParking, FaChair } from 'react-icons/fa';

// export default function Listing() {
//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const params = useParams();

//   useEffect(() => {
//     const fetchListing = async () => {
//       try {
//         const res = await fetch(`/api/listing/${params.id}`);
//         const data = await res.json();
//         if (data.success === false) {
//           setError(true);
//           setLoading(false);
//           return;
//         }
//         setListing(data);
//         setLoading(false);
//         setError(false);
//       } catch (error) {
//         setError(true);
//         setLoading(false);
//       }
//     };
//     fetchListing();
//   }, [params.id]);

//   if (loading) return <p className='text-center my-7 text-2xl'>Loading...</p>;
//   if (error) return <p className='text-center my-7 text-2xl'>Something went wrong!</p>;

//   return (
//     <main className='max-w-6xl mx-auto p-3'>
//       <h1 className='text-3xl font-semibold my-7'>{listing.name}</h1>
      
//       {/* Image Slider */}
//       <Swiper navigation modules={[Navigation]} className='my-4'>
//         {listing.imageUrls.map((url, index) => (
//           <SwiperSlide key={index}>
//             <div className='h-[550px]' style={{background: `url(${url}) center no-repeat`, backgroundSize: 'cover'}}></div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
      
//       {/* Listing Details */}
//       <div className='flex flex-col md:flex-row gap-4'>
//         <div className='flex-1'>
//           <h2 className='text-2xl font-semibold'>{listing.name}</h2>
//           <p className='flex items-center mt-2 gap-2 text-slate-600'>
//             <FaMapMarkerAlt className='text-green-700' />
//             {listing.address}
//           </p>
          
//           <div className='flex gap-4 mt-4'>
//             <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
//               {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
//             </p>
//             {listing.offer && (
//               <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
//                 ${+listing.regularPrice - +listing.discountPrice} OFF
//               </p>
//             )}
//           </div>
          
//           <p className='mt-4 text-slate-800'>
//             <span className='font-semibold text-black'>Description - </span>
//             {listing.description}
//           </p>
          
//           <ul className='flex flex-wrap items-center gap-4 sm:gap-6 mt-4 text-green-900 font-semibold'>
//             <li className='flex items-center gap-1 whitespace-nowrap'>
//               <FaBed className='text-lg' />
//               {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : '1 bed'}
//             </li>
//             <li className='flex items-center gap-1 whitespace-nowrap'>
//               <FaBath className='text-lg' />
//               {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : '1 bath'}
//             </li>
//             <li className='flex items-center gap-1 whitespace-nowrap'>
//               <FaParking className='text-lg' />
//               {listing.parking ? 'Parking spot' : 'No parking'}
//             </li>
//             <li className='flex items-center gap-1 whitespace-nowrap'>
//               <FaChair className='text-lg' />
//               {listing.furnished ? 'Furnished' : 'Not furnished'}
//             </li>
//           </ul>
//         </div>
        
//         <div className='w-full md:w-[400px] bg-slate-100 p-4 rounded-lg shadow-md h-fit'>
//           <div className='flex justify-between items-center'>
//             <p className='text-2xl font-semibold'>
//               ${listing.offer ? listing.discountPrice : listing.regularPrice}
//               {listing.type === 'rent' && ' / month'}
//             </p>
//             <button className='text-slate-700 hover:opacity-75'>
//               <FaShare />
//             </button>
//           </div>
//           <button className='w-full bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 mt-4'>
//             Contact landlord
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// }