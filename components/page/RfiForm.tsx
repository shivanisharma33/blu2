"use client";

import { useState } from "react";
import { company } from "@/lib/content";
import { Arrow } from "../ui/primitives";

const ROLES = ["Potential Investor", "Analyst", "Shareholder", "Journalist", "Broker", "Investment Advisor", "Industry Professional"];

/**
 * Request-for-information form with the same fields as the official site.
 * This app has no mail backend yet, so submitting opens the visitor's email client with the
 * request pre-filled and addressed to the company. Swap `submit` for an API call when one exists.
 */
export default function RfiForm() {
  const [role, setRole] = useState("");
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

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      role && `I am a: ${role}`,
      `Add to email list: ${list ? "Yes, I consent to receive news, updates and other communications" : "No"}`,
      "",
      comments,
    ]
      .filter((l): l is string => typeof l === "string")
      .join("\n");
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent("Request for Information")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form className="form" onSubmit={submit} noValidate>
      <fieldset className="form__roles">
        <legend>I am a</legend>
        <div>
          {ROLES.map((r) => (
            <label key={r} className={`chip ${role === r ? "is-active" : ""}`}>
              <input type="radio" name="role" value={r} checked={role === r} onChange={() => setRole(r)} />
              {r}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="form__row">
        <label className="field">
          <span>Full name *</span>
          <input type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} aria-describedby="err-name" />
          {errors.name && <small id="err-name" className="field__error">{errors.name}</small>}
        </label>
        <label className="field">
          <span>Email *</span>
          <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.email} aria-describedby="err-email" />
          {errors.email && <small id="err-email" className="field__error">{errors.email}</small>}
        </label>
      </div>

      <label className="field">
        <span>Comments</span>
        <textarea rows={5} value={comments} onChange={(e) => setComments(e.target.value)} />
      </label>

      <label className="check">
        <input type="checkbox" checked={list} onChange={(e) => setList(e.target.checked)} />
        <span>
          <strong>Sign me up for the email list.</strong> I agree to and consent to receive news, updates, and other communications by
          way of commercial electronic messages (including email) from BluEnergies Ltd. I understand I may withdraw consent at any time
          by clicking the unsubscribe link contained in all emails from BluEnergies Ltd.
        </span>
      </label>

      <div className="form__foot">
        <button type="submit" className="btn btn--primary btn--on-light">
          <span>Submit</span>
          <Arrow />
        </button>
        <p className="fineprint" aria-live="polite">
          {sent
            ? `Your email app should now open with the request addressed to ${company.email}. Please send it from there.`
            : `Submitting opens your email app with the request addressed to ${company.email}.`}
        </p>
      </div>
    </form>
  );
}
