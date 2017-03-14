import
{
	ModuleWithProviders,
	NgModule,
	OpaqueToken 
} 											from '@angular/core';
import { CommonModule }						from '@angular/common';

import
{
	CdfImageComponent,
	CdfMediaComponent,
	CdfMediaSliderComponent,
	CdfVideoBackgroundComponent,
	CdfVideoYouTubeComponent
} 											from './components';

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
		CdfMediaComponent,
		CdfMediaSliderComponent,
		CdfVideoBackgroundComponent
	],
	entryComponents:
	[
		//COMPONENTS
		CdfMediaComponent,
		CdfMediaSliderComponent,
		CdfVideoBackgroundComponent
	],
	providers:
	[
	]
})
export class CdfMediaModule {}