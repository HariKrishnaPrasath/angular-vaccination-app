import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/patientComponent/profile/profile.component';
import { CenterComponent } from './components/patientComponent/center/center.component';
import { MyappointmentsComponent } from './components/patientComponent/myappointments/myappointments.component';
import { AdminDashboardComponent } from './components/superAdminComponents/admin-dashboard/admin-dashboard.component';
import { SuperAdminProfileComponent } from './components/superAdminComponents/super-admin-profile/admin-profile.component';
import { AddCenterComponent } from './components/superAdminComponents/add-center/add-center.component';
import { AddVaccineComponent } from './components/superAdminComponents/add-vaccine/add-vaccine.component';
import { AddAdminComponent } from './components/superAdminComponents/add-admin/add-admin.component';
import { HomeComponent } from './components/patientComponent/home/home.component';
import { CertificatesComponent } from './components/patientComponent/certificates/certificates.component';
import { SuperAdminComponent } from './components/superAdminComponents/super-admin/super-admin.component';
import { AdminComponent } from './components/adminComponent/admin/admin.component';
import { CreateSlotComponent } from './components/adminComponent/create-slot/create-slot.component';
import { CreateVaccineComponent } from './components/adminComponent/create-vaccine/create-vaccine.component';
import { ManageAppointmentComponent } from './components/adminComponent/manage-appointment/manage-appointment.component';
import { ManageCenterComponent } from './components/adminComponent/manage-center/manage-center.component';
import { AdminProfileComponent } from './components/adminComponent/admin-profile/admin-profile.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    {
        path: 'user/:email', component: HomeComponent, children: [
            { path: 'profile', component: ProfileComponent },
            { path: 'certificate', component: CertificatesComponent },
            { path: 'center', component: CenterComponent },
            { path: 'appointment', component: MyappointmentsComponent }
        ]
    },
    {
        path: 'superAdmin/:email', component: SuperAdminComponent, children: [
            { path: 'adminDashboard', component: AdminDashboardComponent },
            { path: 'superAdminProfile', component: SuperAdminProfileComponent },
            { path: 'addCenter', component: AddCenterComponent },
            { path: 'addVaccine', component: AddVaccineComponent },
            { path: 'addAdmin', component: AddAdminComponent }
        ]
    },
    {
        path: 'admin/:email', component: AdminComponent, children: [
            { path: 'adminProfile', component: AdminProfileComponent },
            { path: 'createSlot', component: CreateSlotComponent },
            { path: 'createVaccine', component: CreateVaccineComponent },
            { path: 'manageAppointments', component: ManageAppointmentComponent },
            { path: 'manageCenter', component: ManageCenterComponent }
        ]
    }

];
