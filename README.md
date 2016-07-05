# latitude

An interactive visualisation of cities' latitudes, inspired by [Lisa Charlotte Rost's static version][lisa-tweet].

The upside: it works.

The downside: it's hastily cobbled together over the course of a few evenings, it's badly documented, you need to download half the internet to build it from source.

## Building

Clone, then `npm install`, then go and make a cup of tea, then `npm run build`.

Look for the output in the `dist/` directory. You'll probably want to symlink `src/index.html -> dist/index.html` and `src/data -> dist/data`.

## Licence

The source code is published under the terms of the MIT License.

The geo data is provided by [GeoNames.org][geonames] published under the terms of the [Creative Commons Attribution 3.0 License][cc-by].

[lisa-tweet]: https://twitter.com/lisacrost/status/745731918214344704
[cc-by]: https://creativecommons.org/licenses/by/3.0/
[geonames]: http://www.geonames.org
