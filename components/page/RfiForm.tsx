"use client";

import { useState } from "react";
import { company } from "@/lib/content";
import { Arrow } from "../ui/primitives";

// Options, labels, placeholders and messages exactly as on the official form.
const ROLES = ["Potential Investor", "Analyst", "Shareholder", "Journalist", "Broker", "Investment Advisor", "Industry Professional"];

/**
 * Request-for-information form with the official site's fields and wording.
 * This app has no mail backend, so submitting opens the visitor's email client with the request
 * pre-filled and addressed to the company. Swap `submit` for an API call when one exists.
 */
export default function RfiForm() {
  const [role, setRole] = useState(ROLES[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");
  const [list, setList] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const body = [`I am a: ${role}`, `Full Name: ${name}`, `Email: ${email}`, `Sign me up for Email List: ${list ? "Yes" : "No"}`, "", comments].join("\n");
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent("Request for Information")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form className="form" onSubmit={submit} noValidate>
      <label className="field">
        <span>I am a:</span>
        <select name="iama" value={role} onChange={(e) => setRole(e.target.value)}>
          {ROLES.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </label>

      <div className="form__row">
        <label className="field">
          <span>Full Name *</span>
          <input
            type="text"
            name="full_name"
            placeholder="Your Name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby="err-name"
          />
          {errors.name && <small id="err-name" className="field__error">{errors.name}</small>}
        </label>
        <label className="field">
          <span>Email *</span>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby="err-email"
          />
          {errors.email && <small id="err-email" className="field__error">{errors.email}</small>}
        </label>
      </div>

      <label className="field">
        <span>Comments</span>
        <textarea name="comments" rows={5} placeholder="Enter your message here" value={comments} onChange={(e) => setComments(e.target.value)} />
      </label>

      <label className="check">
        <input type="checkbox" name="email_list" checked={list} onChange={(e) => setList(e.target.checked)} />
        <span>Sign me up for Email List</span>
      </label>
      <p className="fineprint">
        I agree to and consent to receive news, updates, and other communications by way of commercial electronic messages (including
        email) from BluEnergies Ltd. I understand I may withdraw consent at any time by clicking the unsubscribe link contained in all
        emails from BluEnergies Ltd. <a href={`mailto:${company.email}`}>{company.email}</a>
      </p>

      <div className="form__foot">
        <button type="submit" className="btn btn--primary btn--on-light">
          <span>Submit</span>
          <Arrow />
        </button>
        <p className="fineprint" aria-live="polite">
          {sent ? `Your email app should now open with the request addressed to ${company.email}. Please send it from there.` : ""}
        </p>
      </div>
    </form>
  );
}
