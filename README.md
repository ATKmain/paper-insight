# Paper Insights

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/ATKmain/paper-insights)

[![License: MIT](https://img.shields.io/badge/License-APACHE2.0-yellow.svg)](https://www.apache.org/licenses/LICENSE-2.0)

Paper Insights uses the Retrieval Augmented Generation (RAG) capabilities of [LlamaIndex](https://github.com/jerryjliu/llama_index) to answer questions about Papers documents.
This project created based on [SEC Insigt](https://github.com/run-llama/sec-insights)

You can also check out SES insight [End-to-End tutorial guide on YouTube](https://youtu.be/2O52Tfj79T4?si=CYUcaBkc9P9g_m0P) for similar project! This video covers product features, system architecture, development environment setup, and how to use this application with your own custom documents *(beyond just Paper filings!)*. The video has chapters so you can skip to the papertion most relevant to you.

## Why did I make this? 🤔
I created the project "Paper Insights" and made it public on GitHub due to a deeply personal motivation—my son's chronic kidney issue, nephrotic syndrome. The root cause of this disease remains elusive, which led me to delve into extensive research and study of medical papers. I quickly realized the immense challenge of navigating through complex scientific literature. To address this, I developed "Paper Insights," a tool designed to aid in reading and analyzing scientific papers more effectively. This tool allows users to ask questions, gain insights from multiple documents at once, and accurately reference the original sources of any conclusions or logical reasoning derived. My goal in creating this project was to empower myself and others who are seeking to understand and possibly find cures for diseases that affect our loved ones.

## Product Features 😎
- Chat-based Document Q&A against a pool of documents
- Citation of source data that LLM response was based on
- PDF Viewer with highlighting of citations
- Use of API-based tools ([polygon.io](https://polygon.io/)) for answering quantitative questions
- Token-level streaming of LLM responses via [Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- Streaming of Reasoning Steps (Sub-Questions) within Chat

## Development Features 🤓
- Infrastructure-as-code for deploying directly to [Vercel](https://vercel.com/) & [Render](https://render.com/)
- Continuous deployments provided by Vercel & Render.com. Shipping changes is as easy as merging into your `main` branch.
- Production & Preview environments for both Frontend & Backend deployments! Easily try your changes before release.
- Robust local environment setup making use of [LocalStack](https://localstack.cloud/) & [Docker](https://www.docker.com/) compose
- Monitoring & Profiling provided by [Sentry](https://sentry.io/welcome/)
- Load Testing provided by [Loader.io](https://loader.io/)
- Variety of python scripts for REPL-based chat & data management

## Tech Stack ⚒️
- Frontend
    - [React](https://react.dev/) / [Next.js](https://nextjs.org/)
    - [Tailwind CSS](https://tailwindcss.com/)
- Backend
    - [FastAPI](https://fastapi.tiangolo.com/)
    - [Docker](https://www.docker.com/)
    - [SQLAlchemy](https://www.sqlalchemy.org/)
    - [OpenAI](https://openai.com/) (gpt-3.5-turbo + text-embedding-ada-002)
    - [PGVector](https://github.com/pgvector/pgvector)
    - [LlamaIndex 🦙](https://www.llamaindex.ai/)
- Infrastructure
    - [Render.com](https://render.com/)
        - Backend hosting
        - [Postgres 15](https://www.postgresql.org/)
    - [Vercel](https://vercel.com/)
        - Frontend Hosting
    - [AWS](https://aws.amazon.com/)
        - [Cloudfront](https://aws.amazon.com/cloudfront/)
        - [S3](https://aws.amazon.com/s3/)

### System Architecture
[![System Architecture](https://www.plantuml.com/plantuml/svg/jLJ1Jjj04BtxAuRqm2aea20rKbMHn7PBrPO8H-q18RIn1sTXFHljZe6qwhztiS59kWujX-uXqinxy-RDZ9KJoy9mMQXWZnTO8CnLYRaHgs0VGhoMXA34IfSCcJIOijHaWxsiHZv7yUngTdPrVlhXuonOLrZjX2olbFj5Pacv3UojfAKmee2bI6z5Zl0p0FV6BigDBYcRQAKDl0aF9uDe2B0F2JBC6nZI2cSDXU1q0Suk26FqVGtKOjfaQ9w4-jMhyh4cJkGFXCD14_kiXD6WvjKID_2uUZw-rlEHQlAnLjaVu4Z9d215SfdWLx2narJfClll6paQlksDX-qRsFQJ2HPpONSUAGwZSTZpEuJzuq6lzoyTQgEr_DQSNl5WC3oEgkni8TDRGclXQ5kCTBRBwim8iew5n9jsVUplbWscB2XNExSIZQ8m2blsFkb7noziPItSEKToTGUfBZeWBDJXKx-BM5WUJK-hnWwuhBCJema-wNaTDfURQikvGVlOeFwyEgFl2IJzphFSj9mhcS8qZ65SEaL-4fmQUISO8M5jH8uJJOmFt73MUj43eo6X845p9rEqZNI2n6Pr83LyqIITZgJy4jvr5LvpTzSWPqkaqUcps2Czq_VqUlfw8SxgyxzDvnkQ55NZyAiRwU36Gkp8N8awyZuaZk-yWiXkIii54biexMDc8RCCgVvkRU3NG_UYfbosEVOoc_JcL8trJRZjK3kPBv-krNQvxBxt7RTI7R7DZ5TSCPkfsk7TNhq9_Ru-vVMAZRyJvwair6y0)](https://www.plantuml.com/plantuml/svg/jLJ1Jjj04BtxAuRqm2aea20rKbMHn7PBrPO8H-q18RIn1sTXFHljZe6qwhztiS59kWujX-uXqinxy-RDZ9KJoy9mMQXWZnTO8CnLYRaHgs0VGhoMXA34IfSCcJIOijHaWxsiHZv7yUngTdPrVlhXuonOLrZjX2olbFj5Pacv3UojfAKmee2bI6z5Zl0p0FV6BigDBYcRQAKDl0aF9uDe2B0F2JBC6nZI2cSDXU1q0Suk26FqVGtKOjfaQ9w4-jMhyh4cJkGFXCD14_kiXD6WvjKID_2uUZw-rlEHQlAnLjaVu4Z9d215SfdWLx2narJfClll6paQlksDX-qRsFQJ2HPpONSUAGwZSTZpEuJzuq6lzoyTQgEr_DQSNl5WC3oEgkni8TDRGclXQ5kCTBRBwim8iew5n9jsVUplbWscB2XNExSIZQ8m2blsFkb7noziPItSEKToTGUfBZeWBDJXKx-BM5WUJK-hnWwuhBCJema-wNaTDfURQikvGVlOeFwyEgFl2IJzphFSj9mhcS8qZ65SEaL-4fmQUISO8M5jH8uJJOmFt73MUj43eo6X845p9rEqZNI2n6Pr83LyqIITZgJy4jvr5LvpTzSWPqkaqUcps2Czq_VqUlfw8SxgyxzDvnkQ55NZyAiRwU36Gkp8N8awyZuaZk-yWiXkIii54biexMDc8RCCgVvkRU3NG_UYfbosEVOoc_JcL8trJRZjK3kPBv-krNQvxBxt7RTI7R7DZ5TSCPkfsk7TNhq9_Ru-vVMAZRyJvwair6y0)

## Usage 💻
See `README.md` files in `frontend/` & `backend/` folders for individual setup instructions for each. As mentioned above, we also have a YouTube tutorial [here](https://youtu.be/2O52Tfj79T4?si=1Tm3zvuqna5ei4Cu&t=677) that covers how to setup this project's development environment.

We've also included a config for a [GitHub Codespace](https://github.com/features/codespaces) in [`.devcontainer/devcontainer.json`](https://github.com/ATKmain/paper-insights/blob/main/.devcontainer/devcontainer.json). If you choose to use GitHub Codespaces, your codespace will come pre-configured with a lot of the libraries and system dependencies that are needed to run this project. This is probably the fastest way to get this project up and running! Having said that, developers have successfully set-up this project in Linux, macOS, and Windows environments!

If you have any questions when trying to run this project, you may find your answer quickly by reviewing our [FAQ](./FAQ.md) or by searching through our [GitHub issues](https://github.com/ATKmain/paper-insights/issues)! If you don't see a satisfactory answer to your question, feel free to [open a GitHub issue](https://github.com/ATKmain/paper-insights/issues/new) so we may assist you!


## Caveats 🧐
- The frontend currently doesn't support Mobile

## Contributing 💡
We remain very open to contributions! We're looking forward to seeing the ideas and improvements.


