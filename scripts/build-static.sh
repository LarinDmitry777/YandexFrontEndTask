cp -r ./src/public ./dist/public

mkdir ./dist/views/partials

cp -r ./src/views/*.hbs ./dist/views
cp -r ./src/views/partials/*.hbs ./dist/views/partials

mkdir ./dist/public/bundles

npx create-bundles

mkdir ./dist/public/scripts

mv ./dist/views/*.js ./dist/public/scripts


