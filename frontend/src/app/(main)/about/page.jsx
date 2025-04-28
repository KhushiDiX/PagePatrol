import React from 'react'

const About = () => {
  return (
    <article className="py-10">
      <h1 className="text-center py-5 font-bold text-5xl">About Us</h1>
      <section className="bg-gray-50 min-h-scre flex.items-center flex w-full justify-center  items-center">
        <div className="max-w-[1320px] md:py-[80] py-5 flex flex-col sm:flex-row mx-auto">
          <div className="basis-[45%] my-auto">
            <img src="About-Us.webp" className="w-full" alt="g" />
          </div>
          <div className="basis-[55%] px-5">
            <h1 className="font-bold pb-5">
              {" "}
              Page petrol : India's Most Trusted Solution for Orphaned Pages and
              Broken Links
            </h1>
            <p className="py-3">
              {" "}
              a strong foundation in modern web technologies like ReactJS,
              NodeJS, ExpressJS, and MongoDB, we aim to deliver a solution that
              is intuitive, reliable, and scalable. PagePatrol is designed to
              simplify complex website maintenance tasks, ensuring that even
              non-technical users can enhance their website’s performance and
              search engine ranking with ease. Our mission is to make website
              management hassle-free by offering a comprehensive tool that
              provides real-time scanning, detailed reporting, and
              easy-to-understand insights. Through PagePatrol, we strive to make
              the web a better place — one website at a time.
            </p>
          </div>
        </div>
      </section>
    </article>
  )
}

export default About;