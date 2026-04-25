# SME Digital Readiness Assessment Platform - Java Version

A Spring Boot application that replicates the functionality of the Next.js-based SME Digital Readiness Assessment Platform, built entirely in Java.

## Overview

This Java application enables SMEs to:
- Register their business profile
- Complete a digital readiness assessment (25 questions across 5 sections)
- Manage inventory with low-stock alerts
- Track sales and payment statuses
- View dashboard statistics and charts

## Technology Stack

- **Backend**: Spring Boot 3.4.5, Java 17
- **Frontend**: Thymeleaf templates, HTML5, CSS3, JavaScript
- **Database**: H2 (in-memory, for demo) - easily switchable to PostgreSQL/MySQL
- **Persistence**: JPA/Hibernate
- **Security**: Spring Security (basic)
- **Build Tool**: Maven

## Project Structure

```
src/main/java/com/sme/digitalreadiness/
├── DigitalReadinessApplication.java   # Main application
├── config/
│   └── DataInitializerConfig.java     # Seed data on startup
├── controller/
│   ├── MainController.java            # Page controllers
│   ├── AssessmentApiController.java   # Assessment REST API
│   ├── InventoryApiController.java    # Inventory REST API
│   ├── SalesApiController.java        # Sales REST API
│   ├── DashboardApiController.java    # Dashboard REST API
│   └── SMEController.java             # SME registration API
├── dto/
│   ├── AssessmentScoreDTO.java
│   └── AssessmentSummaryDTO.java
├── model/
│   ├── AssessmentSection.java
│   ├── AssessmentQuestion.java
│   ├── AssessmentAnswer.java
│   ├── SMEProfile.java
│   ├── InventoryItem.java
│   └── SalesEntry.java
├── repository/
│   ├── AssessmentSectionRepository.java
│   ├── AssessmentQuestionRepository.java
│   ├── AssessmentAnswerRepository.java
│   ├── SMEProfileRepository.java
│   ├── InventoryItemRepository.java
│   └── SalesEntryRepository.java
└── service/
    ├── AssessmentService.java
    ├── DashboardService.java
    ├── SMEService.java
    ├── InventoryService.java
    └── SalesService.java

src/main/resources/
├── templates/         # Thymeleaf HTML views
│   ├── layout.html
│   ├── dashboard.html
│   ├── registration.html
│   ├── assessment.html
│   ├── inventory.html
│   ├── sales.html
│   └── about.html
├── static/
│   ├── css/style.css
│   └── js/
│       ├── app.js
│       ├── dashboard.js
│       ├── registration.js
│       ├── assessment.js
│       ├── inventory.js
│       └── sales.js
└── application.properties
```

## Getting Started

### Prerequisites
- Java 17+
- Maven 3.6+

### Running the Application

```bash
# Navigate to project directory
cd sessions/agent_a0b3dcfa-dfd8-441f-a449-a84feb1fa431

# Build the application
mvn clean package

# Run the application
mvn spring-boot:run
```

Alternatively:
```bash
# Run the JAR directly after building
java -jar target/digital-readiness-1.0.0.jar
```

### Accessing the Application

- Main application: http://localhost:8080
- H2 Console: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:digitalreadinessdb`
  - Username: `sa`
  - Password: (leave empty)

## Features

### Dashboard
- Total inventory count
- Low stock alerts
- Total sales count
- Total revenue
- Revenue chart (7-day)
- Payment status distribution
- Quick actions for all modules

### SME Registration
- Business profile creation
- SME ID generation
- Location, size, and years of operation capture

### Digital Readiness Assessment
- 5 sections with collapsible UI
- 25 Likert-scale questions (1-5 rating)
- Real-time progress tracking
- Per-section scoring
- Overall score calculation
- Answers persist by SME ID

### Inventory Management
- Add/edit/delete items
- Quantity tracking
- Low stock threshold configuration
- Visual low-stock alerts

### Sales Management
- Invoice entry
- Customer tracking
- Payment status (Paid/Pending/Overdue)
- Summary cards
- Due date monitoring

## API Endpoints

### Assessment
- `GET /api/assessment/sections` - Get all assessment sections and questions
- `GET /api/assessment/data?smeId={id}` - Get assessment data with answers
- `POST /api/assessment/answer` - Save single answer
- `POST /api/assessment/answers` - Save all answers
- `DELETE /api/assessment/clear?smeId={id}` - Clear answers

### Inventory
- `GET /api/inventory` - List all inventory items
- `GET /api/inventory/low-stock` - Get low stock items
- `POST /api/inventory` - Create item
- `PUT /api/inventory/{id}` - Update item
- `DELETE /api/inventory/{id}` - Delete item

### Sales
- `GET /api/sales` - List all sales
- `GET /api/sales/pending` - Pending payments
- `GET /api/sales/overdue` - Overdue payments
- `POST /api/sales` - Create sale
- `PUT /api/sales/{id}` - Update sale
- `DELETE /api/sales/{id}` - Delete sale

### Dashboard
- `GET /api/dashboard` - Get dashboard statistics

### SME
- `POST /api/sme/register` - Register new SME
- `GET /api/sme/{smeId}` - Get SME profile

## Configuration

### Database

The application uses H2 in-memory database by default. To use external database:

1. Update `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/digitalreadiness
spring.datasource.username=your_user
spring.datasource.password=your_password
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

2. Add database driver to `pom.xml`:
```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

### Customization

- **Styling**: Edit `src/main/resources/static/css/style.css` to change colors, fonts, layout
- **Assessment questions**: Modify `DataInitializerConfig.java` to change questions
- **Thresholds**: Adjust low stock threshold logic in `InventoryService`

## Production Considerations

- Enable Spring Security with proper authentication
- Use production database (PostgreSQL/MySQL)
- Configure connection pooling
- Enable HTTPS
- Add request validation and error handling
- Implement logging and monitoring
- Add API rate limiting

## Development

### Hot Reload

Spring Boot DevTools is included for development:
```bash
mvn spring-boot:run
```
Changes to templates and static resources will auto-reload.

### Database Console

H2 console available at: http://localhost:8080/h2-console

### Logging

View logs in console or configure file logging in `application.properties`.

## License

Open source - free to use and modify.

## Original Project

This is a Java port of the Next.js/React TypeScript SME Digital Readiness Assessment Platform.
