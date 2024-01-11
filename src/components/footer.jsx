import React from 'react';
import BannerPhoto from './footer.png';
import { FaFacebookF, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer--container'>
        <div className='footer--right'>
        <img src={BannerPhoto} className='footer--image' />
          <div>
              <p>     Developed using the <a href='https://thecatapi.com/' target="_blank">CAT API</a>, this website celebrates our feline companions in every whisker. Harnessing the power of the CAT API, we bring you a purr-fectly curated experience, from delightful images to invaluable information, all dedicated to the world of cats. Meow-vel at the wonders of technology coupled with our undying love for our whiskered friends. Tailored with care and devotion, this website is a tribute to the CAT API and the enchanting universe of cats.</p>
          </div>
        </div>
        <div className='footer--content'>
          <h1 className='footer--title'>Gabriel Angelo B. Catimbang</h1>
          <h2 className='footer--subtitle'>Bachelor of Computer Science Student</h2>
          <p>Copyright &copy; 2023 Cattitude Central. All rights reserved.</p>

          <div className='footer--socials'>
            <a href="https://www.facebook.com/gab.cat30" target="_blank" className='footer--icon--default'><FaFacebookF className='footer--icon'/></a>
            <a href="https://www.instagram.com/gabcat_/" target="_blank" className='footer--icon--default'><FaInstagram className='footer--icon'/></a>
            <a href="https://www.linkedin.com/in/gabrielcatimbang/" target="_blank" className='footer--icon--default'><FaLinkedin className='footer--icon'/></a>
            <a href="https://github.com/gab-cat/" target="_blank" className='footer--icon--default'><FaGithub className='footer--icon'/></a>
            <a href="mailto:gacatimbang@gbox.adnu.edu.ph" target="_blank" className='footer--icon--default'><SiGmail className='footer--icon' /></a>
          </div>
        </div>
      </div>
    </footer>
    );
};

export default Footer;