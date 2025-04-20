'use client';
import { useFormik } from 'formik';
import React from 'react'
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
      message: ''
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
    validationSchema: ContactSchema,
  })

  return (
    <div className="antialiased bg-gray-300">
      <div className="flex w-full min-h-screen justify-center  items-center">
        <div className=" grid grid-cols-12 my-18 bg-blue-300 w-full max-w-4xl p-8 rounded shadow-lg  overflow-hidden ">
          <div className="col-span-7 p-8 my-auto">
            <div className=" flex flex-col  space-y-8 justify-between">
              <h1 className="font-bold text-4xl tracking-wide">Contact us</h1>
              <p clas="pt-2 text-sm ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
                animi! Deleniti similique, sunt saepe commodi nulla dolores
                labore
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
                  <span>pagepatrol@gmail.com</span>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div className=" inline-flex  space-x-2 items-center">
                  <ion-icon name="location" className="text-xl" />
                  <span>l1 street 342 , Abcd fgh</span>
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
              <ion-icon name="logo-instagram" />
            </div>
          </div>
          <div className="col-span-5">
            <div className="bg-white rounded-xl shadow-lg p-8 ">
              <form onSubmit={contactForm.handleSubmit} className="flex flex-col space-y-6">
                <div>
                  <label htmlFor="" className="text-sm">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="your name"
                    id='name'
                    onChange={contactForm.handleChange}
                    value={contactForm.values.name}
                    className=" mt-2  ring-1 ring-gray-300 w-full rounded-md px-4 py-2 
                        outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                {

                  (contactForm.errors.name && contactForm.touched.name) ? (
                    <p className=" text-xs text-red-600 mt-2" id="name-error">
                      {contactForm.errors.name}
                    </p>
                  ) : null
                }
                <div>
                  <div>
                    <label htmlFor="" className="text-sm">
                      Email
                    </label>
                    <input
                      type="text"
                      placeholder="Email"
                      id='email'
                      onChange={contactForm.handleChange}
                      value={contactForm.values.email}
                      className=" mt-2 ring-1 ring-gray-300 w-full rounded-md px-4 py-2 
                           outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>
                  {

                    (contactForm.errors.email && contactForm.touched.email) ? (
                      <p className=" text-xs text-red-600 mt-2" id="email-error">
                        {contactForm.errors.email}
                      </p>
                    ) : null
                  }
                </div>
                <div>
                  <div>
                    <label htmlFor="" className="text-sm">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      type="text"
                      placeholder="Message"
                      id='message'
                      onChange={contactForm.handleChange}
                      value={contactForm.values.message}
                      className=" mt-2 ring-1 ring-gray-300 w-full rounded-md px-4 py-2 
                          outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>
                  {

                    (contactForm.errors.message && contactForm.touched.message) ? (
                      <p className=" text-xs text-red-600 mt-2" id="message-error">
                        {contactForm.errors.message}
                      </p>
                    ) : null
                  }
                </div>
                <button type='submit' className="inline-block self-end bg-blue-200 rounded-lg px-6 py-2 uppercase  text-sm ">
                  Send message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact;