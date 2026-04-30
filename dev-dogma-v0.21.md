# 🛡️ Dogma de Desarrollo

> *"El código debe fallar de forma obvia, temprana y ruidosa. Nunca en silencio."*

**Stack principal:** TypeScript / JavaScript · Python · Rust  
**Versión:** 0.21 — documento vivo, sujeto a revisión  
**Última revisión:** 2026-04

---

## Principios Core

### 1. Fail Fast — Validá en el borde, no en el centro

El borde es el punto de entrada externa: HTTP handler, evento de queue, input de usuario, respuesta de API. Si el dato no es válido, se rechaza inmediatamente — no se "sanitiza" para continuar. Entre capas internas, si los tipos son correctos, **no se revalida**.

```typescript
// ❌ Mal — validación mezclada con lógica
function enrollUser(user: any, courseId: any) {
  if (user && courseId && user.subscription) {
    // ... lógica de negocio
  }
}

// ✅ Bien — validar primero, lógica después
function enrollUser(user: User, courseId: string): EnrollmentResult {
  if (!user) throw new ValidationError("User is required");
  if (!courseId) throw new ValidationError("CourseId is required");
  if (!user.hasActiveSubscription()) throw new ForbiddenError("No active subscription");

  return createEnrollment(user, courseId);
}
```

---

### 2. Early Return — Casos negativos primero

Los guards van al inicio. El happy path queda al final, legible de arriba hacia abajo sin mantener contexto mental. **El orden importa:** primero los guards más baratos, después los costosos — no consultés la base de datos antes de verificar que el `userId` no es nulo.

```python
# ❌ Mal — happy path anidado
def process_submission(submission):
    if submission:
        if submission.is_valid():
            if not submission.is_duplicate():
                return save(submission)
    return None

# ✅ Bien — early returns limpian el flujo
def process_submission(submission):
    if not submission:
        return None
    if not submission.is_valid():
        return None
    if submission.is_duplicate():
        return None

    return save(submission)
```

---

### 3. Nunca ignorar un error

Cada función que puede fallar debe tener su error manejado explícitamente. El manejo depende del tipo: los recuperables se logean y se toma una acción alternativa, los no recuperables se logean y se rethrowean, los inesperados se dejan subir. **Si no sabés qué hacer con un error en esta capa, no lo atrapes aquí.**

- **TypeScript:** nunca `try/catch {}` vacío, nunca `.catch(() => {})` sin logging/rethrow
- **Python:** nunca `except: pass` ni `except Exception: pass`
- **Rust:** es el estándar a aspirar — el compilador no te deja ignorar un `Result`

```typescript
// ❌ Mal
try {
  await saveProgress(userId, lessonId);
} catch (e) {}

// ✅ Bien
try {
  await saveProgress(userId, lessonId);
} catch (error) {
  logger.error("Failed to save progress", { userId, lessonId, error });
  throw new ServiceError("Progress could not be saved", { cause: error });
}
```

---

### 4. Los errores son valores, no excepciones

Los errores **esperados** son parte del dominio — un alumno sin matrícula, un pago rechazado, un enrollment no encontrado. Si podés escribir un test que lo reproduce intencionalmente, es un error de dominio y va como valor. Las excepciones son para lo que no debería ocurrir nunca: base de datos caída, estado corrupto, bug upstream.

- **Rust:** `Result<T, E>` es el modelo a seguir
- **TypeScript:** patrón `{ data, error }` al estilo Go, o librerías como `neverthrow`
- **Python:** retornar tipos discriminados para errores de dominio

```typescript
type Result<T, E = Error> =
  | { ok: true; data: T }
  | { ok: false; error: E };

async function getEnrollment(userId: string, courseId: string): Promise<Result<Enrollment>> {
  const enrollment = await db.enrollments.find(userId, courseId);
  if (!enrollment) {
    return { ok: false, error: new NotFoundError("Enrollment not found") };
  }
  return { ok: true, data: enrollment };
}

const result = await getEnrollment(userId, courseId);
if (!result.ok) {
  return respondError(result.error);
}
// result.data está garantizado acá
```

---

### 5. Tipado estricto, siempre

Los tipos son documentación que el compilador verifica. Un `any` es una mentira al tipo system. Los tipos deben reflejar el dominio — un `string` para un `EnrollmentId` es técnicamente válido pero semánticamente pobre. Branded types hacen que confundir un `UserId` con un `EnrollmentId` sea un error de compilación, no de runtime.

- **TypeScript:** `strict: true` sin excepciones · cero `any` · `noUncheckedIndexedAccess: true`
- **Python:** type hints en todas las funciones públicas · `mypy` en modo estricto
- **Rust:** el compilador ya lo impone — ese es el estándar

```typescript
type EnrollmentId = string & { readonly brand: 'EnrollmentId' };
type UserId = string & { readonly brand: 'UserId' };
```

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

---

### 6. El compilador/linter es el primer code reviewer

Un warning ignorado hoy es un bug mañana. Las reglas no se deshabilitan por conveniencia — se discuten y se cambian globalmente, o no se cambian. Si una regla se deshabilita más de dos veces en el mismo contexto, es señal de que el dogma necesita revisión, no el código — y esa revisión es una conversación de equipo documentada, no una decisión unilateral.

