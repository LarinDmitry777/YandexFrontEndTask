rm -rf ./dist/public
rm -rf ./dist/views
cp -r ./src/public ./dist/public

mkdir ./dist/views
mkdir ./dist/views/partials

cp -r ./src/views/*.hbs ./dist/views
cp -r ./src/views/partials/*.hbs ./dist/views/partials

mkdir ./dist/public
mkdir ./dist/public/bundles

npx create-bundles
