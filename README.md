![Infinity Records Logo](/src/assets/img/Readme_banner_logo.png)

<h1 align="center">Check the website <a href="http://www.infinity-records.fr/">here</a></h1>

_Huge thanks to [Katheleen LEMAIRE](https://www.linkedin.com/in/katheleenlmr) for designing the website, go check all of her shots at Dribble [here](https://dribbble.com/katheleen-lmr) !_

## Presentation and History

This repository contains the Infinity Records Website code. Infinity Records is a music record-label that I started few years ago. Last year, I decided to formalize this institution by creating a website showcasing the scope of our resources, our mindset, and our present accomplishements.

## Composition

The application is divided in four parts within a main container. This container is composed by a header (triggering an entering animation when you're loading the home page), a contact form and an informative footer.

The four pages of the application describe :

* A **Home** page, presenting news of the label, and the website content
* **The Label** presentation, where you can learn about who we are and what we do
* **The Artists** presentation, introducing artists we manage and their accomplishments
* A **Merch** section, where you can see our branded clothing

The whole application is available in two languages (English and French) and have a responsive web-mobile version. The application is also a Progressive Web App, so you can even pin the website as an app on your phone.

When I developed and first deployed the application, I used to use my personal Git platform on my own server, and Jenkins to automate the builds and deployments of the application on my Nginx server with Virtual Hosts. But since having my own server was costing me much, I finally decided to migrate everything to Heroku on a free plan.

## Organisation

Based on my previous experiences, I organized this development as an agile team in which I covered several positions:

* as the **Product Owner** : carrying the product vision and conceiving the Product Backlog
* as the **Scrum Master** : setting-up the visual management with an Asana board, and facilitating the development team
* as the main member of the **Development Team** : even though the visual conception was made by my girlfriend who is UI Designer, I developed the whole application on my own : from conception to automated deployment, passing by application engineering.

## Used Technologies and Libraries

* [Angular 9](https://github.com/angular/angular)
* [Angular Universal](https://github.com/angular/universal) (Server Side Rendering distributing the app through Express Server)
* [Angular Material](https://material.angular.io/)
* [Hammerjs](https://github.com/hammerjs/hammer.js)
* [Heroku](https://www.heroku.com/)
* [Progressive Web App](https://web.dev/progressive-web-apps/)
* [ng-lazyload-image](https://github.com/tjoskar/ng-lazyload-image)
* [ngx-captcha](https://github.com/Enngage/ngx-captcha)
* [Sass](https://sass-lang.com/)
* [Typescript](https://www.typescriptlang.org/)
* [TSLint](https://github.com/palantir/tslint) (Airbnb-based config)
