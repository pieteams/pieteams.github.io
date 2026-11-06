# Why agents need a search engine, not an answer machine

*Published 6 November 2026 · 7 min read*

When people add knowledge to an AI system, the first instinct is usually to build an answer machine. Upload the documents, ask a question, receive a paragraph. The appeal is obvious: the interaction feels finished. The problem is that it hides where the answer came from and collapses every possible question into a single response.

Agents work differently. A coding agent investigating a bug, a research agent comparing three approaches, or an operations agent checking a policy does not want one authoritative paragraph. It wants to issue several queries, follow references, read the relevant source in full and reach its own conclusion. That is much closer to how a person uses a search engine than how a person uses a chatbot.

## Retrieval is a loop, not a lookup

A useful agent session looks like this:

1. The agent forms a rough query from the task.
2. It receives a ranked list of candidate pages, each with a title and a short summary.
3. It reads one or two pages in full.
4. It discovers a term it did not know and searches again.
5. It follows links to related material.
6. It cites the pages it used and stops when the evidence is sufficient.

Each step depends on the previous one. If the knowledge system only returns a generated answer, the agent cannot inspect the evidence, cannot notice that a claim is outdated, and cannot correct its own search direction. The loop collapses into a single opaque turn.

This is why PieKBS exposes `kb_search` and `kb_page` rather than an `ask` tool. Search returns pages; page returns the full document. The agent decides what to read and when to stop. The system's job is to make sure the right pages are findable and readable.

## The unit of retrieval matters

Most retrieval-augmented generation systems split documents into fixed-size chunks. Chunking is a compromise: small chunks improve matching but lose context, large chunks preserve context but dilute relevance. A chunk-based system also makes it hard to answer questions that require reading a whole procedure, because the answer is spread across several fragments.

A structured wiki makes a different trade. Each page has a topic, a stable identity and a set of source links. Pages are written to be read in full. Search operates on pages, not arbitrary windows. That gives the agent a clean unit of evidence: "this page, from these sources, updated on this date."

The trade-off is authoring effort. Someone or something must distill source material into pages. PieKBS automates the first pass with a distillation pipeline, but it keeps the output in Markdown so a human can review, correct and version it. The knowledge base is a maintained artifact, not a one-time index.

## Search quality beats vector similarity alone

Vector search is good at finding passages that are semantically close to a query. It is less good at exact identifiers, product codes, error messages and rare terms, where lexical matching is often decisive. It also struggles to explain why a result ranked where it did.

A practical knowledge system usually benefits from hybrid retrieval:

- **Lexical search** (BM25 over SQLite FTS5 or PostgreSQL full-text search) for exact terms, names and codes.
- **Structural signals** such as page type, recency, inbound links and source count.
- **Optional embeddings** for paraphrase matching, fused with lexical results rather than replacing them.

PieKBS starts with lexical search and structure because it is fast, local and explainable. Embeddings can be added, but they are not a prerequisite for a useful knowledge base. This ordering matters: if the underlying pages are poorly organised, better similarity search will only retrieve poor pages more confidently.

## Auditability is a feature

A generated answer is hard to audit. A Markdown page is easy. You can open it, read it, compare two revisions with `git diff`, run a link checker, and see which sources it cites. When an agent cites that page, a human can follow the same path.

This is not nostalgia for plain text. It is an operational requirement. Knowledge that cannot be reviewed will drift. A page that contradicts another page can be found and fixed. A stale claim can be updated in one place. A missing source can be flagged. None of that is possible when knowledge exists only as an opaque embedding.

## What this means in practice

If you are building a knowledge layer for agents, start with these questions:

- **What is the unit of knowledge?** Prefer a stable, readable page over an arbitrary chunk.
- **Can the agent read the whole thing?** Search results should lead to full documents, not fragments.
- **Can a human review a change?** Keep the knowledge layer in a diffable format.
- **Does search handle exact terms?** Include lexical retrieval, not only embeddings.
- **Are sources visible?** Every synthesized page should link back to its evidence.
- **Can the agent stop?** Provide enough structure for the agent to judge when the evidence is sufficient.

An answer machine optimises for the first question a user asks. A search engine optimises for the second, third and fourth questions that follow. Agents ask all of them.

## Further reading

- [What is PieKBS](https://pieteams.github.io/piekbs/getting-started/what-is-piekbs) — the design and structure of the knowledge base
- [RAG vs. LLM wiki](/insights/rag-vs-llm-wiki) — how the two approaches compare
- [How agents use PieKBS](https://pieteams.github.io/piekbs/guide/how-agents-use) — the retrieval loop in detail
