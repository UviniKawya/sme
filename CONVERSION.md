# Java Conversion Summary

## Next.js (TypeScript/React) → Java Spring Boot Port

### Architecture Mapping

| Next.js Component | Java Equivalent |
|------------------|----------------|
| `src/app/page.tsx` (App shell) | `MainController` + Thymeleaf `layout.html` |
| `src/components/Sidebar.tsx` | Sidebar in `layout.html` |
| `src/components/TopNav.tsx` | Top nav in `layout.html` |
| `src/components/Dashboard.tsx` | `dashboard.html` + `DashboardController` + `DashboardService` |
| `src/components/SMERegistration.tsx` | `registration.html` + `SMEController` + `SMEService` |
| `src/components/Assessment.tsx` | `assessment.html` + `AssessmentApiController` + `AssessmentService` |
| `src/components/AssessmentSummary.tsx` | Right panel in `assessment.html` |
| `src/components/Inventory.tsx` | `inventory.html` + `InventoryApiController` + `InventoryService` |
| `src/components/Sales.tsx` | `sales.html` + `SalesApiController` + `SalesService` |
| `src/lib/store.ts` (React Context) | `@SessionAttributes` + Service layer + JPA repositories |
| `src/lib/types.ts` | `model/` Java entities + DTOs |
| `src/lib/assessment-data.ts` | `DataInitializerConfig.java` |
| `src/app/globals.css` | `static/css/style.css` |
| `recharts` charts | Canvas-based JS charts in `dashboard.js` |

### Key Implementation Details

**State Management**: React Context state → Server-side session via SME ID + H2 database persistence

**Routing**: Next.js file-based routing → Spring MVC controllers with Thymeleaf views

**API Calls**: React fetch/axios → direct service calls in controllers + REST endpoints for AJAX

**Type Safety**: TypeScript interfaces → Java static typing with JPA entities

**Styling**: Tailwind CSS utility classes → Custom CSS utility classes (same naming convention)

**Client-side Interactivity**: React component state → Vanilla JavaScript DOM manipulation

### File Count

- **Java classes**: 27 files (models, repositories, services, controllers, config)
- **HTML templates**: 7 files (layout + 6 pages)
- **JavaScript**: 6 files (app.js + per-page scripts)
- **CSS**: 1 comprehensive stylesheet

### To Run

```bash
mvn spring-boot:run
# Visit http://localhost:8080
```

### Differences from Original

1. **Server-side rendering**: Thymeleaf renders HTML on server vs React client-side
2. **No build step for frontend**: Static files served directly from classpath
3. **Database**: H2 in-memory (can swap for PostgreSQL/MySQL)
4. **No npm dependencies**: All Java-based with Maven
5. **Simpler deployment**: Single JAR file

### What's Preserved

- ✗ All UI components (sidebar, cards, tables, forms, modals)
- ✗ Exact assessment questions and scoring logic
- ✗ Inventory and sales CRUD operations
- ✗ Dashboard charts (client-side canvas)
- ✗ Color scheme and design system (blue/white)
- ✗ Responsive layout
- ✗ Real-time validation and feedback
