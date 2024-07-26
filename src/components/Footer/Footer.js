import React from 'react';
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import logo from '../../assests/images/logo1.png'

const cardClass = "bg-slate-900 bottom-0 text-slate-200 p-6 ";
const linkClass = "text-slate-400 font-medium hover:text-white";

const SocialLink = ({ href, Icon, altText }) => (
  <a href={href} className={linkClass} aria-label={altText}>
    <Icon size="1.5em" />
  </a>
);

const FooterLink = ({ href, children }) => (
  <li>
    <a href={href} className={linkClass}>{children}</a>
  </li>
);

const FooterColumn = ({ title, links }) => (
  <div>
    <h3 className="text-sm font-semibold mb-2">{title}</h3>
    <ul>
      {links.map((link, index) => <FooterLink key={index} href={link.href}>{link.text}</FooterLink>)}
    </ul>
  </div>
);

const Footer = () => (
  <div className={cardClass} style={{ position: "relative", left: 0, right: 0, bottom: 0 }}>
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center">
        <span className="w-44 h-auto"><img src={logo} alt=''></img></span>
      </div>
      <div className="flex space-x-8">
        <FooterColumn
          title="ABOUT"
          links={[
            { href: "#", text: "VolunTier" },
            { href: "#", text: "Events" }
          ]}
        />
        <FooterColumn
          title="FOLLOW US"
          links={[
            { href: "#", text: "LinkedIn" },
            { href: "#", text: "Github" }
          ]}
        />
        <FooterColumn
          title="LEGAL"
          links={[
            { href: "#", text: "Privacy Policy" },
            { href: "#", text: "Terms & Conditions" }
          ]}
        />
      </div>
    </div>
    <div className="border-t border-muted pt-4 flex justify-between items-center">
      <span className="text-muted-foreground">© 2024 VolunTier™</span>
      <div className="flex space-x-4">
        <SocialLink href="#" Icon={BsFacebook} altText="Facebook" />
        <SocialLink href="#" Icon={BsInstagram} altText="Instagram" />
        <SocialLink href="#" Icon={BsTwitter} altText="Twitter" />
      </div>
    </div>
  </div>
);

export default Footer;
