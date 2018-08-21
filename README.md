<img src="https://cloud.githubusercontent.com/assets/668093/12567089/0ac42774-c372-11e5-97eb-00baf0fccc37.jpg" alt="OpenMRS"/>

# openmrs-owa-oncology

Oncology OWA module for OpenMRS

Collaborative work with IBM, Partners In Health, Hôpital Universitaire de Mirebalais (Haiti), Uganda Cancer Institute, University of North Carolina, and the OpenMRS Community.

Project dates: July 15 - August 3, 2018, Boston MA

Purpose:
--------
The goal of this project is to add **chemotherapy regimen support** to OpenMRS EMR system so that doctors can order and track a patient's chemo treatment from EMR system. Nurse's adminstration detail is also included in this new support in order to **improve quality of care for cancer patients** and tracking the chemo treatment effectiveness.  

This repository contains the OWA (UI) for the oncology module.  The main oncology module can be found [here](https://github.com/openmrs/openmrs-module-oncology).

### Local setup instructions

Clone the repo
```
git@github.com:openmrs/openmrs-owa-oncology.git
```

Install the dependencies
```
npm install
```

Run the app
```
npm start
```

### Production Build

Build the app
```
npm run build
```

This will create a file called `openmrs-owa-oncology.zip` file in the `build` directory, which can be uploaded to the OpenMRS Open Web Apps module.
