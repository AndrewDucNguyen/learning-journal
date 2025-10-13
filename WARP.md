# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Repository Overview

This is a personal learning journal repository that contains structured notes and documentation on various programming topics, organized as markdown files. The repository serves as a knowledge base for web development concepts, algorithms, data structures, and programming frameworks.

## Repository Structure

The repository follows a hierarchical topic-based organization:

```
├── data-structures-algorithms/     # Computer science fundamentals
├── web-development/               # Web development topics
│   ├── The Odin Project/         # Notes from The Odin Project curriculum
│   └── Web Developer Bootcamp/   # Notes from Web Developer Bootcamp course
│       ├── Express/              # Express.js framework notes
│       ├── Node/                 # Node.js runtime notes  
│       ├── React/                # React library notes
│       └── Mongo/                # MongoDB database notes
└── .idea/                        # IntelliJ IDEA configuration files
```

## Content Organization Patterns

- **Topic-based directories**: Each major subject area has its own directory
- **Course-specific subdirectories**: Learning materials are organized by their source (e.g., "The Odin Project", "Web Developer Bootcamp")
- **Technology-specific files**: Individual markdown files for specific technologies (e.g., `javascript.md`, `node.md`, `express.md`)
- **Structured learning notes**: Files contain definitions, code examples, and key concepts with consistent formatting

## Common Development Tasks

### Adding New Learning Notes
Create new markdown files following the established naming conventions:
```bash
# For new topics under existing courses
touch "web-development/Web Developer Bootcamp/[technology-name].md"

# For new course materials
mkdir -p "web-development/[Course Name]"
touch "web-development/[Course Name]/[topic].md"

# For algorithms and data structures
touch "data-structures-algorithms/[topic].md"
```

### Viewing and Searching Content
```bash
# Search for specific topics across all notes
grep -r "keyword" . --include="*.md"

# Find files related to specific technologies
find . -name "*react*" -type f
find . -name "*node*" -type f

# View directory structure
find . -type f -name "*.md" | sort
```

### Managing Repository
```bash
# View recent changes to learning materials
git --no-pager log --oneline -10

# Check status of current notes
git status

# Add new learning notes
git add [file-path]
git commit -m "Add notes on [topic]"
```

## File Content Patterns

Learning notes in this repository typically follow these patterns:

- **Headers**: Use markdown headers (`#`, `##`, `###`) for topic organization
- **Code examples**: Include practical JavaScript/Node.js/React code snippets with proper syntax highlighting
- **Definitions**: Start sections with clear definitions of concepts
- **Lists**: Use bullet points for key features, methods, or concepts
- **Tables**: Organize comparison data (like Big O notation complexities)

## Key Learning Areas

The repository currently covers:

- **JavaScript Fundamentals**: Array methods, core language features
- **Node.js**: Server-side JavaScript, file system operations, process management
- **Express.js**: Web framework, routing, middleware, RESTful APIs
- **React**: Components, JSX, props, application structure
- **Algorithms**: Big O notation, search algorithms, sorting algorithms

## Notes for WARP

- This is primarily a documentation repository with no executable code or build processes
- Content is meant for reference and learning purposes
- Files are plain markdown and can be edited directly
- The repository uses IntelliJ IDEA as indicated by the `.idea` directory
- Version control tracks learning progress over time through git history