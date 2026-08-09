import { motion } from "framer-motion";
import { FaGithub} from "react-icons/fa6";
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
      className="relative z-10 px-4 sm:px-8 lg:px-10 py-16 md:py-20 flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Name */}
      <h1
        className="font-semibold leading-none text-white text-center select-none"
        style={{
          fontSize: "clamp(3rem, 8vw, 14rem)",
          letterSpacing: "0.02em",
          lineHeight: 0.9,
          padding: "0 3vw",
          whiteSpace: "nowrap",
          textShadow: "0 2px 18px rgba(0,0,0,0.45)",
        }}
      >
        Akash Datta
      </h1>

      {/* Social Icons */}
      <div className="flex items-center justify-center gap-6 mt-8">
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
            <Icon size={24} />
          </motion.a>
        ))}
      </div>

      {/* Quote */}
      <p className="mt-8 max-w-2xl px-4 text-gray-400 text-sm sm:text-base leading-relaxed">
        "You don't have to be great to start, but you have to start to be
        great."
      </p>

      {/* Copyright */}
      <p className="mt-4 text-gray-500 text-xs sm:text-sm">
        © {new Date().getFullYear()} Akash Datta. Always eager to learn new
        things.
      </p>
    </motion.footer>
  );
};

export default Footer;