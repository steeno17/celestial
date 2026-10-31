VENDORED GLOBE.GL
=================

This directory contains the browser bundle for globe.gl version 2.46.2.
The package is distributed under the MIT license; see LICENSE.

The website loads:

    globe.gl.min.js

from both:

    js_test_field/website/earth_map.html
    js_test_field/website/moonPage.html

The pages use a plain script tag instead of a CDN:

    <script src="../vendor/globe.gl/globe.gl.min.js"></script>

This works because globe.gl's browser bundle exposes the global Globe
constructor used by earthMap.js and moonMap.js.


Updating the vendored version
-----------------------------

The project currently has no package.json or JavaScript build step. To update
globe.gl, choose an exact version and copy these files from its npm package:

    package/dist/globe.gl.min.js
    package/LICENSE
    package/package.json

Keep the files in this directory and keep the HTML script paths unchanged.
Do not replace the version with a floating "latest" URL.

For version 2.46.2, the source package was:

    https://registry.npmjs.org/globe.gl/-/globe.gl-2.46.2.tgz

Example update commands (replace VERSION with an exact version):

    mkdir -p js_test_field/vendor/globe.gl
    curl -fsSL \
      https://registry.npmjs.org/globe.gl/-/globe.gl-VERSION.tgz \
      -o /tmp/globe.gl.tgz
    tar -xzf /tmp/globe.gl.tgz package/dist/globe.gl.min.js \
      package/LICENSE package/package.json
    cp package/dist/globe.gl.min.js \
      js_test_field/vendor/globe.gl/globe.gl.min.js
    cp package/LICENSE js_test_field/vendor/globe.gl/LICENSE
    cp package/package.json js_test_field/vendor/globe.gl/package.json

After an update, load both pages through an HTTP server and check the browser
console for errors:

    python3 -m http.server 8000

    http://localhost:8000/js_test_field/website/earth_map.html
    http://localhost:8000/js_test_field/website/moonPage.html

Vendoring means the pages do not require a CDN connection at runtime. It also
means upgrades are manual, so the exact version and license should remain
checked in with the bundle.
