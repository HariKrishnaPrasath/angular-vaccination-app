import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/patientComponent/profile/profile.component';
import { CenterComponent } from './components/patientComponent/center/center.component';
import { MyappointmentsComponent } from './components/patientComponent/myappointments/myappointments.component';
import { AdminDashboardComponent } from './components/superAdminComponents/admin-dashboard/admin-dashboard.component';
// <<<<<<< Updated upstream
// import { SuperAdminProfileComponent } from './components/superAdminComponents/super-admin-profile/admin-profile.component';
// =======
import { SuperAdminProfileComponent } from './components/superAdminComponents/super-admin-profile/admin-profile.component';
import { AddCenterComponent } from './components/superAdminComponents/add-center/add-center.component';
import { AddAdminComponent } from './components/superAdminComponents/add-admin/add-admin.component';
import { HomeComponent } from './components/patientComponent/home/home.component';
import { CertificatesComponent } from './components/patientComponent/certificates/certificates.component';
import { SuperAdminComponent } from './components/superAdminComponents/super-admin/super-admin.component';
import { AdminComponent } from './components/adminComponent/admin/admin.component';
import { CreateSlotComponent } from './components/adminComponent/create-slot/create-slot.component';
import { CreateVaccineComponent } from './components/adminComponent/create-vaccine/create-vaccine.component';
import { ManageAppointmentComponent } from './components/adminComponent/manage-appointment/manage-appointment.component';
import { ManageCenterComponent } from './components/adminComponent/manage-center/manage-center.component';
import { Component } from '@angular/core';
import { AllCentersComponent } from './components/superAdminComponents/all-centers/all-centers.component';
import { UpdateCenterComponent } from './components/superAdminComponents/update-center/update-center.component';

import { PatientLoginComponent } from './components/patient-login/patient-login.component';
import { BaseComponent } from './components/patientComponent/base/base.component';

import { AdminProfileComponent } from './components/adminComponent/admin-profile/admin-profile.component';
import { ViewCenterComponent } from './components/patientComponent/view-center/view-center.component';


import { UpdateVacComponent } from './components/superAdminComponents/update-vac/update-vac.component';
import { AllVaccinesComponent } from './components/superAdminComponents/all-vaccines/all-vaccines.component';
import { CreateVacComponent } from './components/superAdminComponents/create-vac/create-vac.component';
import { AddVaccinesComponent } from './components/adminComponent/add-vaccines/add-vaccines.component';
import { AllVacsComponent } from './components/adminComponent/all-vacs/all-vacs.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'patient/login', component: PatientLoginComponent },
    {
        path: 'user/:email', component: BaseComponent, children: [
            { path: 'home', component: HomeComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'certificate', component: CertificatesComponent },
            { path: 'center', component: CenterComponent },
            { path: 'appointment', component: MyappointmentsComponent },
            { path: 'viewCenter/:centerId', component: ViewCenterComponent }
        ]
    },
    {
        path: 'superAdmin/:email', component: SuperAdminComponent, children: [
            { path: 'adminDashboard', component: AdminDashboardComponent },

            { path: 'adminProfile', component: AdminProfileComponent },
            { path: 'addCenter', component: AddCenterComponent },
            { path: 'updateCenter/:id', component: UpdateCenterComponent },
            { path: 'allCenters', component: AllCentersComponent },
            { path: 'addVaccine', component: AddVaccinesComponent },

            { path: 'superAdminProfile', component: SuperAdminProfileComponent },
            { path: 'addCenter', component: AddCenterComponent },
            { path: 'allVaccines', component: AllVaccinesComponent },

            { path: 'createVac', component: CreateVacComponent },
            { path: 'updateVac/:id', component: UpdateVacComponent },
            { path: 'addAdmin', component: AddAdminComponent }
        ]
    },
    {
        path: 'admin/:email', component: AdminComponent, children: [
            { path: 'adminProfile', component: AdminProfileComponent },
            { path: 'createSlot', component: CreateSlotComponent },
            { path: 'createVaccine', component: CreateVaccineComponent },
            { path: 'addVaccines', component: AddVaccinesComponent },
            { path: 'allVacs', component: AllVacsComponent },
            { path: 'manageAppointments', component: ManageAppointmentComponent },
            { path: 'manageCenter', component: ManageCenterComponent }
        ]

    },
];
