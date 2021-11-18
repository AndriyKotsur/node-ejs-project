# STM Trade Api.

The project uses javascript and consists of an Express server paired with Mongo database. And it uses EJS template to render views for the client side.

## Prerequisites

You will need the following installed on your system (globally):
* `node`;
* `npm`;
* `mongo`.

Then to pull in all the dependencies just run `npm start`.

## Project Structure

All source files are stored in `/` root directory which uses files found in:
* `locales` - Internationalization files for localization.
* `middleware` - Middlewares and helpers such as internationalization and upload;
* `models` - Mongo models and helpers for database queries;
* `routes` - API Router and its versions;
* `partials` - Views of templates for components;
* `views` - Views of templates for pages;
* `source` - Scripts and styles for templates;

The server entry is `/app.js`.

### Development

* The app will be run through `npm run start` which uses `nodemon` and only reloads when backend files change.
