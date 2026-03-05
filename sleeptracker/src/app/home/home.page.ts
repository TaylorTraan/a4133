import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, 
	IonCard, IonButton, IonCardHeader, IonCardTitle, 
	IonCardSubtitle, IonCardContent, IonList, IonItem, IonLabel,
  IonSegment, IonSegmentButton } from '@ionic/angular/standalone';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { DatePipe, NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, 
	IonCard, IonButton, IonCardHeader, IonCardTitle, 
	IonCardSubtitle, IonCardContent, DatePipe, NgIf, 
	IonList, IonItem, IonLabel, NgFor, IonSegment, IonSegmentButton],
})
export class HomePage {
  @ViewChild('overnightScroll') overnightScroll!: ElementRef<HTMLDivElement>;
  @ViewChild('sleepinessScroll') sleepinessScroll!: ElementRef<HTMLDivElement>;
  @ViewChild('allSleepScroll') allSleepScroll!: ElementRef<HTMLDivElement>;
  isTrackingOvernight: boolean = false;
  overnightStart: Date | null = null;
  isLoggingSleepiness: boolean = false;
  filterType: 'all' | 'overnight' | 'sleepiness' = 'all';

  constructor(public sleepService:SleepService) {

	}

	ngOnInit() {
		console.log(this.allSleepData);
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

	get allOvernightData() {
		return SleepService.AllOvernightData;
	}

	get allSleepinessData() {
		return SleepService.AllSleepinessData;
	}

	get filteredSleepData() {
		if (this.filterType === 'overnight') {
			return SleepService.AllOvernightData;
		}
		if (this.filterType === 'sleepiness') {
			return SleepService.AllSleepinessData;
		}
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
		
		setTimeout(() => {
      this.scrollToBottom(this.overnightScroll);
      this.scrollToBottom(this.allSleepScroll);
    }, 0);
	}

	beginSleepinessLogging() {
		this.isLoggingSleepiness = true;
	}

	logSleepiness(value: number) {
		if (!value || value < 1 || value > 7) {
			console.error('Invalid sleepiness value');
			return;
		}

		const now = new Date();
		const entry = new StanfordSleepinessData(value, now);
		this.sleepService.logSleepinessData(entry);
		this.isLoggingSleepiness = false;

    setTimeout(() => {
      this.scrollToBottom(this.sleepinessScroll);
      this.scrollToBottom(this.allSleepScroll);
    }, 0);
	}

	onFilterChange(event: CustomEvent) {
		const value = event.detail.value as 'all' | 'overnight' | 'sleepiness';
		if (value) {
			this.filterType = value;
		}
	}

	private scrollToBottom(container?: ElementRef<HTMLDivElement>) {
		const el = container?.nativeElement;
		if (el) {
			el.scrollTop = el.scrollHeight;
		}
	}
}
