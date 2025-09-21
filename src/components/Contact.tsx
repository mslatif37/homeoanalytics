// src/components/Contact.tsx
import { FormEvent, useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState<"idle"|"sent">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sent");
    e.currentTarget.reset();
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-4xl font-extrabold mb-2">Contact</h1>
      <p className="text-gray-600 mb-8">
        Questions or topics you would like covered? Write to us.
      </p>

      {status === "sent" && (
        <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800">
          Thank you for your message. We’ll get back to you soon.
        </div>
      )}

      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea rows={6} className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
