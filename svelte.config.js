import adapter from '@sveltejs/adapter-netlify';

export default {
    kit: {
        adapter: adapter({
            edge: false,
            split: false
        }),
        // Add static asset handling
        files: {
            assets: 'static'
        }
    }
};