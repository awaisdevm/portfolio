# NestJS Clean Architecture & Tailwind CSS Best Practices

A skill to guide the agent in maintaining a zero-dependency domain core in NestJS (Clean Architecture) and writing modern, maintainable, performant Tailwind CSS UI layers.

---

## Use this skill when:
- Designing or refactoring NestJS modules, services, or controllers.
- Implementing business logic (use cases), domain entities, and data repositories.
- Writing or styling frontend components using Tailwind CSS.
- Standardizing directory structures and enforcing strict boundary checks between layers.

## Do not use this skill when:
- Writing raw, non-framework SQL scripts.
- Working with styling libraries other than Tailwind CSS.

---

## 🏗️ NestJS Clean Architecture Standards

Enforce a unidirectional dependency flow: **Presentation (Controllers) ➔ Use Cases (Application) ➔ Domain (Entities/Interfaces) 👤 ➔ Data/Infrastructure (Adapters/Database)**.

### 1. Directory Structure
Ensure all NestJS modules strictly follow this architectural layout:
```text
src/
└── modules/
    └── [domain-name]/
        ├── domain/                  # Pure TypeScript, zero external dependencies
        │   ├── entities/            # Core business objects
        │   └── repositories/        # Repository interfaces (contracts)
        ├── application/             # Application business rules
        │   ├── use-cases/           # Single-responsibility orchestrators
        │   └── dto/                 # Input/Output Data Transfer Objects
        └── infrastructure/          # Framework & external tool implementations
            ├── controllers/         # NestJS HTTP/WebSocket handlers
            ├── persistence/         # TypeORM/Mongoose/Prisma implementations
            └── [domain-name].module.ts