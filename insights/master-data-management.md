# When a growing company actually needs master data management

*Published 6 November 2026 · 7 min read*

Master data management (MDM) has a reputation problem. It is sold as an enterprise programme with a steering committee, a multi-year roadmap and a six-figure licence. For many growing companies that framing is absurd: they have a few thousand customers, a product catalogue and a finance system, not a global governance function.

But the underlying problem is real. Once several systems hold the same entities, someone has to decide which record is authoritative. This article describes the symptoms that justify MDM, the smallest useful implementation, and the order in which to fix things.

## What counts as master data

Master data is the small set of entities that many processes refer to:

- **Parties** — customers, prospects, suppliers, partners
- **Products** — items, SKUs, product families, service offerings
- **Organisations** — legal entities, business units, sites
- **Reference data** — currencies, units, countries, industry codes, tax categories
- **Materials and assets** — in manufacturing and maintenance contexts

Transactional data (orders, invoices, tickets) is not master data, although it references it. The distinction matters because master data changes slowly and is reused widely; that is exactly why inconsistency is expensive.

## Symptoms worth acting on

You do not need MDM because a vendor says so. You need it when one or more of these are true:

### 1. The same entity has different identifiers in different systems

A customer exists as `CUST-1042` in the ERP, `acme.example` in the CRM and “ACME Pte Ltd” in finance. Reconciling them consumes analyst time every month, and the reconciliation is never quite complete.

### 2. Reporting disagrees with itself

Two dashboards show different revenue or supplier counts. The meeting is spent arguing about definitions instead of decisions. Each system is internally consistent; the organisation is not.

### 3. Onboarding a system requires a manual data project

Every new tool needs a spreadsheet of customers, products and codes, cleaned by hand. The integration is done once and then drifts immediately.

### 4. Approval and ownership are unclear

Anyone can edit a customer record. No one can say who approved a change, why a supplier was blocked, or when a product code was introduced. Audits become archaeology.

### 5. AI or automation projects stall on data quality

An assistant cannot answer “how many active suppliers do we have in Vietnam” if the answer depends on which system you ask. AI amplifies data quality; it does not fix it.

If none of these apply, you probably do not need MDM yet. A shared spreadsheet with an owner may be enough. The cost of governance is real, and premature MDM becomes another silo.

## The smallest useful MDM

A minimum viable MDM has five components:

1. **A model.** Define each entity, its fields, types, required constraints and relationships. Treat the model as versioned code, not a diagram in a slide deck.
2. **A golden record.** For each entity, define which source wins for which field, or require a steward to make the choice. Store the result with its provenance.
3. **A workflow.** Changes to master data go through review and approval. The workflow should be configurable but not infinitely so.
4. **An access model.** Roles, permissions and menus determine who can propose, approve and publish changes.
5. **An API.** Downstream systems read the golden record through a documented interface. Without an API, the MDM becomes a read-only report.

Everything else (data quality dashboards, matching algorithms, hierarchy management) can be added later. Starting with these five keeps the first release small enough to finish.

## Build the model before the cleanup

Teams often begin with a data cleanup project: deduplicate customers, normalise supplier names, fix product codes. The cleanup produces a one-time improvement that decays as soon as new records arrive.

A better order is:

1. **Model first.** Agree on fields, identifiers and relationships.
2. **Then govern.** Assign owners and approval rules for each domain.
3. **Then migrate.** Load and reconcile existing records against the model.
4. **Then integrate.** Connect downstream systems to the API.
5. **Then measure.** Track duplicates, missing fields, approval latency and adoption.

The model is the contract. Without it, cleanup has no definition of “clean”.

## Build versus buy

Commercial MDM suites are mature and expensive. They make sense for large organisations with complex hierarchies, multi-domain governance and dedicated data teams. They are usually a poor fit for a growing company that needs a clear model, an approval workflow and an API.

Open-source options change the calculus. A self-hosted platform such as [PieMDM](https://pieteams.github.io/piemdm/) provides modelling, dictionaries, entity management, approval flows, permissions and an OpenAPI surface without licence fees. The trade-off shifts from licence cost to implementation effort: you still need to define the model and convince people to follow the workflow.

The honest comparison is total cost of ownership:

| Factor | Commercial suite | Self-hosted open source |
| --- | --- | --- |
| Licence | Recurring, often per user | None (MIT) |
| Implementation | Vendor or partner led | Internal or integrator led |
| Customisation | Configuration plus vendor roadmap | Direct code changes |
| Upgrade path | Vendor managed | Your responsibility |
| Lock-in | Moderate to high | Low: data and schema are yours |

For a company with competent IT and a bounded domain, self-hosting is often the better trade. For a multinational with regulatory complexity, a vendor may still be right.

## Common failure modes

- **Boiling the ocean.** Trying to govern every domain at once. Start with one entity that causes visible pain.
- **Governance without tooling.** A policy document that no system enforces.
- **Tooling without governance.** A platform nobody is accountable for maintaining.
- **Perfect matching.** Spending months on fuzzy matching before publishing a single golden record.
- **Ignoring the API.** If downstream systems cannot consume the data, the MDM is a reporting tool.

## A pragmatic starting point

Pick one domain — usually customers or suppliers. Define twenty fields, not two hundred. Assign one steward. Configure one approval flow. Publish one API endpoint. Measure duplicate rate and time-to-approve for a quarter. If the process holds, expand the model. If it does not, fix the process before adding domains.

MDM is not a product you install; it is an agreement about which data is authoritative and who may change it. Software makes the agreement enforceable. It cannot make it for you.

## Further reading

- [What is PieMDM](https://pieteams.github.io/piemdm/getting-started/what-is-piemdm) — architecture and technology choices
- [Master data systems](https://pieteams.github.io/piemdm/getting-started/master-data-system) — the landscape of MDM platforms
- [PieMDM approval flows](https://pieteams.github.io/piemdm/guide/approval-flow) — how governed changes work
