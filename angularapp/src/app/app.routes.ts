import { Routes } from '@angular/router';

// Page Components
import { Home } from './components/home/home';
import { Services} from './components/services/services';
import { About} from './components/home/about/about';
import { Drivers } from './components/drivers/drivers';
import { Riders } from './components/riders/riders';
import { UserLogin } from './components/user-login/user-login';
import { DriverLogin } from './components/driver-login/driver-login';
import { Signin } from './components/signin/signin';
import { AttachCar } from './components/attach-car/attach-car';
import { UserDashboard } from './components/user-dashboard/user-dashboard';
import { DriverDashboard } from './components/driver-dashboard/driver-dashboard';

//Admin Components
import { AdminLogin } from './components/admin/admin-login/admin-login';
import { AdminDashboard } from './components/admin/admin-dashboard/admin-dashboard';

export const routes: Routes = [
  { path: '', component: Home },             // Home
  { path: 'services', component: Services }, // Services page
  { path: 'drivers', component: Drivers },   // Drivers page
  { path: 'riders', component: Riders },     // Riders page
  { path: 'about', component: About },       // About Us
  { path: 'login-user', component: UserLogin},
  { path: 'login-driver', component: DriverLogin},
  { path: 'signin', component: Signin },
  { path: 'attach-car', component: AttachCar},
  { path: 'user-dashboard', component: UserDashboard },
  { path: 'driver-dashboard', component: DriverDashboard },

  
  // 🔹 Admin Routes
  { path: 'admin/login', component: AdminLogin },
  { path: 'admin/dashboard', component: AdminDashboard },
  
  { path: '**', redirectTo: '' }                      // Wildcard redirect
];
