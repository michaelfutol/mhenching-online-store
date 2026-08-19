# Build Doctrine — Overkill + Simplest Form

## Principle

> **Overkill underneath. Simplest form on top.**

Mhenching Online may use sophisticated architecture, analytics, agents, audit logs, scoring models and integration contracts internally. Operators should see only the minimum decisions required to complete their task safely.

## Operator rule

For Chingmen/Michael, default flows should fit one screen and one mental model.

### Example: Add a product

Primary flow:

1. Take/upload photo
2. Enter product name
3. Enter selling price
4. Enter stock/availability
5. Pick category/collection
6. Save draft or Publish

Optional intelligence can run automatically:

- generate a short description;
- suggest category;
- suggest tags;
- suggest related products;
- calculate margin when cost exists;
- flag unusually low margin;
- detect likely duplicate item;
- suggest Mhenching Finds/Gawang Magdalena lane;
- suggest Christmas/gift classification;
- prepare social caption/demo idea.

Advanced fields belong behind a secondary drawer and must never block ordinary item entry unless legally or operationally required.

## Complexity budget

Every new feature must answer:

- Can we automate this?
- Can we infer this safely?
- Can we hide it until needed?
- Can we make the default choice correct for most users?
- Does the operator really need to understand the internal implementation?

If not, remove the burden from the human workflow.

## Safety exception

Simplicity must not hide decisions that materially affect money, customer promises, compliance, refunds, inventory purchase or physical POS integrity. Those actions require explicit confirmation and auditability.
