import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <>
      <div class="footer-basic">
          <ul>
            <li><a href='https://github.com/ajith-1' target='_blank' rel='noopener noreferrer'><i class="icon ion-social-github"></i></a></li>
            <li><a href='https://www.linkedin.com/in/ajith-kumar-a4839b25a?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BdCxMrSfITkOhta9KlaMqaQ%3D%3D' target='_blank' rel="noopener noreferrer"><i class="icon ion-social-linkedin"></i></a></li>
            <li><i class="icon ion-social-twitter"></i></li>
            <li><i class="icon ion-social-facebook"></i></li>
          </ul>

          <ul class="list-inline">
            <li class="list-inline-item">Home</li>
            <li class="list-inline-item">About</li>
            <li class="list-inline-item">Terms</li>
            <li class="list-inline-item">Privacy Policy</li>
          </ul>
          <p class="copyright">Company Name © 2023</p>
        </div>
    </>
  )
}

export default Footer;