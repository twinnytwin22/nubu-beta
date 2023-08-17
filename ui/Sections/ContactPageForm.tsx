'use client'
import { bookingUrl } from "@/lib/site/constants";
import Link from "next/link";
import React from "react";
import { useState } from "react";

const ContactForm = ({ handleClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
    name: "",
    phoneNumber: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setStatus("success");
      if (res) {
        console.log("Your message was sent successfully");
      }
      setFormData({ email: "", subject: "", message: "", name: "", phoneNumber: "" });
    } catch (err) {
      setStatus("error");
      console.log("Error sending email. Please try again later.");
    }
  };

  return (
    <div className="w-full p-12 mx-auto max-w-screen-md z-[100] h-full  isolate relative">
      <h1 className=" text-5xl tracking-tight font-bold text-center text-black dark:text-white font-owners">
        Let's Chat!
      </h1>
      <p className="text-center -mt-2 mb-8 text-black dark:text-white ">or email us at info@cribnetwork.io</p>
      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-8 font-medium">
        <div>
          <label htmlFor="email" className="block mb-2 text-sm text-black dark:text-white">
            Your email
          </label>
          <input
            className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-black dark:text-white text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring block w-full p-2.5 required"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex space-x-3 mx-auto w-full">
          <div className="w-full">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-black dark:text-white">
              Your Name
            </label>
            <input
              className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-black dark:text-white text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring block w-full p-2.5 required"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="w-full">
            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-black dark:text-white">
              Subject
            </label>
            <input
              className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-black text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring block w-full p-2.5 required"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block mb-2 text-sm text-black dark:text-white">
            Phone Number
          </label>
          <input
            className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-black dark:text-white text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring  block w-full p-2.5 required"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-black dark:text-white">
            Your message
          </label>
          <textarea
            className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border h-full border-zinc-300 dark:border-zinc-600 text-black text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring focus:border block w-full p-2.5 required"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            className="py-3 font-owners px-5 text-xs md:text-sm font-light text-center text-black bg-red-300 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:scale-105"
          >
            Send message
          </button>
          <Link href={bookingUrl}>
            <button

              className="py-3 font-owners px-5 text-xs md:text-sm font-light text-center text-black bg-red-300 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:scale-105"
            >
              Schedule a Call            </button>
          </Link>
        </div>

        {status === "success" && handleClose()}
        {status === "error" && <p>Error sending email, please try again.</p>}
      </form>
    </div>
  );
};

export default ContactForm;
