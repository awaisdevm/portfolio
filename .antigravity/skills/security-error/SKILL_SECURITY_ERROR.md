# Security, Input Validation & Error Handling Standard

A skill to enforce strict data validation, preventative security practices, and leak-proof global error handling boundaries across NestJS and TypeScript applications.

---

## Use this skill when:
- Writing or reviewing DTOs (Data Transfer Objects) and controllers.
- Configuring global NestJS pipes, interceptors, or exception filters.
- Implementing authentication, authorization, or role-based access checks.
- Structuring exception handling logic in use cases and adapters.
- Writing logging mechanisms to track application errors.

## Do not use this skill when:
- Designing simple static frontend layouts with no API interaction.

---

## 🔒 Security & Input Validation Rules

### 1. Strict Payload Validation & Whitelisting
* **Class Validator Enforce:** Every incoming controller payload must be mapped to a dedicated DTO decorated with `class-validator` decorators.
* **No Dynamic Payloads:** Reject the use of `Record<string, any>` or raw `any` types for incoming request bodies.
* **Whitelist Execution:** NestJS `ValidationPipe` must be configured with `whitelist: true` and `forbidNonWhitelisted: true` to strip out and reject unmapped, malicious parameters.

### 2. Prevent Sensitive Data Leaks
* **No Raw Password Return:** Domain entities and DTOs must never expose properties containing credentials, tokens, or private user details. Always use class-transformer (`@Exclude()`) or map to sanitized output objects.
* **Secure Logging:** Never log passwords, CVVs, tokens, or personal identifiers (PII) in plain text.

---

## 🪵 Error Handling & Boundary Rules

### 1. Zero Internal Stack Leaks to Client
* **No Database/System Error Exposure:** Never pass raw database errors (e.g., `TypeORMError: Query Failed...`) or Node system errors back to the API response. These disclose database structure and version details to attackers.
* **Unified Exception Filters:** Catch all unhandled exceptions at the global NestJS infrastructure boundary and return a standardized JSON structure.

### 2. Domain Exception Mapping (Clean Architecture)
* **Domain Errors vs HTTP Exceptions:** The Core Domain must throw framework-agnostic TypeScript exceptions (e.g., `UserNotFoundError extends Error`).
* **Adapter Mapping:** Infrastructure controllers/filters must catch these domain errors and map them to appropriate HTTP exceptions (e.g., `404 NotFoundException`). Use cases must never throw NestJS HTTP Exceptions directly.

---

## 🚀 Examples

### ❌ BAD (Weak validation, security leaks, and raw database error exposure)
```typescript
// 1. DTO accepts raw unvalidated data.
export class CreateUserDto {
  email: string; // Missing validation decorators!
  password: string;
}

// 2. Controller leaks raw DB errors & directly uses database-dependent exceptions
@Controller('users')
export class UserController {
  constructor(private readonly useCase: CreateUserUseCase) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    try {
      return await this.useCase.execute(dto);
    } catch (err) {
      // CRITICAL: Leaks internal database error stack to attacker!
      throw new BadRequestException(err.message); 
    }
  }
}