- Cero warnings en build de producción
- Los `// eslint-disable` o `# type: ignore` requieren comentario explicando **por qué**

```python
result = some_function()  # type: ignore[return-value]
# ↑ ❌ Mal — silencio sin contexto

result = some_function()  # type: ignore[return-value] — librería externa sin stubs, ver issue #42
# ↑ ✅ Bien — ignorar con contexto y trazabilidad
```

---

### 7. Funciones pequeñas con una sola responsabilidad

Una función tiene una sola responsabilidad cuando hay **exactamente una razón por la que tendría que modificarse**. Si un cambio en validación y un cambio en lógica de negocio ambos te llevan a editar la misma función, tiene dos responsabilidades — aunque tenga 10 líneas.

- El nombre de la función es su contrato: `getUserById` no hace nada más que eso
- Si no podés describirla en una frase sin usar "y", tiene demasiadas responsabilidades
- Largo orientativo: ~20-30 líneas. Si supera 50, revisá responsabilidades mezcladas

---

### 8. Assertions para invariantes críticos

En lógica sensible (pagos, permisos, progreso, certificaciones), assertar el estado esperado antes de ejecutar. Las assertions son para estado que **nunca debería ser falso si el código upstream es correcto** — son bugs del programador, no errores del usuario. Deben lanzar en todos los entornos, incluyendo producción. No usar `console.assert` — loggea y continúa, contradiciendo el Principio 3.

```typescript
function invariant(condition: boolean, message: string): asserts condition {
  if (!condition) {
    logger.error("Invariant violation", { message });
    throw new InvariantError(message);
  }
}

function issueCertificate(enrollment: Enrollment): Certificate {
  invariant(enrollment.isCompleted(), "Cannot issue cert for incomplete enrollment");
  invariant(enrollment.passedMinimumScore(), "Cannot issue cert below passing score");

  return generateCertificate(enrollment);
}
```

---

## Principios de Arquitectura

### 9. Broken Windows — Dejá cada archivo mejor de como lo encontraste

Una ventana rota le dice al siguiente dev que las reglas no aplican aquí. Si tocás un archivo, mejoralo — renombrá una variable confusa, extraé una función, agregá un type hint. No es una reescritura, es una mejora mínima. Si la ventana es demasiado grande para arreglarla de paso, se registra como deuda técnica explícita. No se ignora.

---

### 10. Orthogonality — Un cambio en X no debería obligarte a tocar Y

Dos módulos son ortogonales si podés modificar uno sin leer el código del otro. **Si el test de un módulo requiere instanciar o mockear otro módulo del dominio, hay acoplamiento que vale la pena cuestionar.** Los eventos son la frontera natural: el módulo de progreso emite `ProgressCompleted`, el módulo de certificados decide qué hacer con él. Cada uno cambia, se testea y se despliega independientemente.

---

### 11. Tracer Bullets — Un hilo delgado end-to-end antes de rellenar

Antes de construir un feature completo, hacer que el camino real más simple funcione de punta a punta: entrada → lógica → persistencia → respuesta. Sin edge cases, sin optimizaciones. Confirma que la arquitectura tiene sentido antes de invertir semanas en ella. **No es un prototipo — no se tira.** Es código de producción deliberadamente incompleto, que cumple el dogma desde el primer día.

---

## Reglas Rápidas de Referencia

| # | Regla | Nunca |
|---|-------|-------|
| 1 | Validar en el borde, no revalidar en capas internas | Validar dentro de lógica de negocio |
| 2 | Guards ordenados por costo, happy path al final | Anidamiento que rompe la lectura lineal |
| 3 | Manejar cada error según su naturaleza | `catch {}` vacíos · `except: pass` |
| 4 | Errores de dominio como valores, excepciones para lo inesperado | Excepciones para control de flujo normal |
| 5 | Tipado estricto y semánticamente honesto | `any` · branded types ignorados |
| 6 | Cero warnings · `disable` con contexto · dogma revisado en equipo | `// disable` sin comentario · decisiones unilaterales |
| 7 | Una razón de cambio por función | Funciones que hacen "X y Y" |
| 8 | `invariant()` para estado que nunca debe ser falso | `console.assert` · asumir estado válido |
| 9 | Dejar cada archivo mejor de como lo encontraste | Ventanas rotas sin registro |
| 10 | Módulos comunicados por eventos, testeables en aislamiento | Módulos que se instancian mutuamente en tests |
| 11 | Hilo delgado end-to-end antes de construir el resto | Prototipos desechables · arquitecturas sin validar |

---

## Roadmap

- [ ] Convertir reglas 1-6 en configuración de ESLint/Pylint
- [ ] Agregar ejemplos específicos del dominio (enrollment, progress, certs)
- [ ] Revisar y agregar reglas de Rust cuando apliquen a los otros lenguajes
- [ ] Definir política de logging consistente entre servicios
- [ ] Implementar función `invariant()` compartida en el stack TS
- [ ] Definir estructura de eventos de dominio para aplicar Orthogonality (Principio 10)
- [ ] Documentar proceso formal de revisión del dogma

---

*Documento vivo. Versión 0.1 → 0.21: ambigüedades cerradas en principios 1-8, adición de principios de arquitectura 9-11 (Broken Windows, Orthogonality, Tracer Bullets).*
