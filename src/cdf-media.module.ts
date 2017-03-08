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

import { ClientConfigService }				from './services';
import { CdfMediaConfig }					from './config';


export const CONFIG_DATA = new OpaqueToken('Config Data');
export function configHelperFactory(config: CdfMediaConfig) 
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
    static forRoot(config: CdfMediaConfig): ModuleWithProviders
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