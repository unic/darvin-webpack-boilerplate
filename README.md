![](http://tobiasfrei.ch/github/darvin-boilerplate/darvin-MIT_(c)TobiasFrei.svg)

💥 Finally in version 1.0

webpack4 boilerplate for HTML templating and CMS theming with Nunjucks or Twig. Hot reload with DevServer or Browsersync, easy extendable webpack settings and frontend preview for shipping.

+ lazy loading chunks with intersection observer.
+ frontend preview for HTML templates.
+ templating with Nunjucks or Twig.
+ easy extendable Webpack settings.
+ Custom Properties and CSS Grid (also IE).


## Quickstart

```
nvm install 12.6.0; nvm use 12.6.0
git clone https://github.com/unic/darvin-boilerplate.git myProject; cd myProject
npm start
```


# Setup

Please consider the [Wiki Space](https://github.com/unic/darvin-boilerplate/wiki) for instructions.

1. [Prerequisites](https://github.com/unic/darvin-boilerplate/wiki/1.-Prerequisites)<br>
2. [Start](https://github.com/unic/darvin-boilerplate/wiki/2.-Start)<br>
3. [SVG-Sprites](https://github.com/unic/darvin-boilerplate/wiki/3.-SVG-Sprites)<br>
4. [Breakpoints](https://github.com/unic/darvin-boilerplate/wiki/4.-Breakpoints)<br>
5. [HTML Elements](https://github.com/unic/darvin-boilerplate/wiki/5.-Elements)<br>
6. [Command Line Interface](https://github.com/unic/darvin-boilerplate/wiki/6.-Command-Line-Interface)<br><br>



## Webpack Dev Server

The dev build is running default on memory (webpack server), for physical files change the option ```writeToDisk: true``` in ```/webpack/settings/env-devserver/index.js```


## IE

Darvin has still IE support, but transpiled seperately to ```style.ie.css```.
That means you can use CSS Custom Properties and CSS Grid, the result on Internet Explorer is alright.
```/webpack/settings/style-ie/index.js```


## CI

There are CI build scripts for dev and prod builds without watching options e.g ```dev-teamcity``` for ```dev```.
All scripts ending with ```-cms``` are second builds for rollouts with different config (e.g asset path) ```dev-teamcity-cms```.

Local
```/config/.darvinconf.main.js```

System
```/config/.darvinconf.system.js```

Teamcity Templates are available.


## Config

Use the cli for config setup.<br>
[> CLI Usage](https://github.com/tobiasfrei/darvin-boilerplate/wiki/6.-CLI)<br>

![](http://tobiasfrei.ch/github/darvin-boilerplate/darvin-cli-2.gif)


## Windows

Use WSL for running boilerplate on Windows 10.


## Author

Tobias Frei
[https://github.com/unic](https://github.com/unic)


## License

MIT

Darvin logo and brand related assets are protected and may not be used for personal purposes.
