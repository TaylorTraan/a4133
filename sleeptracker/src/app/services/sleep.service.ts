import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
	private static LoadDefaultData:boolean = true;
	public static AllSleepData:SleepData[] = [];
	public static AllOvernightData:OvernightSleepData[] = [];
	public static AllSleepinessData:StanfordSleepinessData[] = [];
  private static STORAGE_KEY_OVERNIGHT = 'sleeptracker_overnight';
  private static STORAGE_KEY_SLEEPINESS = 'sleeptracker_sleepiness';

	constructor() {
		this.loadFromStorage();

		if (SleepService.AllSleepData.length === 0 && SleepService.LoadDefaultData) {
			this.addDefaultData();
			SleepService.LoadDefaultData = false;
			this.saveToStorage();
		}
	}

	private addDefaultData() {
		var goToBed = new Date();
		goToBed.setDate(goToBed.getDate() - 1); //set to yesterday
		goToBed.setHours(1, 3, 0); //1:03am
		var wakeUp = new Date();
		wakeUp.setTime(goToBed.getTime() + 8 * 60 * 60 * 1000); //Sleep for exactly eight hours, waking up at 9:03am
		this.logOvernightData(new OvernightSleepData(goToBed, wakeUp)); // add that person was asleep 1am-9am yesterday
		var sleepinessDate = new Date();
		sleepinessDate.setDate(sleepinessDate.getDate() - 1); //set to yesterday
		sleepinessDate.setHours(14, 38, 0); //2:38pm
		this.logSleepinessData(new StanfordSleepinessData(4, sleepinessDate)); // add sleepiness at 2pm
		goToBed = new Date();
		goToBed.setDate(goToBed.getDate() - 1); //set to yesterday
		goToBed.setHours(23, 11, 0); //11:11pm
		wakeUp = new Date();
		wakeUp.setTime(goToBed.getTime() + 9 * 60 * 60 * 1000); //Sleep for exactly nine hours
		this.logOvernightData(new OvernightSleepData(goToBed, wakeUp));
	}

	public logOvernightData(sleepData:OvernightSleepData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllOvernightData.push(sleepData);
		this.saveToStorage();
	}

	public logSleepinessData(sleepData:StanfordSleepinessData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllSleepinessData.push(sleepData);
		this.saveToStorage();
	}

	private saveToStorage() {
		if (typeof localStorage === 'undefined') {
			return;
		}

		try {
			const overnightPlain = SleepService.AllOvernightData.map(d => ({
				sleepStart: d.getSleepStart().toISOString(),
				sleepEnd: d.getSleepEnd().toISOString(),
			}));

			const sleepinessPlain = SleepService.AllSleepinessData.map(d => ({
				loggedValue: d.getLoggedValue(),
				loggedAt: d.loggedAt.toISOString(),
			}));

			localStorage.setItem(SleepService.STORAGE_KEY_OVERNIGHT, JSON.stringify(overnightPlain));
			localStorage.setItem(SleepService.STORAGE_KEY_SLEEPINESS, JSON.stringify(sleepinessPlain));
		} catch (e) {
			console.error('Failed to save sleep data to storage', e);
		}
	}

	private loadFromStorage() {
		if (typeof localStorage === 'undefined') {
			return;
		}

		try {
			const overnightJson = localStorage.getItem(SleepService.STORAGE_KEY_OVERNIGHT);
			const sleepinessJson = localStorage.getItem(SleepService.STORAGE_KEY_SLEEPINESS);

			SleepService.AllOvernightData = [];
			SleepService.AllSleepinessData = [];
			SleepService.AllSleepData = [];

			if (overnightJson) {
				const overnightRaw = JSON.parse(overnightJson) as { sleepStart:string; sleepEnd:string; }[];
				SleepService.AllOvernightData = overnightRaw.map(o =>
					new OvernightSleepData(new Date(o.sleepStart), new Date(o.sleepEnd))
				);
			}

			if (sleepinessJson) {
				const sleepinessRaw = JSON.parse(sleepinessJson) as { loggedValue:number; loggedAt:string; }[];
				SleepService.AllSleepinessData = sleepinessRaw.map(s =>
					new StanfordSleepinessData(s.loggedValue, new Date(s.loggedAt))
				);
			}

			SleepService.AllSleepData = [
				...SleepService.AllOvernightData,
				...SleepService.AllSleepinessData
			];
		} catch (e) {
			console.error('Failed to load sleep data from storage', e);
		}
	}
}
