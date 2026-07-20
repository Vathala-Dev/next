"use client";

import { useState } from "react";

export default function EnquiryPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    service: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      // Replace with your API
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Enquiry submitted successfully");
        setFormData({
          name: "",
          phone: "",
          location: "",
          service: "",
          message: "",
        });
      } else {
        alert("Failed to submit enquiry");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-green-600 text-white p-8">
            <h1 className="text-3xl font-bold">
              Healthcare Enquiry
            </h1>
            <p className="mt-2 text-green-100">
              Tell us your requirement and our team will contact you.
            </p>
          </div>

          <div className="grid md:grid-cols-2">
            {/* Contact Info */}
            <div className="bg-gray-100 p-8">
              <h2 className="text-xl font-semibold mb-4">
                Contact Information
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="font-medium">Phone</p>
                  <p>+91 9150064364</p>
                </div>

                <div>
                  <p className="font-medium">Email</p>
                  <p>support@vathala.com</p>
                </div>

                <div>
                  <p className="font-medium">Address</p>
                  <p>
                    Muniah Technologies Pvt Ltd,
                    Kotturpuram, Chennai,
                    Tamil Nadu 600085
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block mb-2 font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                    placeholder="Enter your city"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Service Required
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  >
                    <option value="">Select Service</option>
                    <option value="Home Doctor">Home Doctor</option>
                    <option value="Nursing">Nursing Services</option>
                    <option value="Physiotherapy">Physiotherapy</option>
                    <option value="Elder Care">Elder Care</option>
                    <option value="Wound Care">Wound Care</option>
                    <option value="Blood Test">Blood Test</option>
                    <option value="Veterinary">Veterinary Care</option>
                    <option value="Yoga">Yoga Classes</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                    placeholder="Describe your requirement"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
                >
                  {loading ? "Submitting..." : "Submit Enquiry"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}