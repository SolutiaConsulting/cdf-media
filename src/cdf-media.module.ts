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
import { ConfigInterface } 					from './models';
import { ClientConfigService } 				from './services';


export const CONFIG_DATA = new OpaqueToken('Config Data');
export function configHelperFactory(config: ConfigInterface) 
{
	//console.log('------------------ MEDIA CONFIG DATA:', config);
    ClientConfigService.ConfigModel = config;
    return ClientConfigService;
}
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
export class CdfMediaModule
{
	static forRoot(config: ConfigInterface): ModuleWithProviders
	{		
		return {
			ngModule: CdfMediaModule,
			providers:
			[
				ClientConfigService,
				{
					provide: CONFIG_DATA,
					useValue: config
				},
				{
					provide: ClientConfigService,
					useFactory: configHelperFactory,
					deps: [CONFIG_DATA]
				}				
			]
		};
	}
}