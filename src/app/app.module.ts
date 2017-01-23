import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
// import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
// Pages
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MapPage } from '../pages/map/map';
// Pipes
import { ArrayFilterPipe } from '../pipes/array-filter.pipe';
//Thirtparty modules
import { AngularFireModule } from 'angularfire2';
import { Auth } from '../providers/auth';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { WelcomePage } from '../pages/welcome/welcome';
import { OrderByPipe } from '../pipes/sort.pipe';
import { OrderByStatusPipe } from '../pipes/statusSort.pipe';

export const FB_CONFIG = {
	apiKey:            "AIzaSyCfsMsPgWId2bG7AibwY7CyDccF5mbkC3E",
	authDomain:        "swing-1484414039704.firebaseapp.com",
	databaseURL:       "https://swing-1484414039704.firebaseio.com",
	storageBucket:     "swing-1484414039704.appspot.com",
	messagingSenderId: "1029159650794"
};

@NgModule({
	declarations:    [
		MyApp,
		AboutPage,
		ContactPage,
		WelcomePage,
		HomePage,
		TabsPage,
		MapPage,
		ArrayFilterPipe,
		OrderByPipe,
		OrderByStatusPipe
	],
	imports:         [
		IonicModule.forRoot(MyApp),
		AngularFireModule.initializeApp(FB_CONFIG),
		AgmCoreModule.forRoot({
			apiKey:    'AIzaSyAvXnt12UVflxs0u9opSo4TxAIRHm50fwU',
			libraries: ["places"]
		})
	],
	bootstrap:       [IonicApp],
	entryComponents: [
		MyApp,
		AboutPage,
		WelcomePage,
		ContactPage,
		HomePage,
		TabsPage,
		MapPage
	],
	providers:       [Auth, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}

