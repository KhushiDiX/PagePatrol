'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const featuresRef = useRef(null);
  const isInView = useInView(featuresRef, { once: true, margin: "-10% 0px" });

  // Team data with profiles
  const team = [
    {
      name: "Khushi Dixit",
      role: "Founder & CEO",
      bio: "With over 10 years of experience in web development and SEO optimization, Khushi founded PagePatrol to solve the common problem of website maintenance.",
      avatar: "/khushi.webp" // Replace with actual image
    },
    {
      name: "Anshu Tripathi",
      role: "Lead Developer",
      bio: "Anshu oversees the technical architecture of PagePatrol, ensuring a robust, scalable solution that delivers real value to website owners.",
      avatar: "/khushi.webp" // Replace with actual image
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-indigo-200/20 to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-purple-200/20 to-transparent rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/4"></div>
        </div>
        
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="text-center mb-12 md:mb-20"
          >
            <motion.span 
              variants={fadeIn}
              className="inline-block px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 rounded-full mb-4"
            >
              Our Story
            </motion.span>
            <motion.h1 
              variants={fadeIn}
              className="text-4xl md:text-5xl font-bold mb-6 py-5 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent"
            >
              About PagePatrol
            </motion.h1>
            <motion.p 
              variants={fadeIn}
              className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300"
            >
              We're on a mission to make the web more reliable by empowering website owners with tools to eliminate broken links and orphaned pages.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-12 md:py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="w-full lg:w-1/2"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-2xl transform -rotate-3 scale-105 opacity-10 blur-xl"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/About-Us.webp"
                    alt="PagePatrol Team"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="w-full lg:w-1/2"
            >
              <span className="inline-block px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 rounded-full mb-4">
                India's Leading Web Health Solution
              </span>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                PagePatrol: India's Most Trusted Solution for Orphaned Pages and Broken Links
              </h2>
              <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300">
                <p className="mb-4">
                  Built on a strong foundation in modern web technologies like ReactJS, NodeJS, ExpressJS, and MongoDB, we aim to deliver a solution that is intuitive, reliable, and scalable.
                </p>
                <p className="mb-4">
                  PagePatrol is designed to simplify complex website maintenance tasks, ensuring that even non-technical users can enhance their website's performance and search engine ranking with ease.
                </p>
                <p>
                  Our mission is to make website management hassle-free by offering a comprehensive tool that provides real-time scanning, detailed reporting, and easy-to-understand insights. Through PagePatrol, we strive to make the web a better place — one website at a time.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section ref={featuresRef} className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 rounded-full mb-4">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              What Drives Us
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Our core values guide everything we do, from product development to customer support.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Reliability",
                description: "We're committed to providing tools that consistently deliver accurate results, fostering trust with our users."
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Simplicity",
                description: "We believe in making complex website maintenance tasks accessible to users of all technical abilities."
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: "Innovation",
                description: "We're constantly evolving our technology to address the changing landscape of web development and SEO requirements."
              }
            ].map((value, index) => (
              <motion.div 
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 rounded-full mb-4">
                Our Team
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                The People Behind PagePatrol
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                Meet our talented team of professionals who are passionate about improving the web.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="h-60 overflow-hidden">
                  <img 
                    src={member.avatar}
                    alt={member.name} 
                    className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-indigo-600 dark:text-indigo-400 mb-4">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;