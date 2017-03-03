import { NgModule, ModuleWithProviders }	from '@angular/core';
import { CommonModule }						from '@angular/common';

import
{
	CdfImageComponent,
	CdfMediaComponent,
	CdfMediaSliderComponent,
	CdfVideoBackgroundComponent,
	CdfVideoYouTubeComponent
} 											from './components';

import { ClientConfigModel }				from './models';
import { ClientConfigService }				from './services';

@NgModule({
	imports:
	[
		CommonModule
	],
	declarations:
	[
		//COMPONENTS
		CdfImageComponent,
		CdfMediaComponent,
		CdfMediaSliderComponent,
		CdfVideoBackgroundComponent,
		CdfVideoYouTubeComponent		
	],
	exports:
	[
		//COMPONENTS
		CdfVideoBackgroundComponent,
		CdfMediaComponent,
		CdfMediaSliderComponent
	],
	entryComponents:
	[
		//COMPONENTS
		CdfVideoBackgroundComponent,
		CdfMediaComponent,
		CdfMediaSliderComponent
	],
	providers:
	[
	]
})
export class CdfMediaModule 
{
	static forRoot(clientConfigModel: ClientConfigModel): ModuleWithProviders
	{
		ClientConfigService.ConfigModel = clientConfigModel;

		return {
			ngModule: CdfMediaModule,
			providers:
			[ 
			]
		};
	}	
}