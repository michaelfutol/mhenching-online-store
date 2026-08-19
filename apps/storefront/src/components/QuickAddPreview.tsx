"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";

type Availability = "in_store" | "online_only" | "made_to_order" | "consignment";
type Lane = "find" | "local" | "seasonal" | "everyday";

function suggestDescription(name: string, lane: Lane) {
  const clean = name.trim();
  if (!clean) return "";
  if (lane === "local") return `${clean} — a locally made product to be listed with verified maker, origin, materials and availability.`;
  if (lane === "seasonal") return `${clean} — a seasonal find selected for giftability, usefulness and a simple Christmas presentation.`;
  if (lane === "find") return `${clean} — a small useful find chosen because it solves an everyday problem without costing too much.`;
  return `${clean} — an everyday Mhenching item with clear local availability and straightforward ordering.`;
}

export function QuickAddPreview() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [availability, setAvailability] = useState<Availability>("in_store");
  const [lane, setLane] = useState<Lane>("find");
  const [description, setDescription] = useState("");
  const [previewed, setPreviewed] = useState(false);

  const priceNumber = Number(price || 0);
  const suggested = useMemo(() => suggestDescription(name, lane), [name, lane]);

  function imageChanged(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return url;
    });
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPreviewed(true);
    if (!description.trim()) setDescription(suggested);
  }

  return (
    <div className="quick-add-grid">
      <form className="quick-add-form" onSubmit={submit}>
        <div className="admin-step">
          <span>1</span>
          <div>
            <strong>Photo</strong>
            <small>Take one now or choose from the phone.</small>
          </div>
        </div>
        <label className="photo-drop">
          {imageUrl ? <img src={imageUrl} alt="Product preview" /> : <span>＋ Add product photo</span>}
          <input type="file" accept="image/*" capture="environment" onChange={imageChanged} />
        </label>

        <div className="admin-field">
          <label htmlFor="admin-product-name">Product name</label>
          <input id="admin-product-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Anahaw Christmas Star" required />
        </div>

        <div className="quick-add-pair">
          <div className="admin-field">
            <label htmlFor="admin-price">Selling price</label>
            <div className="peso-input"><span>₱</span><input id="admin-price" inputMode="decimal" value={price} onChange={(event) => setPrice(event.target.value)} placeholder="99" required /></div>
          </div>
          <div className="admin-field">
            <label htmlFor="admin-stock">Stock / capacity</label>
            <input id="admin-stock" inputMode="numeric" value={stock} onChange={(event) => setStock(event.target.value)} placeholder={availability === "made_to_order" ? "e.g. 10/week" : "e.g. 5"} />
          </div>
        </div>

        <div className="admin-field">
          <label htmlFor="admin-availability">Availability</label>
          <select id="admin-availability" value={availability} onChange={(event) => setAvailability(event.target.value as Availability)}>
            <option value="in_store">In the physical store</option>
            <option value="online_only">Online-only stock</option>
            <option value="made_to_order">Made to order</option>
            <option value="consignment">Consignment</option>
          </select>
        </div>

        <div className="admin-field">
          <label htmlFor="admin-lane">Where should it appear?</label>
          <select id="admin-lane" value={lane} onChange={(event) => setLane(event.target.value as Lane)}>
            <option value="find">Mhenching Finds</option>
            <option value="local">Gawang Magdalena</option>
            <option value="seasonal">Christmas / Seasonal</option>
            <option value="everyday">Everyday Mhenching</option>
          </select>
        </div>

        <details className="admin-advanced">
          <summary>Optional details</summary>
          <div className="admin-field">
            <label htmlFor="admin-description">Short description</label>
            <textarea id="admin-description" rows={4} value={description} onChange={(event) => setDescription(event.target.value)} placeholder={suggested || "We can suggest this after you enter the product name."} />
            {suggested ? <button className="text-action" type="button" onClick={() => setDescription(suggested)}>Use suggested description</button> : null}
          </div>
          <p className="admin-helper">Maker, supplier, provenance, landed cost, margin, dimensions, export flags and campaign tags will live here later—not in the everyday Quick Add flow.</p>
        </details>

        <button className="button quick-add-submit" type="submit">Preview item</button>
        <p className="admin-helper">Preview only. Saving/publishing remains disabled until Supabase auth + catalog persistence are connected.</p>
      </form>

      <aside className="quick-add-preview" aria-live="polite">
        <div className="eyebrow">Customer preview</div>
        <div className="admin-preview-image">
          {imageUrl ? <img src={imageUrl} alt="" /> : <span>Your product photo will appear here.</span>}
        </div>
        <div className="admin-preview-copy">
          <span className="admin-preview-lane">{lane === "local" ? "Gawang Magdalena" : lane === "seasonal" ? "Christmas / Seasonal" : lane === "find" ? "Mhenching Find" : "Everyday"}</span>
          <h2>{name || "Product name"}</h2>
          <strong className="admin-preview-price">{priceNumber > 0 ? `₱${priceNumber.toLocaleString("en-PH")}` : "₱—"}</strong>
          <p>{description || suggested || "A short useful description will appear here."}</p>
          <small>{availability === "made_to_order" ? "Made to order" : availability === "consignment" ? "Consignment item" : availability === "online_only" ? "Online stock" : "Physical-store backed"}{stock ? ` · ${stock}` : ""}</small>
          {previewed ? <div className="admin-preview-ready">✓ Looks ready for a draft. Persistence is the next gate.</div> : null}
        </div>
      </aside>
    </div>
  );
}
