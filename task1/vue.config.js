// vue.config.js
module.exports = {
    css: {
        loaderOptions: {
            // pass options to sass-loader
            sass: {
                // @/ is an alias to src/
                // so this assumes you have a file named `src/css/variables/_index.scss`
                data:
                    `@import "@/css/variables/_index.scss";
                     @import "@/css/mixins/_index.scss";`
            }
        }
    }
};
