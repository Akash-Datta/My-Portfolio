import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import ParticlesBackground from "../components/ParticlesBackground";
import Astra from "../assets/Astra.png";

// ======================================================
// EMAILJS CONFIGURATION
// ======================================================

const service_id = import.meta.env.VITE_SERVICE_ID;
const template_id = import.meta.env.VITE_TEMPLATE_ID;
const public_key = import.meta.env.VITE_PUBLIC_ID;

// ======================================================
// CONTACT COMPONENT
// ======================================================

const Contact = () => {
  // ====================================================
  // FORM DATA
  // ====================================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    idea: "",
  });

  // ====================================================
  // FORM ERRORS
  // ====================================================

  const [errors, setErrors] = useState({});

  // ====================================================
  // FORM STATUS
  // ====================================================

  const [status, setStatus] = useState("");

  // ====================================================
  // HANDLE INPUT CHANGE
  // ====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Budget should contain numbers only
    if (
      name === "budget" &&
      value &&
      !/^\d+$/.test(value)
    ) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error as soon as user starts fixing the field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // If service changes to "other",
    // remove any existing budget error
    if (
      name === "service" &&
      value === "other"
    ) {
      setErrors((prev) => ({
        ...prev,
        budget: "",
      }));
    }
  };

  // ====================================================
  // VALIDATE FORM
  // ====================================================

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.name.trim()) {
      newErrors.name = "Please fill this field";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please fill this field";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Please enter a valid email";
    }

    if (!formData.service) {
      newErrors.service =
        "Please select a service";
    }

    if (!formData.idea.trim()) {
      newErrors.idea =
        "Please explain your idea";
    }

    // Budget is required only when
    // the user selects a specific service
    if (
      formData.service &&
      formData.service !== "other" &&
      !formData.budget.trim()
    ) {
      newErrors.budget =
        "Please enter your budget";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ====================================================
  // HANDLE FORM SUBMISSION
  // ====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Stop if validation fails
    if (!validateForm()) {
      return;
    }

    setStatus("sending");

    try {
      await emailjs.send(
        service_id,
        template_id,
        {
          ...formData,

          from_name: formData.name,
          reply_to: formData.email,
        },
        public_key
      );

      // Success
      setStatus("success");

      // Reset form
      setFormData({
        name: "",
        email: "",
        service: "",
        budget: "",
        idea: "",
      });

      setErrors({});
    } catch (error) {
      console.error(
        "EmailJS error:",
        error
      );

      setStatus("error");
    }
  };

  // ====================================================
  // INPUT CLASS HELPER
  // ====================================================

  const inputClass = (field) => `
    p-3
    rounded-md
    bg-white/10
    border
    ${
      errors[field]
        ? "border-red-500"
        : "border-gray-500"
    }
    text-white
    placeholder-gray-400
    focus:outline-none
    focus:border-blue-500
    transition
  `;

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <section
      id="contact"
      className="
        relative
        w-full
        min-h-screen
        bg-black
        overflow-hidden
        text-white

        py-20
        px-6
        md:px-20

        flex
        flex-col
        md:flex-row

        items-center
        gap-10
      "
    >
      {/* ==================================================
          PARTICLES BACKGROUND
      ================================================== */}

      <ParticlesBackground />

      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <div
        className="
          relative
          z-10
          w-full

          flex
          flex-col
          md:flex-row

          items-center

          gap-10
        "
      >
        {/* =================================================
            CONTACT IMAGE
        ================================================= */}

        <motion.div
          className="
            w-full
            md:w-1/2

            flex
            justify-center
          "
          initial={{
            opacity: 0,
            x: -50,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <motion.img
            src={Astra}
            alt="Contact"

            className="
              w-72
              md:w-[35rem]
              max-w-full

              rounded-2xl

              shadow-lg

              object-cover
            "

            animate={{
              y: [0, -10, 0],
            }}

            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* =================================================
            CONTACT FORM
        ================================================= */}

        <motion.div
          className="
            w-full
            md:w-1/2

            bg-white/5

            p-6
            md:p-8

            rounded-2xl

            shadow-lg

            border
            border-white/10
          "
          initial={{
            opacity: 0,
            x: 50,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          {/* =================================================
              FORM HEADING
          ================================================= */}

          <h2
            className="
              text-3xl
              font-bold
              mb-6
            "
          >
            Let's Work Together
          </h2>

          {/* =================================================
              FORM
          ================================================= */}

          <form
            className="
              flex
              flex-col
              gap-5
            "
            onSubmit={handleSubmit}
          >
            {/* ===============================================
                NAME
            ================================================ */}

            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="mb-1"
              >
                Your Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                placeholder="Your Name"
                onChange={handleChange}
                className={inputClass("name")}
              />

              {errors.name && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.name}
                </p>
              )}
            </div>

            {/* ===============================================
                EMAIL
            ================================================ */}

            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="mb-1"
              >
                Your Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                placeholder="Your Email"
                onChange={handleChange}
                className={inputClass("email")}
              />

              {errors.email && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.email}
                </p>
              )}
            </div>

            {/* ===============================================
                SERVICE
            ================================================ */}

            <div className="flex flex-col">
              <label
                htmlFor="service"
                className="mb-1"
              >
                Service Needed
              </label>

              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={inputClass(
                  "service"
                )}
              >
                <option
                  value=""
                  disabled
                  className="text-black"
                >
                  Something in mind?
                </option>

                <option
                  value="Web Development"
                  className="text-black"
                >
                  Web Development
                </option>

                <option
                  value="AI based Software Solutions"
                  className="text-black"
                >
                  AI-based Software Solutions
                </option>

                <option
                  value="other"
                  className="text-black"
                >
                  Others
                </option>
              </select>

              {errors.service && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.service}
                </p>
              )}
            </div>

            {/* ===============================================
                BUDGET
            ================================================ */}

            {formData.service &&
              formData.service !== "other" && (
                <div className="flex flex-col">
                  <label
                    htmlFor="budget"
                    className="mb-1"
                  >
                    Budget
                  </label>

                  <input
                    id="budget"
                    type="text"
                    name="budget"
                    value={formData.budget}
                    placeholder="Your Budget"
                    inputMode="numeric"
                    onChange={handleChange}
                    className={inputClass(
                      "budget"
                    )}
                  />

                  {errors.budget && (
                    <p className="mt-1 text-red-500 text-xs">
                      {errors.budget}
                    </p>
                  )}
                </div>
              )}

            {/* ===============================================
                IDEA
            ================================================ */}

            <div className="flex flex-col">
              <label
                htmlFor="idea"
                className="mb-1"
              >
                Explain Your Idea
              </label>

              <textarea
                id="idea"
                name="idea"
                rows={5}
                value={formData.idea}
                placeholder="Enter Your Idea"
                onChange={handleChange}
                className={inputClass("idea")}
              />

              {errors.idea && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.idea}
                </p>
              )}
            </div>

            {/* ===============================================
                STATUS MESSAGE
            ================================================ */}

            {status && (
              <p
                className={`
                  text-sm

                  ${
                    status === "success"
                      ? "text-green-400"
                      : status === "error"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }
                `}
              >
                {status === "sending"
                  ? "Sending..."
                  : status === "success"
                  ? "Message sent successfully ✅"
                  : "Something went wrong ❌"}
              </p>
            )}

            {/* ===============================================
                SUBMIT BUTTON
            ================================================ */}

            <motion.button
              type="submit"

              className="
                bg-blue-600
                hover:bg-blue-700

                disabled:opacity-60

                text-white

                py-3

                rounded-md

                font-semibold

                transition
              "

              whileHover={{
                scale: 1.05,
              }}

              whileTap={{
                scale: 0.95,
              }}

              disabled={
                status === "sending"
              }
            >
              {status === "sending"
                ? "Sending..."
                : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;