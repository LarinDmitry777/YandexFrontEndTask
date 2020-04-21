cp -r ./src/public ./dist/public

mkdir ./dist/views
mkdir ./dist/views/partials

cp -r ./src/views/*.hbs ./dist/views
cp -r ./src/views/partials/*.hbs ./dist/views/partials

mkdir ./dist/public/bundles

mkdir ./dist/public/scripts
npx tsc -p ./src/clientScripts

npx create-bundles

#Все скрипты собираются в бандлы, поэтому папку можно удалять
rm -r ./dist/public/scripts
