'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const ScaleInView = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

const SlideFromRight = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
}

const SlideFromLeft = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
}

const StatCounter = ({ value, title, description }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
    >
      <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
        {value}
      </p>
      <h3 className="text-xl font-semibold mt-2 text-gray-800 dark:text-gray-200">{title}</h3>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
};

const FeatureCard = ({ title, description, icon, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
      className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
};

const Home = () => {
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-indigo-200/20 to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-purple-200/20 to-transparent rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/4"></div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="flex-1"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.span
                variants={fadeIn}
                className="inline-block px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 rounded-full mb-4"
              >
                Website Health Monitoring
              </motion.span>
              <motion.h1
                variants={fadeIn}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
              >
                Keep Your Website <br />
                <span className="text-indigo-600 dark:text-indigo-400">Error-Free</span> & <span className="text-violet-600 dark:text-violet-400">Healthy</span>
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-lg"
              >
                Automatically detect and fix broken links and orphaned pages to improve user experience and boost your SEO performance.
              </motion.p>
              <motion.div
                variants={fadeIn}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/signup">
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-block px-6 py-3 text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-center font-medium"
                  >
                    Start Monitoring Free
                  </motion.span>
                </Link>
                <Link href="#features">
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-block px-6 py-3 text-indigo-600 bg-white dark:bg-gray-800 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/30 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-center font-medium"
                  >
                    Explore Features
                  </motion.span>
                </Link>
              </motion.div>

              {/* <motion.div
                variants={fadeIn}
                className="flex items-center mt-8 space-x-4"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-${i * 100} dark:bg-gray-${900 - (i * 100)}`}></div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Join <span className="font-semibold text-indigo-600 dark:text-indigo-400">2,000+</span> website owners</p>
              </motion.div> */}
            </motion.div>

            <motion.div
              className="flex-1 hidden md:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-2xl transform rotate-3 scale-105 opacity-10 blur-xl"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/Hero (1).png"
                    alt="PagePatrol Dashboard"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
                <motion.div
                  className="absolute -right-12 -bottom-10 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900 dark:text-white">Most Recent Scan</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">All clear! No broken links found</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ScaleInView>
              <span className="inline-block px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 rounded-full mb-4">
                Key Features
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Powerful Tools for Website Health
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                PagePatrol provides robust solutions for monitoring and fixing website issues automatically.
              </p>
            </ScaleInView>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <FeatureCard
              title="Broken Link Detection"
              description="Automatically scan and identify broken links across your entire website to prevent user frustration."
              delay={0.1}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 10-5.656-5.656l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                </svg>
              }
            />
            <FeatureCard
              title="Orphaned Page Finder"
              description="Discover pages that aren't linked from anywhere else on your site, improving your internal linking structure."
              delay={0.2}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              }
            />
            <FeatureCard
              title="SEO Impact Analysis"
              description="Get detailed insights on how broken links and orphaned pages are affecting your search engine rankings."
              delay={0.3}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            />
            <FeatureCard
              title="Automated Alerts"
              description="Receive real-time notifications when new issues are detected, allowing for immediate action."
              delay={0.4}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              }
            />
            <FeatureCard
              title="Fix Recommendations"
              description="Get smart suggestions to fix broken links and properly integrate orphaned pages into your site."
              delay={0.5}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            />
            <FeatureCard
              title="Detailed Reporting"
              description="Export comprehensive reports in multiple formats to share with your team or clients."
              delay={0.6}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ScaleInView>
              <span className="inline-block px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 rounded-full mb-4">
                Simple Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                How PagePatrol Works
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                Our streamlined process makes it easy to maintain your website's health.
              </p>
            </ScaleInView>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                step: "1",
                title: "Connect Your Website",
                description: "Simply enter your URL and let PagePatrol handle the rest. No complicated setup required."
              },
              {
                step: "2",
                title: "Automated Scanning",
                description: "Our system thoroughly crawls your website, identifying all broken links and orphaned pages."
              },
              {
                step: "3",
                title: "Fix & Optimize",
                description: "Review the detailed report and use our recommendations to fix issues and improve your site."
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <ScaleInView delay={index * 0.2}>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 relative z-10 h-full">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400 font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </div>
                </ScaleInView>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-0">
                    <svg className="w-12 h-12 text-indigo-200 dark:text-indigo-900/30" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-gray-50/80 dark:bg-gray-900/50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ScaleInView>
              <span className="inline-block px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 rounded-full mb-4">
                The Impact
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Why Website Health Matters
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                The statistics speak for themselves. Broken links and orphaned pages significantly impact user experience and SEO.
              </p>
            </ScaleInView>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCounter
              value="10-20%"
              title="Orphaned Pages"
              description="On larger websites, 10-20% of pages are typically orphaned due to inadequate site structure."
            />
            <StatCounter
              value="30-40%"
              title="Weak Internal Linking"
              description="Of orphaned pages can be found in sites with weak internal linking strategies."
            />
            <StatCounter
              value="60%"
              title="User Retention Impact"
              description="Of users are less likely to return to a site if they encounter broken links."
            />
            <StatCounter
              value="10-50+"
              title="Typical Broken Links"
              description="For a medium-sized website (500-1000 pages), broken links can range from 10-50+."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl overflow-hidden shadow-xl">
              <div className="relative px-6 py-10 md:p-10 lg:p-16">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>

                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row items-center justify-evenly gap-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                        Ready to fix your website?
                      </h2>
                      <p className="text-indigo-100 max-w-lg">
                        Get started with PagePatrol today and ensure your website is always performing at its best. Full access to all tools, cancel anytime.
                      </p>
                    </div>

                    <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                      <Link href="/signup">
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-block px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-center w-full sm:w-auto"
                        >
                          Get Started Now !!
                        </motion.span>
                      </Link>
                      {/* <Link href="/contact">
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-block px-6 py-3 bg-transparent text-white border border-white/30 font-medium rounded-lg hover:bg-white/10 transition-all duration-200 text-center w-full sm:w-auto"
                        >
                          Contact Sales
                        </motion.span>
                      </Link> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-gray-50/80 dark:bg-gray-900/50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <SlideFromLeft className="flex-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-2xl transform -rotate-3 scale-105 opacity-10 blur-xl"></div>
                <img
                  src="/About-Us.webp"
                  alt="About PagePatrol"
                  className="w-full h-auto object-cover rounded-2xl shadow-lg relative z-10"
                />
              </div>
            </SlideFromLeft>

            <SlideFromRight className="flex-1">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 rounded-full mb-4">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Trusted Solution for Website Health Monitoring
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                PagePatrol is built on a strong foundation in modern web technologies like ReactJS, NodeJS, ExpressJS, and MongoDB. We aim to deliver a solution that is intuitive, reliable, and scalable.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Our mission is to make website management hassle-free by offering a comprehensive tool that provides real-time scanning, detailed reporting, and easy-to-understand insights. Through PagePatrol, we strive to make the web a better place — one website at a time.
              </p>
            </SlideFromRight>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;