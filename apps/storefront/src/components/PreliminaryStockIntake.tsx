"use client";

import { useMemo, useState } from "react";
import { parseStockIntake, stockIntakeSummary } from "@/lib/stock-intake";

const example = `Coke 1.5L | 85 | 8 | everyday
Pili brittle gift pack | 129 | 5 | local
Native Christmas ornament | 99 | MTO | seasonal | made to order`;

function peso(value: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0
  }).format(value);
}

export function PreliminaryStockIntake() {
  const [text, setText] = useState(example);
  const parsed = useMemo(() => parseStockIntake(text), [text]);
  const summary = useMemo(() => stockIntakeSummary(parsed), [parsed]);

  return (
    <div className="stock-intake-shell">
      <div className="stock-intake-editor">
        <label>
          <span>Paste preliminary stock</span>
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={8}
            spellCheck={false}
            aria-describedby="stock-intake-help"
          />
        </label>
        <p id="stock-intake-help" className="admin-helper">
          One item per line. Easiest format: <code>Name | Price | Qty | Lane | Availability</code>. Lanes: everyday, find, local, seasonal. Use MTO for made-to-order.
        </p>
        <div className="stock-intake-summary">
          <div><span>Lines</span><strong>{summary.total}</strong></div>
          <div><span>Ready</span><strong>{summary.valid}</strong></div>
          <div><span>Needs fixing</span><strong>{summary.invalid}</strong></div>
          <div><span>Units</span><strong>{summary.units}</strong></div>
          <div><span>Retail value</span><strong>{peso(summary.estimatedRetailValue)}</strong></div>
        </div>
        <div className="stock-intake-hold-note">
          Preview only. Nothing is saved or published until the dedicated online database and staff authentication are connected.
        </div>
      </div>

      <div className="stock-intake-table-wrap" role="region" aria-label="Normalized stock preview" tabIndex={0}>
        <table className="stock-intake-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Lane</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {parsed.length === 0 ? (
              <tr><td colSpan={5} className="stock-intake-empty">Paste items to preview them here.</td></tr>
            ) : parsed.map((line) => (
              <tr key={`${line.lineNumber}-${line.raw}`} className={line.errors.length ? "stock-intake-invalid" : ""}>
                <td>
                  <strong>{line.name || `Line ${line.lineNumber}`}</strong>
                  {line.errors.map((error) => <small key={error}>{error}</small>)}
                </td>
                <td>{line.price === null ? "—" : peso(line.price)}</td>
                <td>{line.quantity ?? (line.availability === "made_to_order" ? "MTO" : "—")}</td>
                <td>{line.lane}</td>
                <td>
                  <span className={`stock-intake-pill stock-${line.errors.length ? "error" : line.availability}`}>
                    {line.errors.length ? "fix line" : line.availability.replaceAll("_", " ")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
