# CDF Media UI Module (@cdf/cdf-ng-media)
[![version][npm-image]][npm-url]
[![downloads][downloads-image]][downloads-url]

> CDF-NG-MEDIA is an Angular module containing UI components for displaying different forms of media (images and/or video).  This module simplifies the displaying of media assets.  CDF-NG-MEDIA is a UI module existing in [Content Delivery Framework's][jwplayer-url] eco-system.

> Happy Coding!

![](logo-535x141.png)

# Requirements
CDF-NG-MEDIA requires the latest version of Angular (at the time of this writing: 2.4.7).
```sh
  //package.json
  
  "dependencies": {
    "@angular/common": "2.4.7",
    "@angular/compiler": "2.4.7",
    "@angular/core": "2.4.7",
    "@angular/forms": "2.4.7",
    "@angular/http": "2.4.7",
    "@angular/platform-browser": "2.4.7",
    "@angular/platform-browser-dynamic": "2.4.7",
    "@angular/router": "3.4.7"
	...
  }
```

CDF-NG-MEDIA also utilizes the following 3rd party sources:

* [JW Player][jwplayer-url] as the vehicle for loading videos.  CDF-NG-MEDIA is currently using:
  * JW Player version 7.6.1
* [Cloud CMS][cloud-cms-url] is a content mnagement solution.  Right now configuration of CDF-NG-MEDIA requires 2 configuration entries to generate the proper URL needed by Cloud CMS for retrieving media assets.  I hope this will change soon.


# Installation
CDF-NG-MEDIA requires a JW Player key in order for JW Player to work correctly.  You will need to create an account and establis a JW Player key.  You will provide the JW Player Key during configuration.

## Installing CDF-NG-MEDIA in your Angular application:
```sh
    //STEP 1: INSTALL CDF-NG-MEDIA

    npm install @cdf/cdf-ng-media --save

...................................................

    //STEP 2: create a config file (cdf-media-config.ts) to override configuration settings:

    import { ConfigInterface } from '@cdf/cdf-ng-media/lib';

    export const CdfMediaConfig: ConfigInterface =
      {
        CloudCMSMediaUrlRoot: 'URL ROOT PATH FOR CLOUD CMS MEDIA ASSETS (example: https://XXXXXXXX-hosted.cloudcms.net/static/node)',
        CloudCMSBranchId: 'BRANCH ID FOR CLOUD CMS',
        JwPlayerKey: 'YOUR JW PLAYER KEY'
      };

...................................................
  //STEP 3: configure your AppModule:

    // app.module.ts
    import { CdfModule } from '@cdf/cdf-ng/lib';
    import { CdfMediaConfig } from './configs';
    
    @NgModule({
      declarations: [ ... ],
      imports: [
        ...
        //3rd PARTY
        CdfMediaModule.forRoot(CdfMediaConfig),
      ],
      providers: [ ... ],
      bootstrap: [ ... ]
    })
    export class AppModule { }

...................................................
  //STEP 4 **: inject ClientConfigService into AppComponent.

  //app.component.ts
  import { ClientConfigService } 		from '@cdf/cdf-ng-media/lib';

  @Component(
    {
        selector: '...',
        templateUrl: '...',
        styleUrls: [ '....' ]
    })
  export class AppComponent implements OnInit
  {
      constructor(private clientConfigService : ClientConfigService) 
      {}    
  }
    
```

** Because of Angulars AOT build process and because I cannot figure out another way to do this (please see this: [stack overflow question][stack-overflow-url]), you have to inject ClientConfigService into component in order for the config values to be applied to ClientConfigService.  Please see [stack overflow question][stack-overflow-url] if you know of a better way to do this. 



# Helpful Links
* [Angular](https://angular.io/)
* [JW Player][jwplayer-url]
* [Solutia Consulting](http://solutiaconsulting.com)


## Release History

* < 1.0.65
    * Rounds and rounds of trial and error...

# Meta

Tom Schreck – [@tschreck](https://twitter.com/tschreck) – tom_schreck@solutiaconsulting.com

[https://github.com/tomschreck](https://github.com/tomschreck)

# License

[MIT](https://opensource.org/licenses/MIT)

[npm-image]: https://img.shields.io/npm/v/@cdf/cdf-ng-media.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@cdf/cdf-ng-media
[downloads-image]: https://img.shields.io/npm/dm/@cdf/cdf-ng-media.svg?style=flat-square
[downloads-url]: https://npm-stat.com/charts.html?package=%40cdf%2Fcdf-ng-media&from=2017-03-01
[license-image]: https://img.shields.io/npm/l/@cdf/cdf-ng-media.svg?style=flat-square
[license-url]: http://opensource.org/licenses/MIT
[jwplayer-url]:https://www.jwplayer.com/
[cdf-url]:http://cdf.cloud/
[cloud-cms-url]:https://www.cloudcms.com/
[stack-overflow-url]:http://stackoverflow.com/questions/42822233/how-to-pass-config-data-to-ngmodule-so-ngmodule-will-be-compiled-with-aot