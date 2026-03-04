import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, 
	IonCard, IonButton, IonCardHeader, IonCardTitle, 
	IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, 
	IonCard, IonButton, IonCardHeader, IonCardTitle, 
	IonCardSubtitle, IonCardContent, DatePipe, NgIf],
})
export class HomePage {
  isTrackingOvernight: boolean = false;
  overnightStart: Date | null = null;

  constructor(public sleepService:SleepService) {

	}

	ngOnInit() {
		console.log(this.allSleepData);
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

	startOvernightSleep() {
		if (this.isTrackingOvernight) {
			return;
		}
		this.isTrackingOvernight = true;
		this.overnightStart = new Date();
	}

	stopOvernightSleep() {
		if (!this.isTrackingOvernight) {
			return;
		}

		if (!this.overnightStart) {
			console.error('No entry time found');
			return;
		}

		const endTime = new Date();
		const entry = new OvernightSleepData(this.overnightStart, endTime);
		this.sleepService.logOvernightData(entry);

		this.isTrackingOvernight = false;
		this.overnightStart = null;
	}
}
