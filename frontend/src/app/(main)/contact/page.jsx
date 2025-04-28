'use client';
import React from 'react'
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ContactSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short..!').max(50, 'Too long!').required('Required'),
  email: Yup.string().required('Required').email('Invalid Email'),
  message: Yup.string().min(10, 'Message is too short').required('Required'),
});

const Contact = () => {
  const contactForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
    validationSchema: ContactSchema,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gray-100 flex items-center justify-center px-4"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Section: Contact Info */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-teal-500 to-purple-600 text-white p-8 flex flex-col justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-lg leading-relaxed">
              We'd love to hear from you! Whether you have a question or just want to say hi, our team is here to help.
            </p>
          </div>
          <div className="space-y-4 mt-8">
            <div className="flex items-center space-x-4">
              <motion.div whileHover={{ scale: 1.2 }} className="text-2xl">
                <ion-icon name="call"></ion-icon>
              </motion.div>
              <span>+(91) 456 7890</span>
            </div>
            <div className="flex items-center space-x-4">
              <motion.div whileHover={{ scale: 1.2 }} className="text-2xl">
                <ion-icon name="mail"></ion-icon>
              </motion.div>
              <span>pagepatrol@gmail.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <motion.div whileHover={{ scale: 1.2 }} className="text-2xl">
                <ion-icon name="location"></ion-icon>
              </motion.div>
              <span>Uttar Pradesh, India </span>
            </div>
          </div>
          <div className="flex space-x-4 mt-8">
            {['logo-facebook', 'logo-twitter', 'logo-linkedin', 'logo-instagram'].map((icon) => (
              <motion.a
                whileHover={{ scale: 1.2 }}
                key={icon}
                className="text-2xl cursor-pointer"
              >
                <ion-icon name={icon}></ion-icon>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right Section: Contact Form */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="p-8"
        >
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <form onSubmit={contactForm.handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                id="name"
                placeholder="Enter your name"
                onChange={contactForm.handleChange}
                value={contactForm.values.name}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
              />
              {contactForm.errors.name && contactForm.touched.name && (
                <p className="text-xs text-red-600 mt-1">{contactForm.errors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                id="email"
                placeholder="Enter your email"
                onChange={contactForm.handleChange}
                value={contactForm.values.email}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
              />
              {contactForm.errors.email && contactForm.touched.email && (
                <p className="text-xs text-red-600 mt-1">{contactForm.errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                id="message"
                rows="4"
                placeholder="Write your message"
                onChange={contactForm.handleChange}
                value={contactForm.values.message}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
              />
              {contactForm.errors.message && contactForm.touched.message && (
                <p className="text-xs text-red-600 mt-1">{contactForm.errors.message}</p>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              type="submit"
              className="w-full bg-teal-500 text-white py-2 rounded-md shadow-md hover:bg-teal-600 transition"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;