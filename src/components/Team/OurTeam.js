import React from 'react'
import rajat from '../../assests/images/rajat.jpg'
import vatsal from '../../assests/images/vatsal.jpg'
import prince from '../../assests/images/prince.jpg'
import aayushi from '../../assests/images/aayushi.jpg'

function OurTeam() {
  return (
    <div className='pt-20 text-center pb-24 bg-gray-100'>
      <h3 className='text-5xl font-bold mb-6'><span className='text-purple-800'>Meet</span> <span className='text-slate-600'>Our</span> Team</h3>
      <p className='text-xl m-6'>Our team consists of driven professionals with a shared commitment to fostering positive change in our communities. Each member brings a wealth of experience and a deep understanding of the nonprofit sector, ensuring that we facilitate impactful and lasting partnerships. Together, we strive to empower volunteers and support organizations in making a difference.</p>


      <div className='flex flex-wrap'>

        <div className='grow mx-4 mb-4 p-6 bg-white rounded-lg shadow-md border border-gray-200 text-center hover:scale-105 hover:shadow-custom-kaala transition-all duration-1000 ease-in-out'>
          <div 
          style={{
            backgroundImage: `url(${vatsal})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius : "30% 70% 70% 30% / 30% 46% 54% 70%"
          }}
          className='h-48 w-48 mx-auto mb-4'></div>
          <h3 className='text-2xl font-medium'>Vatsal Vyas</h3>
          <h5 className='text-xl text-slate-600'>Developer</h5>
          <p className='text-xl'><a href="https://www.linkedin.com/in/vatsal-vyas-996b9a256"><i class="fa-brands fa-linkedin"></i> </a> <a href="https://www.instagram.com/vatsal.vyas_"><i class="fa-brands fa-instagram"></i></a></p>
        </div>

        <div className='grow mr-4 mb-4 p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:scale-105 hover:shadow-custom-kaala transition-all duration-1000 ease-in-out'>
          <div 
          style={{
            backgroundImage: `url(${rajat})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius : "68% 32% 70% 30% / 41% 54% 46% 59%"
          }}
          className='h-48 w-48 mx-auto mb-4'></div>
          <h3 className='text-2xl font-medium'>Rajat Mangla</h3>
          <h5 className='text-xl text-slate-600'>Developer</h5>
          <p className='text-xl'><a href="https://www.linkedin.com/in/rajat-mangla-025a75249/"><i class="fa-brands fa-linkedin"></i> </a> <a href="https://www.instagram.com/manglaji.rajat?igsh=MXZ3NGV0eG5pbWYxcQ%3D%3D&utm_source=qr"><i class="fa-brands fa-instagram"></i></a></p>
        </div>

        <div className='grow mr-4 mb-4 p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:scale-105 hover:shadow-custom-kaala transition-all duration-1000 ease-in-out'>
          <div 
          style={{
            backgroundImage: `url(${aayushi})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius : "70% 30% 51% 49% / 41% 38% 62% 59% "
          }}
          className='h-48 w-48 mx-auto mb-4'></div>
          <h3 className='text-2xl font-medium'>Aayushi Sharma</h3>
          <h5 className='text-xl text-slate-600'>Developer</h5>
          <p className='text-xl'><a href="https://www.linkedin.com/in/aayushi-sharma-8ab2942b7/"><i class="fa-brands fa-linkedin"></i> </a> <a href="https://instagram.com/_.aayushi03"><i class="fa-brands fa-instagram"></i></a></p>
        </div>

        <div className='grow mr-4 mb-4 p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:scale-105 hover:shadow-custom-kaala transition-all duration-1000 ease-in-out'>
          <div 
          style={{
            backgroundImage: `url(${prince})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius : "66% 34% 28% 72% / 69% 70% 30% 31% "
          }}
          className='h-48 w-48 mx-auto mb-4'></div>
          <h3 className='text-2xl font-medium'>Prince Jha</h3>
          <h5 className='text-xl text-slate-600'>UI/UX Designer</h5>
          <p className='text-xl'><a href="https://www.linkedin.com/in/prince-jha-2a34502b7/"><i class="fa-brands fa-linkedin"></i> </a> <a href="https://www.instagram.com/the_rajkumarrr/"><i class="fa-brands fa-instagram"></i></a></p>
        </div>

      </div>
    </div>
  )
}

export default OurTeam
