import React from 'react'

const Home = () => {
  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic"
        rel="stylesheet"
      />
      {/*hero section*/}
      <article className="bg-blue-400 h-screen flex justify-center items-center">
        <section>
          <div className=" w-[80%] mx-auto grid grid-cols-2">
            <div className=" flex  flex-col justify-center space-y-4">
              <h1 className="text-5xl font-bold">Page Patrol</h1>
              <p className="text-xl ">
                We are a dedicated team of developers passionate about improving
                website health and user experience. Our project, PagePatrol, was
                born from a simple yet crucial need — to help website owners
                identify and fix broken links and orphaned pages quickly and
                effectively.
              </p>
              {/* search bar*/}
              
            </div>
            <div>
              <img src="/Hero (1).png" alt="" />
            </div>
          </div>
        </section>
      </article>
      {/*breif*/}
      <article>
        <section className="w-[80%] mx-auto py-10 ">
          <div>
            <h1 className="text-5xl font-bold text-center">Overview</h1>
          </div>
          <div className="py-8 space-y-8">
            <div className="grid grid-cols-12 gap-10 py-10 bg-blue-200 px-5 rounded-lg">
              <div className="col-span-10 my-auto lg:col-span-8 text-xl">
                <p className="">
                  Every website needs to be in perfect condition to provide
                  visitors with a seamless experience and perform well on search
                  engines. However, websites often face issues like broken links
                  (links that lead to dead ends) and orphaned pages (pages that
                  aren’t linked anywhere within the main site). Our project is a
                  tool designed to help website owners quickly and easily identify
                  these problems. With this tool, even non-technical users can
                  easily detect and resolve issues, ensuring their websites remain
                  reliable and user-friendly.
                </p>
              </div>
              <div className="col-span-10 mx-auto lg:col-span-4">
                <img src="/over1.png" alt="a" />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-10 py-10 bg-blue-200 px-5 rounded-lg">
              <div className="col-span-10 my-auto lg:col-span-8 text-xl">
                <p className="">
                  Orphan pages are website pages that are not linked to from any
                  other pages or section of the site
                </p>
              </div>
              <div className="col-span-10 mx-auto lg:col-span-4 order-last lg:order-first">
                <img src="/Orphan-Page-new.png" alt="a" />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-10 py-10 bg-blue-200 px-5 rounded-lg">
              <div className="col-span-10 my-auto lg:col-span-8 text-xl">
                <p className="">
                  A broken link is a hyperlink that leads to a page or resource
                  that no longer exists, often due to a page being deleted, moved,
                  or a redirection not being set up.
                </p>
              </div>
              <div className="col-span-10 mx-auto lg:col-span-4">
                <img src="/broken link blue.avif" alt="a" />
              </div>
            </div>
          </div>
        </section>
      </article>
      {/*features*/}
      {/*pasted*/}
      {/* Card Blog */}
      <div className="w-[80%] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Card */}
          <a className="group sm:fle rounded-xl focus:outline-hidden" href="#">
            <div className="shrink-0 relative rounded-xl object-contain overflow-hidden h-50 sm:-62.5 sm:h-87.5 w-full">
              <img
                className="size-full absolute top-0 start-0 object-contain"
                src="/orphaned pages.avif"
                alt="Blog Image"
              />
            </div>
            <div className="grow">
              <div className="p-4 flex flex-col h-full sm:p-6">
                <h3 className="text-lg sm:text-2xl font-semibold text-gray-800 group-hover:text-blue-600 group-focus:text-blue-600 dark:text-neutral-300 dark:group-hover:text-white dark:group-focus:text-white">
                  Orphaned pages
                </h3>
                <p className="mt-2 text-gray-600 dark:text-neutral-400"></p>
                <h2 className="font-bold"> Orphaned Page Detection Features:</h2>
                These are pages on a website that aren't linked from any other
                page, making them hard to find.
                <br />
                <span className="font-bold">✅ Full Website Scan:</span>Identifies
                all orphaned pages by checking internal linking.
                <br />
                <span className="font-bold">✅ Page Indexing Check: </span>
                Verifies whether orphaned pages are indexed by search engines.
                <br />
                <span className="font-bold">
                  ✅ Internal Linking Suggestions:
                </span>
                Provides recommendations to properly link orphaned pages. <br />
                <span className="font-bold">✅ Exportable Reports:</span>Generates
                detailed reports listing all orphaned pages.
                <br />
                <span className="font-bold">✅ Visualization Support: </span>
                Graphical representation of orphaned pages in site structure.
                <br />
                <span className="font-bold">✅ CMS Integration:</span>Helps users
                link orphaned pages directly within content management systems.
                <br />
                <span className="font-bold">✅ SEO Impact Analysis:</span>
                Evaluates how orphaned pages affect search rankings and user
                experience. <br />
                <p />
                <div className="mt-5 sm:mt-auto">
                  {/* Avatar */}
                  {/* End Avatar */}
                </div>
              </div>
            </div>
          </a>
          {/* End Card */}
          {/* Card */}
          <a className="group sm:fle rounded-xl focus:outline-hidden" href="#">
            <div className="shrink-0 relative rounded-xl object-contain overflow-hidden h-50 sm:-62.5 sm:h-87.5 w-full">
              <img
                className="size-full absolute top-0 start-0 object-contain"
                src="/brokenn link.jpeg"
                alt="Blog Image"
              />
            </div>
            <div className="grow">
              <div className="p-4 flex flex-col h-full sm:p-6">
                <h3 className="text-lg sm:text-2xl font-semibold text-gray-800 group-hover:text-blue-600 group-focus:text-blue-600 dark:text-neutral-300 dark:group-hover:text-white dark:group-focus:text-white">
                  Broken link
                </h3>
                <p className="mt-2 text-gray-600 dark:text-neutral-400">
                  <span> </span>
                </p>
                <h2 className="font-bold">Broken Link Detection Features:</h2>
                Broken links lead to non-existent pages, creating a poor user
                experience.
                <br />
                <span className="font-bold">
                  ✅ Automated Broken Link Scan:
                </span>{" "}
                Detects all internal and external broken links.
                <br />
                <span className="font-bold">✅ HTTP Status Code Analysis: </span>
                Identifies 404 errors and other HTTP response issues.
                <br />
                <span className="font-bold">✅ Real-Time Alerts:</span> Notifies
                users when broken links are found.
                <br />
                <span className="font-bold">
                  ✅ Bulk Fixing Recommendations:
                </span>{" "}
                Suggests alternative URLs or redirects for broken links.
                <br />
                <span className="font-bold">✅ Customizable Scanning:</span>{" "}
                Allows users to scan specific sections of a website.
                <br />
                <span className="font-bold">
                  ✅ User-Friendly Dashboard:
                </span>{" "}
                Displays broken links with their source locations.
                <br />
                <span className="font-bold">✅ Export Report Feature:</span>{" "}
                Generates detailed reports in CSV or PDF format.
                <br />
                <p />
                <div className="mt-5 sm:mt-auto">
                  {/* Avatar */}
                  {/* End Avatar */}
                </div>
              </div>
            </div>
          </a>
          {/* End Card */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Card Blog */}

      {/*numberical facts*/}
      <section className="text-gray-600">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                10-20% Orphan Page
              </h2>
              <p className="leading-relaxed">
                on larger website, it's not uncommon for 10-20% of pages to be
                orphaned due to inadequate site structure or content updates
              </p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                30-40% Weak Link
              </h2>
              <p className="leading-relaxed">
                Research indicates that *30-40%* of orphan pages can be found in
                sites with weak internal linking straegies
              </p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                60 % of User
              </h2>
              <p className="leading-relaxed">
                {" "}
                60% of user are less likrly to return to a site if they encounter
                broken links. 50% pages with broken links or 404 errors can lead
                to a higher bounce
              </p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                10-50
              </h2>
              <p className="leading-relaxed">
                for a medium-sized website (500-1000 pages) broken link can range
                from 10-50 or more, depending on the site structure and
                maintainance
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Banner */}
      <article className="bg-blue-300 flex items-center flex  justify-center py-5  items-center">
        <section className="">
          <div className=" bg-blue-300 flex flex-col space-y-4 rounded-2xl shadow-lg p-5 items-center">
            <div>
              <p className=" font-bold  px-5">
                {" "}
                Get started with Page Patrol today..!!
              </p>
            </div>
            <div>
              <p className=" font-bold px-5">
                Full access to all toolkit. Cancel Anytime..!!{" "}
              </p>
            </div>
            <div>
              <button className="bg-blue-800 text-white py-2 px-5 rounded hover:bg-blue-600 ">
                Start today
              </button>
            </div>
          </div>
        </section>
      </article>
      {/*about us*/}
      <article className="py-10">
        <h1 className="text-center py-5 font-bold text-5xl">About Us</h1>
        <section className="bg-gray-50 min-h-scre flex items-center flex w-full justify-center  items-center">
          <div className="max-w-[1320px] md:py-[80] py-5 flex flex-col sm:flex-row mx-auto">
            <div className="basis-[45%] my-auto">
              <img src="/About-Us.webp" className="w-full" alt="g" />
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
      {/*contact us*/}
      <div className="antialiased bg-blue-400">
        <div className="flex w-full min-h-screen justify-center  items-center">
          <div className=" flex flex-col space-y-6  bg-violet-300/50 w-full max-w-4xl p-8 rounded-xl shadow-2xl shadow-black/60  overflow-hidden ">
            <div className=" flex flex-col  space-y-8 justify-between">
              <h1 className="font-bold text-4xl tracking-wide">Contact us</h1>
              <p clas="pt-2 text-sm ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
                animi! Deleniti similique, sunt saepe commodi nulla dolores labore
              </p>
            </div>
            <div className=" flex flex-col space-y-4">
              <div className=" inline-flex  space-x-2 items-center">
                <ion-icon name="call" className="text-xl" />
                <span>+(123) 456 7890</span>
              </div>
            </div>
            <div>
              <div>
                <div className=" inline-flex  space-x-2 items-center">
                  <ion-icon name="mail" className="text-xl" />
                  <span>pagepetrol@gmail.com</span>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div className=" inline-flex  space-x-2 items-center">
                  <ion-icon name="location" className="text-xl" />
                  <span>L1 street 342 , Abcd fgh</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-4 text-lg">
              <a>
                <ion-icon name="logo-facebook" />
              </a>
              <a>
                <ion-icon name="logo-twitter" />
              </a>
              <a>
                <ion-icon name="logo-linkedin" />
              </a>
              <a>
                <ion-icon name="logo-instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home