# **India 2070 Wildlife Dashboard**

A **futuristic, interactive web platform** that allows users to explore India’s wildlife in 2070, visualize predicted population changes, simulate environmental scenarios, and understand the impact of human and conservation actions. This project combines **education, interactivity, and futuristic design**, making it a practical tool for awareness while remaining visually engaging.

---

## **Table of Contents**

1. [Project Idea](#project-idea)
2. [Target Users](#target-users)
3. [Core Goals](#core-goals)
4. [Features & Functionality](#features--functionality)
5. [Data Structure](#data-structure)
6. [Tech Stack](#tech-stack)
7. [User Flow](#user-flow)

---

## **Project Idea**

A **web-based platform** enabling users to:

- Explore predicted wildlife distribution in India by 2070
- Simulate environmental and conservation scenarios
- Understand the effects of human activity on wildlife
- Engage with interactive maps, charts, and species profiles

---

## **Target Users**

- Students & educators (biology, environmental science)
- Wildlife enthusiasts and researchers
- General users interested in conservation, climate change, and Indian wildlife

---

## **Core Goals**

1. Show predicted wildlife distribution and populations in India in 2070
2. Educate users on the impact of environmental changes on ecosystems
3. Enable interactive “what-if” simulations
4. Promote awareness of conservation actions

---

## **Features & Functionality**

### **1. Interactive Wildlife Map**

- Full India map showing predicted species habitats
- Hover: Quick tooltips with species counts
- Click: Detailed state-level charts, species lists, and images
- Optional zoom for district-level data
- Data from static JSON files, color-coded heatmaps

---

### **2. Population Simulation Sliders**

- Simulate effects of:

  1. Urbanization
  2. Deforestation
  3. Climate change
  4. Conservation efforts

- Real-time updates on population numbers, charts, and Eco-Scores

---

### **3. Species Profiles**

- Detailed pages for each species with:

  - Current & predicted 2070 populations
  - Threats and conservation status
  - Images, videos, and fun facts

- Navigation via map clicks or dropdown

---

### **4. Environmental Health Score (Eco-Score)**

- Quantifies overall environmental health per state
- Factors: Forest cover, wildlife health, water availability, air quality
- Visualizations: Progress bars, radar charts, color-coded maps
- Dynamic updates based on simulation sliders or actions

---

### **5. Conservation Action Simulator**

- Users apply interventions to improve environmental and wildlife health:

  - Plant trees
  - Create wildlife corridors
  - Anti-poaching measures

- Immediate visual feedback on populations and Eco-Scores

---

### **6. Futuristic UI & UX Design**

- Neon accents, smooth transitions, animated charts
- Dashboard layout: Map on left, sliders & charts on right, species sidebar
- Optional AI assistant for tips or species info

---

## **Data Structure**

### **speciesData.json**

- Species name
- Current population
- Predicted 2070 population
- Threats
- States present
- Images/Videos

### **stateData.json**

- State name
- Forest cover (%)
- Air quality (%)
- Water availability (%)
- Wildlife health (%)

> Fully functional without live APIs

---

## **Tech Stack**

- **Frontend:** React.js
- **Styling:** TailwindCSS
- **Maps:** Leaflet.js / Mapbox
- **Charts:** D3.js / Chart.js
- **Routing:** React Router
- **Data:** Local JSON files

---

## **User Flow**

1. Landing page introduction to India 2070 wildlife
2. Explore interactive map → hover & click for species data
3. View species profiles
4. Adjust environmental sliders → see real-time changes
5. Apply conservation actions → observe effects on map & charts
6. Dashboard summary of India’s wildlife and environmental health

---
