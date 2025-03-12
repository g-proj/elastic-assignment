# Full-Stack Search Application (Dockerized)

This is a **full-stack search application** using **React, Node.js, and Elasticsearch**. The project allows users to search for streets using **three different search modes** and soft-delete records while keeping Elasticsearch optimized.

---

## Features
**Search streets in Hebrew using Elasticsearch**  
**Three Search Modes:** Free, Exact, and Full Expression  
**Soft Delete Feature** (marks records as deleted instead of removing them)  
**Fully Dockerized for easy setup**  
**React Frontend**, **Express Backend**, and **Elasticsearch Database**  

---

## **Setup Instructions**

### **Clone the Repository**
```bash
git clone <your-github-repo-url>
cd elastic-assignment
```

### **Run the Application with Docker**
```bash
docker-compose up --build
```

### **Access the Application**
- **Frontend (React UI):** [http://localhost:3000](http://localhost:3000)
- **Backend (API Server):** [http://localhost:5000](http://localhost:5000)
- **Elasticsearch (Database):** [http://localhost:9200](http://localhost:9200)

---

## **Testing the API**

### **Search**
```bash
GET http://localhost:5000/search?query=<search-term>&searchType=<free|exact|full>
```

### **Soft Delete a Record**
```bash
PUT http://localhost:5000/delete/<document-id>
```

---

## **Contributing**
Feel free to **fork** and contribute to this project! 🎉

**GitHub Repository:** [Elastic Search Assignment](https://github.com/g-proj/elastic-assignment.git)

---

# **הוראות התקנה והרצה של הפרויקט**

זוהי **אפליקציית חיפוש** מלאה המשתמשת **ב-React, Node.js ו-Elasticsearch**. הפרויקט מאפשר חיפוש שמות רחובות בעברית עם **שלושה סוגי חיפושים שונים** ומחיקה רכה של רשומות.

---

## תכונות הפרויקט
**חיפוש רחובות בעברית עם Elasticsearch**  
**שלושה סוגי חיפושים:** חיפוש חופשי, חיפוש מדויק, חיפוש ביטוי מלא  
**מחיקה רכה** (עדכון הרשומה במקום למחוק אותה)  
**Docker מלא להפעלה קלה**  
**ממשק Frontend עם React, שרת Backend עם Express ובסיס נתונים Elasticsearch**  

---

## **התקנת והפעלת הפרויקט**

### **שיבוט הריפוזיטורי**
```bash
git clone <your-github-repo-url>
cd elastic-assignment
```

### **הרצת הפרויקט עם Docker**
```bash
docker-compose up --build
```

### **גישה לאפליקציה**
- **ממשק משתמש (React UI):** [http://localhost:3000](http://localhost:3000)
- **שרת Backend (API):** [http://localhost:5000](http://localhost:5000)
- **בסיס נתונים (Elasticsearch):** [http://localhost:9200](http://localhost:9200)

---

## **בדיקות API**

### **חיפוש רחוב**
```bash
GET http://localhost:5000/search?query=<search-term>&searchType=<free|exact|full>
```

### **מחיקה רכה של רשומה**
```bash
PUT http://localhost:5000/delete/<document-id>
```

---

## **תרומה לקוד**
מוזמנים **לתרום ולשפר את הפרויקט!**

**ריפוזיטורי GitHub:** [Elastic Search Assignment](https://github.com/g-proj/elastic-assignment.git)

