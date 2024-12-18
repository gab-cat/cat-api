import React from 'react';
import BannerPhoto from './footer.png';
import { FaFacebookF, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  return (
    <footer className='footer bg-gray-100 shadow-lg rounded-2xl p-5'>
      <div className='footer--container grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='footer--right flex flex-col items-center'>
          <img src={BannerPhoto} className='footer--image w-full max-w-md' />
          <div className='text-center mt-4'>
            <p>Developed using the <a href='https://thecatapi.com/' target="_blank" className='text-blue-500 hover:underline'>CAT API</a>, this website celebrates our feline companions in every whisker. Harnessing the power of the CAT API, we bring you a purr-fectly curated experience, from delightful images to invaluable information, all dedicated to the world of cats. Meow-vel at the wonders of technology coupled with our undying love for our whiskered friends. Tailored with care and devotion, this website is a tribute to the CAT API and the enchanting universe of cats.</p>
          </div>
        </div>
        <div className='footer--content text-center'>
          <h1 className='footer--title text-2xl font-semibold'>Gabriel Angelo B. Catimbang</h1>
          <h2 className='footer--subtitle text-lg font-light'>Bachelor of Computer Science Student</h2>
          <p className='mt-2'>Copyright &copy; 2023 Cattitude Central. All rights reserved.</p>

          <div className='footer--socials flex justify-center mt-4 space-x-4'>
            <a href="https://www.facebook.com/gab.cat30" target="_blank" className='footer--icon--default text-gray-700 hover:text-blue-500'><FaFacebookF className='footer--icon text-2xl'/></a>
            <a href="https://www.instagram.com/gabcat_/" target="_blank" className='footer--icon--default text-gray-700 hover:text-pink-500'><FaInstagram className='footer--icon text-2xl'/></a>
            <a href="https://www.linkedin.com/in/gabrielcatimbang/" target="_blank" className='footer--icon--default text-gray-700 hover:text-blue-700'><FaLinkedin className='footer--icon text-2xl'/></a>
            <a href="https://github.com/gab-cat/" target="_blank" className='footer--icon--default text-gray-700 hover:text-black'><FaGithub className='footer--icon text-2xl'/></a>
            <a href="mailto:gacatimbang@gbox.adnu.edu.ph" target="_blank" className='footer--icon--default text-gray-700 hover:text-red-500'><SiGmail className='footer--icon text-2xl' /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
