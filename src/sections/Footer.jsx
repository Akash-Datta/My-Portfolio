
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

const socials = [
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/akashdatta954/",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/akash-datta-10b870340",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/akash-datta",
  },
];

const glowVariants = {
  initial: {
    scale: 1,
    y: 0,
    filter: "drop-shadow(0 0 0 rgba(0,0,0,0))",
  },

  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgba(13, 166, 255, 0.9)) drop-shadow(0 0 18px rgba(16, 185, 129, 0.8))",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },

  tap: {
    scale: 0.95,
    y: 0,
    transition: {
      duration: 0.08,
    },
  },
};

const Footer = () => {
  return (
    <motion.footer
      className="relative z-10 px-4 sm:px-8 lg:px-10 py-10 md:py-14 flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      {/* Name */}
      <h1
        className="font-semibold leading-none text-white text-center select-none"
        style={{
          fontSize: "clamp(2.8rem, 6vw, 8rem)",
          letterSpacing: "0.02em",
          lineHeight: 0.9,
          padding: "0 2vw",
          whiteSpace: "nowrap",
          textShadow: "0 2px 18px rgba(0,0,0,0.45)",
        }}
      >
        Akash Datta
      </h1>

      {/* Social Icons */}
      <div className="flex items-center justify-center gap-5 mt-6">
        {socials.map(({ icon: Icon, label, href }) => (
          <motion.a
            href={href}
            key={label}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
            variants={glowVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="text-gray-300 hover:text-white transition-colors duration-200 inline-flex items-center justify-center"
          >
            <Icon size={21} />
          </motion.a>
        ))}
      </div>

      {/* Quote */}
      <p className="mt-6 max-w-xl px-4 text-gray-400 text-xs sm:text-sm leading-relaxed">
        "You don't have to be great to start, but you have to start to be great."
      </p>

      {/* Copyright */}
      <p className="mt-3 text-gray-500 text-[11px] sm:text-xs">
        © {new Date().getFullYear()} Akash Datta. Always eager to learn new
        things.
      </p>
    </motion.footer>
  );
};

export default Footer;
