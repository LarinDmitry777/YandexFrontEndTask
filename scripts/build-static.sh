rm -rf ./dist/public
rm -rf ./dist/views
cp -r ./src/public ./dist/public

mkdir ./dist/public
mkdir ./dist/public/styles
mkdir ./dist/views
mkdir ./dist/views/partials

cp ./src/views/*.css ./dist/public/styles/
cp ./src/views/partials/*.css ./dist/public/styles/

cp -r ./src/views/*.hbs ./dist/views
cp -r ./src/views/partials/*.hbs ./dist/views/partials
