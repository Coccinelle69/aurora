"use client";

import { FormEvent, useState } from "react";
import FormInput from "./FormInput";

const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    // TODO: Hook to your endpoint or 3rd‑party form service.
    // Example POST:
    // await fetch("/api/contact", { method: "POST", body: new FormData(e.currentTarget) });

    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSent(true);
    (e.target as HTMLFormElement).reset();
  }
  return (
    <section className="p-8 sm:p-12 lg:p-16">
      <h2 className="font-[\'Playfair Display\',serif] text-4xl sm:text-5xl leading-tight mb-7">
        Get in touch by
        <br />
        filling the form below
      </h2>

      <form onSubmit={onSubmit} className="max-w-4xl">
        <div className="">
          <FormInput id="firstName" name="firstName" placeholder="Jane">
            First Name
          </FormInput>
          <FormInput id="lastName" name="lastName" placeholder="Doe">
            Last Name
          </FormInput>
          <FormInput id="email" name="email" placeholder="you@example.com">
            Email
          </FormInput>
          <FormInput
            id="message"
            name="message"
            placeholder="Tell us about your dates, guests, questions…"
            input={false}
          >
            Message
          </FormInput>
        </div>

        <div className=" flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 uppercase tracking-[.2em] font-semibold px-5 py-3 rounded-xl bg-transparent hover:bg-slate-200 transition"
          >
            {submitting ? "Sending…" : "Send Message"}
            {/* <ArrowRight className="w-5 h-5" /> */}
          </button>
        </div>

        {sent && (
          <p role="status" className="mt-4 text-sm text-emerald-700">
            Thanks! Your message was sent (demo).
          </p>
        )}
      </form>
    </section>
  );
};

export default ContactForm;
