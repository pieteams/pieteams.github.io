# RAG vs. LLM wiki: two ways to give agents knowledge

*Published 6 November 2026 · 8 min read*

Retrieval-augmented generation (RAG) and an LLM-maintained wiki are often presented as competing answers to the same question: how do we give a model access to our documents? In practice they optimise for different things, and the right architecture usually borrows from both.

## The standard RAG pipeline

A conventional RAG system has four stages:

1. **Ingest** documents and split them into chunks.
2. **Embed** each chunk into a vector.
3. **Retrieve** the top-k chunks for a query.
4. **Generate** an answer conditioned on those chunks.

This pipeline is popular because it is easy to start and works reasonably well for questions whose answer lives in a single passage. It does not require anyone to organise the corpus, and it scales to large collections without manual authoring.

Its weaknesses appear as soon as questions become multi-hop or evidence-sensitive:

- **Chunk boundaries cut through meaning.** A procedure split across three chunks may never be retrieved as a whole.
- **No stable identity.** A chunk is an artifact of the splitter, not a topic. You cannot link to it, cite it cleanly or update it deliberately.
- **Duplication and contradiction.** Two documents may say different things; the retriever returns both and the model averages them.
- **Opaque relevance.** Similarity scores are hard to explain to a user or an auditor.
- **Index drift.** Re-embedding is expensive, and stale chunks survive quietly.

None of these are fatal. They are the cost of avoiding curation.

## The wiki approach

An LLM wiki takes a different route. Instead of indexing raw chunks, it distills source documents into structured pages: one page per source note, plus concept pages that synthesize multiple sources. Those pages are the retrieval unit.

The pipeline becomes:

1. **Ingest** a source document.
2. **Distill** it into a structured note with citations.
3. **Synthesize** concept, comparison or decision pages from multiple notes.
4. **Index** the resulting pages with lexical and structural search.
5. **Read** the pages in full when an agent requests them.

The important difference is that the knowledge layer is an artifact a human can inspect. Pages have titles, links and sources. Changes are visible in version control. Contradictions can be resolved instead of averaged.

The cost is maintenance. Distillation takes compute or human time, and a wiki can rot if nobody reviews it. An LLM wiki also inherits the model's mistakes: a confidently wrong summary is worse than an unsummarised source. This is why the output should remain reviewable Markdown with explicit source links.

## A side-by-side comparison

| Dimension | Chunk-based RAG | LLM wiki |
| --- | --- | --- |
| Retrieval unit | Arbitrary chunk | Stable page |
| Authoring effort | Low at ingest | Higher: distillation and review |
| Multi-hop questions | Weak unless the agent iterates | Strong: pages link to related pages |
| Citation quality | Chunk-level, often ambiguous | Page-level with source links |
| Auditability | Low | High: diffable Markdown |
| Freshness | Re-embedding pipeline | Rebuild affected pages |
| Failure mode | Retrieves plausible but incomplete context | Distills confidently wrong pages |
| Best fit | Large, fast-changing, loosely structured corpora | Curated domains where correctness matters |

## They are not mutually exclusive

The useful question is not “RAG or wiki?” but “what should the agent retrieve, and what should it read?”

A strong architecture often looks like this:

- **Wiki pages as the primary unit.** Distill high-value sources into readable pages with citations.
- **Lexical search as the baseline.** BM25 handles identifiers, names and exact phrases that embeddings miss.
- **Optional embeddings as a second channel.** Use them for paraphrase matching, then fuse results with reciprocal rank fusion.
- **Structure-aware ranking.** Prefer pages with more sources, better links and recent review dates.
- **Full-page reading.** Once a page is selected, give the agent the whole page rather than another fragment.

This is the design PieKBS follows. It is deliberately local-first: SQLite FTS5 for search, files on disk for storage, MCP for access. You can add a vector index later without changing the knowledge model.

## How to choose

Choose **chunk-based RAG** when:

- the corpus is large, heterogeneous and changes constantly
- questions are mostly single-passage lookups
- you cannot afford curation
- you need a working prototype quickly

Choose an **LLM wiki** when:

- correctness and provenance matter more than coverage
- the same concepts recur across documents and need synthesis
- agents must read complete procedures or policies
- humans need to review and correct what the system knows
- the corpus is bounded enough to maintain

Many teams end up with a hybrid: a curated wiki for core knowledge, and vector search over an archive of raw documents for long-tail recall. The wiki provides quality; the archive provides coverage. Keeping the two layers distinct avoids the common failure where curated and uncurated content compete in the same index.

## Operational checklist

- **Keep the source of truth.** Never let the distilled page become the only copy of a document.
- **Record the model and prompt.** A distillation is reproducible only if you know how it was produced.
- **Track page freshness.** Surface the last review date and the age of the underlying sources.
- **Measure retrieval, not just answers.** Log which pages were returned, which were read and which were cited.
- **Review contradictions.** A wiki should make disagreement visible, not resolve it silently.
- **Plan for deletion.** Sources expire; pages must be removable without leaving orphan claims.

The deepest difference between the two approaches is philosophical. Chunk-based RAG treats knowledge as a search problem. An LLM wiki treats knowledge as an editorial artifact. Agents need both good search and good material; the second is harder to build and more valuable when it works.

## Further reading

- [PieKBS ecosystem comparison](https://pieteams.github.io/piekbs/ecosystem/paradigm-comparison) — a wider survey of RAG and wiki systems
- [Why agents need a search engine](/insights/agent-native-knowledge) — the retrieval loop
- [PieKBS knowledge pipeline](https://pieteams.github.io/piekbs/guide/knowledge-pipeline) — distillation in practice
