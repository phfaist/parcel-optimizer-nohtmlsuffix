//
// Adapted from https://github.com/vseventer/parcel-optimizer-friendly-urls (MIT
// license)
//

// Package modules.
const { Optimizer } = require('@parcel/plugin');
const posthtml = require('posthtml');
const urls = require('posthtml-urls');

// Configure.
const stripIndexHtml = (startsWith, url) => {
    // Verify the URL is our own.
    if (url.indexOf(startsWith) !== 0) {
        // original URL
        return url;
    }

    let fragment = '';
    let fragment_idx = url.indexOf('#');
    if (fragment_idx !== -1) {
        fragment = url.slice(fragment_idx);
        url = url.slice(0, fragment_idx);
    }

    if (url.slice(-11) === '/index.html') {
        return url.slice(0, -10) + fragment; // Keep trailing slash.
    }
    if (url.slice(-5) === '.html') {
        return url.slice(0, -5) + fragment; // strip trailing .html suffix from all local pages
    }
    return url + fragment; // Return original URL.
};


// Exports.
module.exports = new Optimizer({
    async optimize({ bundle, contents, map, options, })
    {
        // Disable in hot mode because wrong index.html might be served.
        // @see https://github.com/parcel-bundler/parcel/issues/4740
        if (options.hot) {
            return { contents, map };
        }

        const { publicUrl } = bundle.target;
        const plugin = urls({ eachURL: stripIndexHtml.bind(null, publicUrl) });
        return {
            contents: (await posthtml([plugin]).process(contents)).html,
        };
    },
});
