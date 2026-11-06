# Projects

PieTeams maintains three open-source projects. They are separate tools, but they share a common design goal: make important information explicit, searchable and portable.

## PieKBS — knowledge search for AI agents

**Website:** [pieteams.github.io/piekbs](https://pieteams.github.io/piekbs/)  
**Source:** [github.com/pieteams/piekbs](https://github.com/pieteams/piekbs)  
**License:** MIT  
**Stack:** Go, SQLite FTS5, Model Context Protocol

PieKBS is a local-first knowledge base built for agents rather than for chat interfaces. It watches a `raw/` directory, distills source documents into structured Markdown notes, and indexes the result with SQLite FTS5 and BM25 scoring. Agents then use three MCP tools:

- `kb_search` — search the knowledge base and receive ranked pages
- `kb_page` — read a page in full
- `kb_add` — contribute new material

Because the knowledge layer is plain Markdown, every change can be reviewed with `git diff`, linted and corrected. There is no embedding service to operate and no hidden vector store to explain.

**Good fit for:** teams that want an auditable knowledge layer for coding agents, research agents or internal assistants.

## PieMDM — master data management for enterprises

**Website:** [pieteams.github.io/piemdm](https://pieteams.github.io/piemdm/)  
**Source:** [github.com/pieteams/piemdm](https://github.com/pieteams/piemdm)  
**License:** MIT  
**Stack:** Go, Gin, GORM, MySQL, Redis, Vue 3, Vite

PieMDM is a full-stack platform for managing the data an organisation cannot afford to duplicate or contradict: customers, suppliers, materials, products, organisations and reference dictionaries.

The platform covers:

- data models, tables and fields with versioned definitions
- dictionaries and reference data
- entity creation, editing and approval
- configurable approval flows
- users, roles, menus and permissions
- an OpenAPI surface plus generated SDK material

A typical deployment runs the Go API and the Vue frontend in Docker Compose, with MySQL for persistence and Redis for caching and workflow state.

**Good fit for:** enterprises and system integrators that need a self-hosted MDM foundation without licensing fees.

## PiePLM — a PLM blueprint for small manufacturers

**Website:** [pieteams.github.io/pieplm](https://pieteams.github.io/pieplm/)  
**Source:** [github.com/pieteams/pieplm](https://github.com/pieteams/pieplm)  
**License:** MIT  
**Status:** documentation and design phase

PiePLM explores how small and mid-sized manufacturers can manage product information across requirements, design, bill of materials, changes, quality and suppliers without the cost and complexity of a traditional PLM suite.

The public repository currently contains the project documentation and design notes. The site explains the problem, the intended architecture, the module boundaries and the planned API and MCP integration. It is deliberately published as a blueprint so that manufacturers and developers can evaluate the approach before implementation.

**Good fit for:** manufacturing SMEs, PLM consultants and developers interested in an open alternative to proprietary suites.

## How the projects relate

The projects can be adopted independently. When used together, they form a coherent data chain:

```text
PiePLM  product definitions, requirements, changes
   │
   ▼
PieMDM  governed master data: products, suppliers, materials
   │
   ▼
PieKBS  distilled knowledge and documents for people and agents
```

Each step keeps its own source of truth and exposes a documented interface, so a team can start with one project and add another later without re-platforming.

## Contributing

All projects use GitHub issues and pull requests. Read the `README.md` and `CONTRIBUTING.md` in the relevant repository before opening a large change. Documentation fixes are always welcome, including corrections to this website.
